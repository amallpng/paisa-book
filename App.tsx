
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Dashboard from './components/dashboard/Dashboard';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
};

const Main: React.FC = () => {
  const { user } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);

  if (!user) {
    return isRegistering ? (
      <RegisterPage onSwitchToLogin={() => setIsRegistering(false)} />
    ) : (
      <LoginPage onSwitchToRegister={() => setIsRegistering(true)} />
    );
  }

  return <Dashboard />;
};

export default App;
