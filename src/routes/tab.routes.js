import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SavedScreen from '../pages/SavedScreen';
import EntrarScreen from '../pages/EntrarScreen';
import { StackRoutes } from './stack.routes';

const BottomTab = createBottomTabNavigator();

// Componente que representa a TabBar
export function BottomTabRoutes() {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation, route}) => {
        return ({
        tabBarStyle: { 
          backgroundColor: '#B4C1FC',
          borderTopColor: 'transparent',
          height: 60,
          alignContent: 'center',
          direction: 'rtl',
          paddingTop: 0,
          paddingBottom: 0,
          animate: true,
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#3865E0',
        headerShown: false, 
        tabBarLabelPosition: 'beside-icon',
        freezeOnBlur: true,
      })}}
      initialRouteName='Home'
    >
      {/* Defina as abas aqui */}
      <BottomTab.Screen
        name="Home"
        component={StackRoutes}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color }) => (focused ? <Ionicons name="airplane-sharp" size={24} color={color} /> : <Ionicons name="airplane-outline" size={24} color={color} />),
        }}
      />
      <BottomTab.Screen
        name="Roteiro"
        component={SavedScreen}
        options={{
          tabBarLabel: 'Roteiro',
          tabBarIcon: ({ focused, color }) => (focused ? <MaterialCommunityIcons name="bag-suitcase" size={24} color={color} /> : <MaterialCommunityIcons name="bag-suitcase-outline" size={24} color={color} />),
        }}
      />
      <BottomTab.Screen
        name="Perfil"
        component={EntrarScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ focused, color }) => (focused ? <Ionicons name="person" size={24} color={color} /> : <Ionicons name="person-outline" size={24} color={color} />),
        }}
      />
    </BottomTab.Navigator>
  );
}