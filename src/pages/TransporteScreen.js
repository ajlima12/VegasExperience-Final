import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import firestore from "@react-native-firebase/firestore";

import { TransporteCard } from '../components/TransporteCard';

export function TransporteScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [transporteData, setTransporteData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Transporte',
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
    const fetchTransporteData = async () => {
      try {
        const collectionRef = firestore().collection('transporte'); // Nome da tabela
        const snapshot = await collectionRef.get();
        const transporte = snapshot.docs.map((doc) => doc.data());
        setTransporteData(transporte);
        setLoading(false);
        console.log(transporte);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchTransporteData();
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {transporteData.map((transporte, index) => (
          <View
            key={index}
            style={[
              styles.transporteWrapper,
              index === 0 ? { marginTop: 20 } : null // Adiciona uma margem superior para o primeiro elemento
            ]}
          >
            <TransporteCard transporte={transporte} />
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
  transporteWrapper: {
    marginBottom: 20,
  },

});

export default TransporteScreen;