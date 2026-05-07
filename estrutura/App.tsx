import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StudentProvider } from './src/context/StudentContext';
import { DashboardScreen } from './src/screens/Dashboard';
import { StudentListScreen } from './src/screens/StudentList';
import { StudentFormScreen } from './src/screens/StudentForm';
import { TripManagerScreen } from './src/screens/TripManager';
import { COLORS } from './src/components/index';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5F5F5' },
      }}
    >
      <Stack.Screen name="DashboardMain" component={DashboardScreen} />
      <Stack.Screen
        name="StudentForm"
        component={StudentFormScreen}
        options={{
          animationEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="TripManager"
        component={TripManagerScreen}
        options={{
          animationEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const StudentListStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#F5F5F5' },
      }}
    >
      <Stack.Screen name="StudentListMain" component={StudentListScreen} />
      <Stack.Screen
        name="StudentForm"
        component={StudentFormScreen}
        options={{
          animationEnabled: true,
          headerShown: true,
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: COLORS.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 56,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen
        name="DashboardTab"
        component={DashboardStack}
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="StudentsTab"
        component={StudentListStack}
        options={{
          title: 'Alunos',
          tabBarLabel: 'Alunos',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>👥</Text>
          ),
        }}
      />
      <Tab.Screen
        name="TripsTab"
        component={TripManagerScreen}
        options={{
          title: 'Viagens',
          tabBarLabel: 'Viagens',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🚌</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StudentProvider>
        <NavigationContainer>
          <AppTabs />
        </NavigationContainer>
      </StudentProvider>
    </GestureHandlerRootView>
  );
}

// Para suportar diferentes tipos de texto
declare global {
  namespace React {
    interface FC<P = {}> {
      (props: P & { children?: React.ReactNode }, context?: any): React.ReactElement<any, any> | null;
    }
  }
}

// Permitir componentes Text renderizar emojis
import { Text, TextProps } from 'react-native';
const OriginalText = Text;
Text.propTypes = { ...OriginalText.propTypes };
