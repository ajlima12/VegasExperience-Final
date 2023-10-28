import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from "@react-native-firebase/firestore";
import { UserContext } from '../contexts/useUser';
import {commerceImages} from '../utils/globalConts';


function ComercioCard({ commerce }) {
  const { user, userInformations, toggleFavorite } = useContext(UserContext);

  const { nome_comer, localizacao_comer, descricao_comer } = commerce;// nome dos campos da tabela
  const imagens = commerceImages[nome_comer];
  const rating = commerce.rating || 4.5;

  const renderStars = (count, filled) => {
    const starIconName = filled ? 'star' : 'star-border';
    return Array(count).fill().map((_, index) => (
      <MaterialIcons
        key={index}
        name={starIconName}
        size={20}
        color="#FFD700"
      />
    ));
  };

  return (
    <View style={styles.commerceCard}>
      <View style={styles.commerceHeader}>
       {/* chamar a função toggleFavorite passando o nome do hotel */}
     
        <Text style={styles.commerceName}>{nome_comer}</Text>
        <TouchableOpacity
        onPress={() => toggleFavorite(nome_comer)}
        style={styles.favoriteButton}
      >
        <MaterialIcons
          // verifica se o hotel esta na lista de favoritos, caso esteja ele exibira o icone de favorito preenchido, caso nao esteja ele exibira o icone de favorito vazio
          name={user && userInformations?.favorites.includes(nome_comer) ? 'favorite' : 'favorite-border'}
          size={24}
          color={user && userInformations?.favorites.includes(nome_comer) ? '#0D4BF2' : '#0D4BF2'}
        />
      </TouchableOpacity>
      </View>
      <View style={styles.carouselContainer}>
        <Swiper autoplay height={150}>
          {imagens !== undefined && imagens.map((imagem, index) => (
            <View key={index} style={styles.slide}>
              <Image
                source={imagem}
                style={styles.image}
              />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.starsContainer}>
        {renderStars(Math.floor(rating), true)}
        {rating % 1 !== 0 && <MaterialIcons name="star-half" size={20} color="#FFD700" />}
        {renderStars(5 - Math.ceil(rating), false)}
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MaterialIcons name="location-on" size={16} color="#147DEB" style={styles.locationIcon} />
        </View>
        <Text style={styles.commerceLocation}>{localizacao_comer}</Text>
      </View>
      <Text style={styles.commerceDescription}>{descricao_comer}</Text>
    
    </View>
  );
};

const ComercioScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [commerceData, setCommerceData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Centros Comerciais',
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
    const fetchCommerceData = async () => {
      try {
        const collectionRef = firestore().collection('centros_comerciais');//nome da tabela
        const snapshot = await collectionRef.get();
        const commerceList = snapshot.docs.map((doc) => doc.data());
        setCommerceData(commerceList);
        setLoading(false);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
        setLoading(false);
      }
    };

    fetchCommerceData();
  }, []);

  if (loading) return null;

  return (
    <View style={styles.container}> 

      <ScrollView contentContainerStyle={styles.contentContainer}>
     {commerceData.map((commerce, index) => (
          <View key={index} style={styles.commerceWrapper}>
            <ComercioCard commerce={commerce} />
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
  favoriteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: -7,
    right: 10,
    marginRight: -10,
   
  }, 
  
  contentContainer: {
    paddingBottom: 20,
  },
  commerceWrapper: {
    marginBottom: 20,
  },
  commerceCard: {
    width: '93%',
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
  commerceName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  commerceLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  commerceDescription: {
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

export default ComercioScreen;
