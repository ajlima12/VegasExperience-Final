import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { getImagemPlacas } from "../utils/getImagemPlacas";

export function PlacasCard({ Placas }) {
  const { nome_plac, descricao_plac, traducao  } = Placas;//nome dos campos
  const imagemPlacas = getImagemPlacas(nome_plac);//chamando o get imagem

  return (
    <View style={styles.PlacasCard}>
      <View style={styles.PlacasHeader}>
        <Text style={styles.PlacasName}>{nome_plac}</Text>
      </View>

      <Text style={styles.PlacasDescription}>{traducao}</Text>
      
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          
        </View>
        <Text style={styles.PlacasLocation}>{descricao_plac}</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Image source={imagemPlacas} style={styles.image} />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    PlacasCard: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      padding: 16,
      marginBottom: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: 'relative',
    },
    PlacasName: {
      fontSize: 24,
      //fontWeight: 'bold',
      color: '#F42617',
      marginBottom: 3,
      textAlign: 'center',
    },
    PlacasLocation: {
      fontSize: 14,
      color: '#212C35',
      marginVertical: 6,
      textAlign: 'justify',
    },
    
    PlacasDescription: {
      fontSize: 12,
      color: '#9FA6AC',
      textAlign: 'center',
    },
    carouselContainer: {
      width: '100%',
      height: 150,
      borderRadius: 20,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
    },
    locationIconContainer: {
      marginRight: 4,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FF0303',
    },
  });