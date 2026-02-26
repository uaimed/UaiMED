// src/navigation/index.tsx (ATUALIZADO)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native'; 
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from './types';

import AuthNavigator from './AuthStack';
import MainTabNavigator from './MainTabNavigation'; // Corrigido o import

const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { signed, loading } = useAuth(); 

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" /> 
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          // ✅ Se autenticado, mostra o fluxo principal (Main Tabs)
          <RootStack.Screen name="Main" component={MainTabNavigator} /> 
        ) : (
          // 🔒 Se NÃO autenticado, mostra o fluxo de login/cadastro
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
