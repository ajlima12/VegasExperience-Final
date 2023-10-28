import React, {useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView } from 'react-native';
import firestore from "@react-native-firebase/firestore";

import { PlacasCard } from '../components/PlacasCard';

function PlacaScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [PlacasData, setPlacasData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Placas',
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
    const fetchPlacasData = async () => {
      try {
        const collectionRef = firestore().collection('placas');//nome da tabela
        const snapshot = await collectionRef.get();
        const Placas = snapshot.docs.map((doc) => doc.data());
        setPlacasData(Placas);
        setLoading(false);
        console.log(Placas);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchPlacasData();
  }, []);

  

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {PlacasData.map((Placas, index) => (
          <View
            key={index}
            style={[
              styles.PlacasWrapper,
              index === 0 ? { marginTop: 20 } : null // Adiciona uma margem superior para o primeiro elemento
            ]}
          >
            <PlacasCard Placas={Placas} />
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
    PlacasWrapper: {
      marginBottom: 20,
    },
  });

export default PlacaScreen;
