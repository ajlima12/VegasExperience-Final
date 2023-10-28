import React, {useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import firestore from "@react-native-firebase/firestore";

import { ZonaPerigoCard} from '../components/ZonaPerigoCard';

export function ZonaPerigoScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [zonaPerigoData, setZonaPerigoData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Zonas de Perigo ',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 110,
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
  useEffect(() => {
    const fetchZonaPerigoData = async () => {
      try {
        const collectionRef = firestore().collection('zonas_perigo');//nome da tabela
        const snapshot = await collectionRef.get();
        const zonaPerigo = snapshot.docs.map((doc) => doc.data());
        setZonaPerigoData(zonaPerigo);
        setLoading(false);
        console.log(zonaPerigo);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchZonaPerigoData();
  }, []);

  

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {zonaPerigoData.map((zonaPerigo, index) => (
          <View
            key={index}
            style={[
              styles.zonaPerigoWrapper,
              index === 0 ? { marginTop: 20 } : null // Adiciona uma margem superior para o primeiro elemento
            ]}
          >
            <ZonaPerigoCard zonaPerigo={zonaPerigo} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F1EFFF',
    },
    contentContainer: {
      paddingBottom: 20,
    },
    zonaPerigoWrapper: {
      marginBottom: 20,
    },

  });

export default ZonaPerigoScreen;
