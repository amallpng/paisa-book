import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../ui/Logo';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login({ username, password })) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6 rounded-lg bg-white dark:bg-slate-800 p-8 shadow-lg" onSubmit={handleSubmit}>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
          <Input id="username" label="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <Input id="password" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
          Not a member?{' '}
          <button onClick={onSwitchToRegister} className="font-medium text-primary hover:text-primary-500">
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;