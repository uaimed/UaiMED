import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './navigation';
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
