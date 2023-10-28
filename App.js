import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Routes } from './src/routes';
import { UserProvider } from './src/contexts/useUser';
import SplashScreen from './components/SplashScreen';


function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Configuração do Google Sign-In
  GoogleSignin.configure({
    webClientId: '741722450327-fjftchg44bqohvempomeiisbd372ug7d.apps.googleusercontent.com',
  });

  useEffect(() => {
    // Simula algum tipo de carregamento ou delay
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500); // Tempo em milissegundos
  }, []);

  return (
    <NavigationContainer>
      <UserProvider>
        {isSplashVisible ? (
          <SplashScreen setIsSplashVisible={setIsSplashVisible} />
        ) : (
          <Routes />
        )}
      </UserProvider>
    </NavigationContainer>
  );
}

export default App;
