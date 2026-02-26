import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

// Importe as telas
import HomeScreen from '../screens/Main/HomeScreen';
import AgendamentoStack from './AgendamentoStack';
import PerfilScreen from '../screens/Main/PerfilScreen';
import MedicoAgendaScreen from '../screens/Main/MedicoAgendaScreen';
import ClinicDashboard from '../screens/Admin/ClinicDashboard';

const Tab = createBottomTabNavigator<MainTabParamList>();

/**
 * Navegador Principal com Abas (Bottom Tabs)
 * Diferencia abas conforme `user.tipo` (paciente, medico, clinica)
 */
const MainTabNavigator: React.FC = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Agendamentos':
              iconName = 'calendar-outline';
              break;
            case 'MedicoAgenda':
              iconName = 'calendar-outline';
              break;
            case 'ClinicDashboard':
              iconName = 'bar-chart-outline';
              break;
            case 'Perfil':
              iconName = 'person-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: route.name,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />

      {/* Paciente: mostra fluxo de agendamento */}
      {user?.tipo === 'paciente' && (
        <Tab.Screen name="Agendamentos" component={AgendamentoStack} options={{ title: 'Agendamentos' }} />
      )}

      {/* Médico: agenda específica */}
      {user?.tipo === 'medico' && (
        <Tab.Screen name="MedicoAgenda" component={MedicoAgendaScreen} options={{ title: 'Minha Agenda' }} />
      )}

      {/* Clínica: dashboard */}
      {user?.tipo === 'clinica' && (
        <Tab.Screen name="ClinicDashboard" component={ClinicDashboard} options={{ title: 'Dashboard' }} />
      )}

      {/* Perfil sempre disponível */}
      <Tab.Screen name="Perfil" component={PerfilScreen} options={{ title: 'Meu Perfil' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
