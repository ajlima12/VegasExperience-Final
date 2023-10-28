import React from "react";
import { getImagemZonaPerigo } from "../utils/getImagemZonaPerigo";
import { View, Text, Image, StyleSheet} from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export function ZonaPerigoCard({ zonaPerigo }) {
  const { nome_zp, localizacao_zp, descricao_zp } = zonaPerigo;//nome dos campos
  const imagemZonaPerigo = getImagemZonaPerigo(nome_zp);//chamando o get imagem

  return (
    <View style={styles.ZonaPerigoCard}>
      <View style={styles.ZonaPerigoHeader}>
        <Text style={styles.ZonaPerigoName}>{nome_zp}</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Image source={imagemZonaPerigo} style={styles.image} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MaterialIcons name="location-on" size={16} color="#147DEB" style={styles.locationIcon} />
        </View>
        <Text style={styles.ZonaPerigoLocation}>{localizacao_zp}</Text>
      </View>
      <Text style={styles.ZonaPerigoDescription}>{descricao_zp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

ZonaPerigoCard: {
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
ZonaPerigoName: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
},
ZonaPerigoLocation: {
  fontSize: 16,
  color: '#666',
  marginBottom: 8,
},

ZonaPerigoDescription: {
  fontSize: 16,
  color: '#333',
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