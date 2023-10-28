import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import CurrencyConverter from '../api/currencyConverter';

function ConverterScreen() {
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Converter Moeda',
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Converter Moeda</Text>
      <View style={styles.space} />
      <CurrencyConverter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1EFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#0D4BF2',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  space: {
    height: 20,
  },
});

export default ConverterScreen;
