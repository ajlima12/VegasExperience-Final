import React from 'react';
import { ScrollView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Carousel = ({ navigation }) => {
  const images = [
    {
      id: 1,
      imageUrl: require('../assets/comercio.jpg'),
      description: 'Comércios',
      nextPage: 'ComercioScreen',
    },
    {
      id: 2,
      imageUrl: require('../assets/placas.jpg'),
      description: 'Placas',
      nextPage: 'PlacaScreen',
    },
    {
      id: 3,
      imageUrl: require('../assets/coversacao.jpg'),
      description: 'Conversação',
      nextPage: 'AudioScreen',
    },
    // Pode adicionar mais fotos
  ];

  const images2 = [
    {
      id: 4,
      imageUrl: require('../assets/zonasdeperigo.jpg'),
      description: 'Zonas de perigo',
      nextPage: 'ZonaPerigoScreen',
    },
    {
      id: 5,
      imageUrl: require('../assets/monetario.jpg'),
      description: 'Converter monetário',
      nextPage: 'ConverterScreen',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.carousel}>
        {images.map((image) => (
          <TouchableOpacity
            key={image.id}
            onPress={() => {
              if (image.nextPage === 'AudioScreen') {
                navigation.navigate('AudioScreen');
              } else {
                navigation.navigate(image.nextPage);
              }
            }}
          >
            <View style={styles.imageContainer}>
              <Image source={image.imageUrl} style={styles.image} />
              <Text style={styles.description}>{image.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.spacing} />

      <ScrollView horizontal contentContainerStyle={styles.carousel}>
        {images2.map((image) => (
          <TouchableOpacity
            key={image.id}
            onPress={() => {
              navigation.navigate(image.nextPage);
            }}
          >
            <View style={styles.imageContainer}>
              <Image source={image.imageUrl} style={styles.image} />
              <Text style={styles.description}>{image.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  carousel: {
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 30,
    marginLeft: 2,
    width: 150,
    height: 140,
    borderRadius: 8,
    overflow: 'visible',
    backgroundColor: '#F7F7F7',
  },
  image: {
    marginRight: 2,
    marginLeft: 2,
    width: 145,
    height: 75,
    borderRadius: 9,
    resizeMode: 'center',
  },
  description: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  spacing: {
    height: 1,
  },
});

export default Carousel;
