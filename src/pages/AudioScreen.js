import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';


function AudioScreen() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Conversação',
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

  const speak = (text) => {
    Speech.speak(text, {
      language: 'en-US',
    });
  };

  const playAudio1 = () => {
    const audioText = 'Hello';
    speak(audioText);
  };

  const playAudio2 = () => {
    const audioText = 'Good morning...Good night';
    speak(audioText);
  };

  const playAudio3 = () => {
    const audioText = 'Yes... No... Maybe... Please';
    speak(audioText);
  };

  const playAudio4 = () => {
    const audioText = 'Thank you... You’re welcome';
    speak(audioText);
  };

  const playAudio5 = () => {
    const audioText = 'What is your name?';
    speak(audioText);
  };

  const playAudio6 = () => {
    const audioText = 'Could you bring me the menu?';
    speak(audioText);
  };

  const playAudio7 = () => {
    const audioText = 'What time is it?';
    speak(audioText);
  };

  const playAudio8 = () => {
    const audioText = 'Can you bring the bill, please?  ';
    speak(audioText);
  };

  const playAudio9 = () => {
    const audioText = 'I would like to order, please   ';
    speak(audioText);
  };

  const playAudio10 = () => {
    const audioText = 'Breakfast...Lunch...Dinner  ';
    speak(audioText);
  };

  const playAudio11 = () => {
    const audioText = 'Waiter...Waitress  ';
    speak(audioText);
  };

  const playAudio12 = () => {
    const audioText = 'Gluten-free...Lactose intolerance   ';
    speak(audioText);
  }; 

  const playAudio13 = () => {
    const audioText = 'We have a reservation under...I have a reservation under   ';
    speak(audioText);
  }; 

  const playAudio14 = () => {
    const audioText = ' Is breakfast included?  ';
    speak(audioText);
  }; 

  const playAudio15 = () => {
    const audioText = ' We need extra towels, please. We’re in room  ';
    speak(audioText);
  }; 


  const playAudio16 = () => {
    const audioText = ' I’ll pay in cash...I’ll pay by credit card ';
    speak(audioText);
  }; 

  const playAudio17 = () => {
    const audioText = 'I would like to check out  ';
    speak(audioText);
  }; 

  const playAudio18 = () => {
    const audioText = 'First...Second...Third...Fourth floor  ';
    speak(audioText);
  }; 

  const playAudio19 = () => {
    const audioText = 'Single Room  ';
    speak(audioText);
  }; 

  
  const playAudio20 = () => {
    const audioText = 'Twin room ';
    speak(audioText);
  }; 

  const playAudio21 = () => {
    const audioText = 'Double room ';
    speak(audioText);
  }; 

  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Dia a Dia</Text>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Hello</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Olá</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio1}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Good morning/ Good night</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Bom dia/ Boa noite</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio2}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Yes/No/Maybe/Please</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Sim/ Não/ Talvez/ Por favor</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio3}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Thank you/ You’re welcome</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Obrigada/ De nada</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio4}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>What is your name?</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Qual é o seu nome?</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio5}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>What time is it?</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Que horas são?</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio7}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Restaurante</Text>
        </View>
        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Could you bring me the menu?</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Você pode me trazer o cardápio?</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio6}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Can you bring the bill, please?  </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Pode trazer a conta, por favor?</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio8}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

         <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>I would like to order, please  </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Eu gostaria de fazer o pedido, por favor.</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio9}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Breakfast/Lunch/Dinner  </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Café da manhã/Almoço/Jantar</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio10}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Waiter/Waitress </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Garçom/Garçonete</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio11}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Gluten-free/Lactose intolerance </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Sem glúten/Intolerância à lactose</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio12}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Hotel</Text>
        </View>
        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>We have a reservation under … /I have a reservation under …</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Nós temos uma reserva em nome de .../Eu tenho uma reserva em nome de ...</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio13}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Is breakfast included? </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>O café da manhã está incluído?</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio14}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>We need extra towels, please. We’re in room ...(nº do quarto) </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Precisamos de toalhas extras, por favor. Estamos no quarto... ...(nº do quarto)</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio15}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>I’ll pay in cash./I’ll pay by credit card. </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Vou pagar com dinheiro./Vou pagar com o cartão.</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio16}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>I would like to check out </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Eu gostaria de fazer o check-out.</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio17}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>First/Second/Third/Fourth floor </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Primeiro/Segundo/Terceiro/ Quarto andar</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio18}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Single Room</Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Quarto Individual</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio19}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Twin Room </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Quarto com duas camas de solteiro</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio20}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>

        <View style={styles.square}>
          <Text style={[styles.audioText, { alignSelf: 'flex-start' }]}>Double Room </Text>
          <Text style={[styles.subText, { alignSelf: 'flex-start' }]}>Quarto Duplo</Text>
          <TouchableOpacity style={styles.button} onPress={playAudio21}>
            <FontAwesome name="microphone" size={24} color="black" />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1EFFF',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    flexGrow: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0303',
  },
  square: {
    width: 390,
    height: 121,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    marginBottom: 20,
  },
  audioText: {
    fontSize: 16,
    textAlign: 'left',
  },
  subText: {
    fontSize: 12,
    marginTop: 10,
    textAlign: 'left',
  },
  button: {
    marginTop: 10,
  },
});

export default AudioScreen;
