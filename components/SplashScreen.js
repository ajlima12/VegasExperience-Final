import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = ({ setIsSplashVisible }) => {
  useEffect(() => {
    // Navega para a próxima tela após o tempo determinado
    setTimeout(() => {
      setIsSplashVisible(false);
    }, 1500); // Tempo em milissegundos
  }, [setIsSplashVisible]);

  return (
    <View style={styles.container}>
      <Image source={require('../src/assets/Inicio.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
