import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../contexts/useUser';


const HomeScreen = () => {
  const { user, getUserInformations } = useContext(UserContext);
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "VegasExperience",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#147DEB",
        height: 80,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
      },
    });
  }, []);

  useEffect(() => {
    if(!user) {
      setLoading(false);
      return;
    };
    async function handleGetInformations() {
      await getUserInformations(user.uid);
      setLoading(false);
    }
    handleGetInformations();
  }, [])

  if(loading) return <View><Text>Carregando</Text></View>;
  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <Image
          source={require('../assets/lasvegas.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.buttonOverlay} />
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.buttonRow}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('TransporteScreen')}
          >
        <Ionicons name="bus-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Transportes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PlacaScreen')}
          >
            <AntDesign name="warning" size={24} color="black" />
            <Text style={styles.buttonText}>Placas</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ZonaPerigoScreen')}
          >
            <Feather name="map" size={24} color="black" />
            <Text style={styles.buttonText}>Zona de Perigo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ConverterScreen')}
          >
            <MaterialIcons name="attach-money" size={24} color="black" />
            <Text style={styles.buttonText}>Converter Moeda</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AudioScreen')}
          >
            <Ionicons name="chatbubbles-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Conversação</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 320,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 95,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center', // Centralizar o texto
  },
});

export default HomeScreen;