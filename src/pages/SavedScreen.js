import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const SavedScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Roteiro',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 60,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
    });
  }, []);

  const handleButtonPress = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleButtonPress('HotelScreen')}>
          <View style={styles.buttonImageContainer}>
            <Image source={require('../assets/hotel2.jpg')} style={styles.buttonImage} />
            <View style={styles.buttonOverlay} />
          </View>
          <View style={styles.buttonTitleContainer}>
            <Text style={styles.buttonTitle}>Hotéis</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleButtonPress('PontoTuristicoScreen')}>
          <View style={styles.buttonImageContainer}>
            <Image source={require('../assets/rodavegas.jpg')} style={styles.buttonImage} />
            <View style={styles.buttonOverlay} />
          </View>
          <View style={styles.buttonTitleContainer}>
            <Text style={styles.buttonTitle}>Pontos Turísticos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleButtonPress('PacotesScreen')}>
          <View style={styles.buttonImageContainer}>
            <Image source={require('../assets/aviao.jpg')} style={styles.buttonImage} />
            <View style={styles.buttonOverlay} />
          </View>
          <View style={styles.buttonTitleContainer}>
            <Text style={styles.buttonTitle}>Pacotes de Viagem</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => handleButtonPress('ComercioScreen')}>
          <View style={styles.buttonImageContainer}>
            <Image source={require('../assets/centros.jpg')} style={styles.buttonImage} />
            <View style={styles.buttonOverlay} />
          </View>
          <View style={styles.buttonTitleContainer}>
            <Text style={styles.buttonTitle}>Centros Comerciais</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F1EFFF'
  },
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    position: 'relative',
  },
  buttonImageContainer: {
    width: 339,
    height: 152,
    borderRadius: 21,
    overflow: 'hidden',
  },
  buttonImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  buttonTitleContainer: {
    position: 'absolute',
    bottom: 10,
    left: 46, // Alinhar à esquerda
    right: 0,
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SavedScreen;