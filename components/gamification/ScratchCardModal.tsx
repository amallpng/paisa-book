import React, { useRef, useEffect, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { Badge } from '../../types';
import Button from '../ui/Button';

interface ScratchCardModalProps {
  badge: Badge;
  onClose: () => void;
}

const ScratchCardModal: React.FC<ScratchCardModalProps> = ({ badge, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const IconComponent = (LucideIcons as any)[badge.icon] || LucideIcons.HelpCircle;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const rect = canvas.parentElement!.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // Fill with scratchable layer
    ctx.fillStyle = '#a0aec0'; // gray-400
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let isDrawing = false;
    
    const scratch = (e: MouseEvent | TouchEvent) => {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const pos = e instanceof MouseEvent 
            ? { x: e.clientX - rect.left, y: e.clientY - rect.top }
            : { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };

        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
        ctx.fill();
    };

    const startDrawing = () => { isDrawing = true; };
    const stopDrawing = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('touchstart', startDrawing, { passive: true });
    canvas.addEventListener('touchend', stopDrawing);
    canvas.addEventListener('touchmove', scratch, { passive: true });

    return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mousemove', scratch);
        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchend', stopDrawing);
        canvas.removeEventListener('touchmove', scratch);
    };
  }, []);

  const revealAll = () => {
    const canvas = canvasRef.current;
    if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    setIsRevealed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full max-w-sm rounded-lg bg-white dark:bg-slate-800 p-8 shadow-xl text-center animate-pop-in">
        <h2 className="text-2xl font-bold text-primary">New Badge Unlocked!</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">Scratch to reveal your new achievement!</p>

        <div className="relative w-48 h-48 mx-auto my-4">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary-100 dark:bg-primary-900 rounded-full">
             <IconComponent className="h-20 w-20 text-primary" />
             <h3 className="mt-2 text-lg font-semibold text-slate-800 dark:text-white">{badge.name}</h3>
          </div>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-full cursor-pointer"></canvas>
        </div>

        <p className="text-slate-500 dark:text-slate-300 font-medium">{badge.description}</p>
        
        <div className="mt-6 flex space-x-2">
            <Button variant="secondary" onClick={revealAll} className="w-full">Reveal</Button>
            <Button onClick={onClose} className="w-full">Close</Button>
        </div>
      </div>
    </div>
  );
};

export default ScratchCardModal;