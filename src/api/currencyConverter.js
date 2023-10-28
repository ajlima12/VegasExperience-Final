import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [exchangeRate, setExchangeRate] = useState('');

  const API_BASE_URL = 'https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL';

  const convertCurrency = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      console.log('Response:', response.data);

      const rate = response.data.USDBRL.bid;
      setExchangeRate(rate);

      if (amount && !isNaN(amount)) {
        const convertedValue = parseFloat(amount) / parseFloat(rate); // Alteração para dividir em vez de multiplicar
        setConvertedAmount(convertedValue.toFixed(2));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.label}>Valor em reais (BRL):</Text>
        <TextInput
          value={amount}
          onChangeText={(text) => setAmount(text)}
          keyboardType="numeric"
          placeholder="Digite o valor em reais"
          style={styles.input}
        />
        <TouchableOpacity onPress={convertCurrency} style={styles.button}>
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Valor convertido em dólar (USD):</Text>
        
        <TextInput
          value={convertedAmount}
          style={styles.convertedInput}
          editable={false}
        />
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  label: {
    alignItems: 'center',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 20,
  },
  container: {
    width: 350,
        height:400,
        borderRadius:14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
  },

  content: {
    
      width: 350,
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
  },
  input: {
    fontSize: 17,
        //fontWeight: 'bold',
        width: 310,
        height:50,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#D8D2FF',
        borderRadius:8,
  },
  button: {
    backgroundColor: '#147DEB',
    padding: 10,
    height:45,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize:21,
  },
  convertedInput: {
    width: 310,
    height:50,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#D8D2FF',
    borderRadius:8,
    fontSize: 17,
  },
});

export default CurrencyConverter;
