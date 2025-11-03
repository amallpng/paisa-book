import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (register({ username, password })) {
      // Automatically log in after successful registration
      if(login({ username, password })) {
         // The main app component will handle the redirect
      } else {
         onSwitchToLogin();
      }
    } else {
      setError('Username already exists.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create a new account
          </h2>
        </div>
        <form className="mt-8 space-y-6 rounded-lg bg-white dark:bg-slate-800 p-8 shadow-lg" onSubmit={handleSubmit}>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <Input id="username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input id="confirm-password" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Already a member?{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-primary hover:text-primary-500">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;