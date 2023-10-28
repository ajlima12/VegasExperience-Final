import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/HomeScreen';
import SavedScreen from '../pages/SavedScreen';
import AudioScreen from '../pages/AudioScreen';
import HotelScreen from '../pages/HotelScreen';
import ComercioScreen from '../pages/ComercioScreen';
import ZonaPerigoScreen from '../pages/ZonaPerigoScreen';
import ConverterScreen from '../pages/ConverterScreen';
import PlacaScreen from '../pages/PlacaScreen';
import PacotesScreen from '../pages/PacotesScreen';
import AdminScreen from '../pages/AdminScreen';
import TransporteScreen from '../pages/TransporteScreen';
import PontoTuristicoScreen from '../pages/PontoTuristicoScreen';
import EntrarScreen from '../pages/EntrarScreen';

import OpcoesScreen from '../pages/admin/OpcoesScreen';
import HotelCrud from '../pages/admin/HotelCrud';
import PontoturisticoCrud from '../pages/admin/PontoturisticoCrud';
import TransporteCrud from '../pages/admin/TransporteCrud';
import PlacasCrud from '../pages/admin/PlacasCrud';
import ComercioCrud from '../pages/admin/ComercioCrud';
import PacotesCrud from '../pages/admin/PacotesCrud';
import ZonaPerigoCrud from '../pages/admin/ZonaPerigoCrud';
import SplashScreen from '../../components/SplashScreen';

const Stack = createNativeStackNavigator();

// Componente que representa o StackNavigator para a aba 
export function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Group navigationKey='admin'>
        <Stack.Screen name="HotelCrud" component={HotelCrud} />
        <Stack.Screen name="PontoturisticoCrud" component={PontoturisticoCrud} />
        <Stack.Screen name="TransporteCrud" component={TransporteCrud} />
        <Stack.Screen name="PlacasCrud" component={PlacasCrud} />
        <Stack.Screen name="ComercioCrud" component={ComercioCrud} />
        <Stack.Screen name="PacotesCrud" component={PacotesCrud} />
        <Stack.Screen name="ZonaPerigoCrud" component={ZonaPerigoCrud} />
      </Stack.Group>
      
      <Stack.Group navigationKey='user'>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AudioScreen" component={AudioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HotelScreen" component={HotelScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PacotesScreen" component={PacotesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComercioScreen" component={ComercioScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ZonaPerigoScreen" component={ZonaPerigoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ConverterScreen" component={ConverterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PlacaScreen" component={PlacaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TransporteScreen" component={TransporteScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PontoTuristicoScreen" component={PontoTuristicoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EntrarScreen" component={EntrarScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OpcoesScreen" component={OpcoesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SavedScreen" component={SavedScreen} options={{ headerShown: false }} />
      </Stack.Group>
    </Stack.Navigator>
  );
}