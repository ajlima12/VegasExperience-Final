import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import AdminScreen from '../AdminScreen';

const OpcoesScreen = () => {
  const navigation = useNavigation(); // Importe o useNavigation aqui

  const handleNavigation = (screenName) => {
    navigation.navigate(screenName);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Administrador',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 65,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => null,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.AdminText}>Seja Bem Vindo(a) Administrador</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('HotelCrud')}
        >
          <Text style={styles.buttonText}>Hoteis</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('PontoturisticoCrud')}
        >
          <Text style={styles.buttonText}>Pontos Turisticos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('PacotesCrud')}
        >
          <Text style={styles.buttonText}>Pacotes de Viagem</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('TransporteCrud')}
        >
          <Text style={styles.buttonText}>Transporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('PlacasCrud')}
        >
          <Text style={styles.buttonText}>Placas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('ComercioCrud')}
        >
          <Text style={styles.buttonText}>Centros Comerciais</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('ZonaPerigoCrud')}
        >
          <Text style={styles.buttonText}>Zona de Perigos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AdminText: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    width: 209,
    height: 40,
    backgroundColor: '#147DEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OpcoesScreen;
