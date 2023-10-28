import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet, ScrollView, Image, Text, Linking } from 'react-native';
import Swiper from 'react-native-swiper';
import firestore from "@react-native-firebase/firestore";
import { UserContext} from "../contexts/useUser";
import { pacoteImages } from '../utils/globalConts';
import pacoteUrls from '../contexts/pacoteLinks';


function PacoteCard({ pacote }) {
  
  // lembrar de importar o useContext;
  const { user, userInformations, toggleFavorite } = useContext(UserContext);
  const { companhia_aerea, duracao, hotel_pct, pagantes, valor, cod_pct, agencia} = pacote; //nome do campo
  const imagens = pacoteImages[agencia];// Obtém as imagens do hotel com base no nome
  const rating = pacote.rating || 4.5; // Valor padrão para a classificação

  

  const url = pacoteUrls[cod_pct]; // Obtém a URL com base no código do pacote

 
  return (
    <View style={styles.pacoteCard}>
      

      <View style={styles.pacoteHeader}>
        <Text style={styles.pacoteName}>{agencia}</Text>
        {/* chamar a função toggleFavorite passando o nome do hotel */}
   <TouchableOpacity
        onPress={() => toggleFavorite(valor)}
        style={styles.favoriteButton}
      >
        <MaterialIcons
          // verifica se o hotel esta na lista de favoritos, caso esteja ele exibira o icone de favorito preenchido, caso nao esteja ele exibira o icone de favorito vazio
          name={user && userInformations?.favorites.includes(valor) ? 'favorite' : 'favorite-border'}
          size={24}
          color={user && userInformations?.favorites.includes(valor) ? '#0D4BF2' : '#0D4BF2'}
        />
      </TouchableOpacity>
      </View>

      <View style={styles.carouselContainer}>
        <Swiper autoplay={true} height={150}>
          {imagens.map((imagem, index) => (
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
        <StarsRating rating={rating} />
      </View>
      <Text style={styles.valorDescription}>{valor}</Text>

      
      <View style={styles.airplane}>
      <View style={styles.airplaner}>
      <MaterialIcons name="airplanemode-on" size={16} color="#147DEB" style={styles.locationIcon}/> 
      </View>
     <Text style={styles.pacoteDescription}>{companhia_aerea}</Text>
     
      </View>
      

      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MaterialIcons name="location-on" size={16} color="#147DEB" style={styles.locationIcon} />
        </View>
        <Text style={styles.pacoteLocation}>{hotel_pct}</Text>
      </View>



<View style={styles.duracaoC}>
  <View style={styles.duracaoIcon}>
  <MaterialIcons name="date-range" size={16} color="#147DEB" style={styles.locationIcon} />
  </View>
  <Text style={styles.pacoteDescription}>{duracao}</Text>
</View>
      
      

<View style={styles.pagantesC}>
  <View style={styles.pagantesIcon}>
  <MaterialIcons name="person" size={16} color="#147DEB" style={styles.locationIcon} />
  </View>
   <Text style={styles.pacoteDescription}>{pagantes}</Text>
   
</View>  

<TouchableOpacity
        style={styles.verDetalhesButton}
        onPress={() => {
         Linking.openURL(url);
          }}
      >
        <Text style={styles.verDetalhesButtonText}>Ir ao site</Text>
      </TouchableOpacity>
    </View> 
     
 
  );
};


// Componente StarsRating - exibe a classificação de estrelas com base na pontuação
const StarsRating = ({ rating }) => {
  const filledStars = Math.floor(rating);// A variável filledStars armazena a parte inteira da pontuação (número de estrelas cheias)
  const hasHalfStar = rating % 1 !== 0;// essa variavel verifica se a pontuação tem decimal, caso tenha ela cria uma meia estrela.
  // A função renderStars recebe um valor count (número total de estrelas) e filled (booleano indicando
  // se as estrelas devem ser preenchidas ou vazias) e retorna um array de elementos de ícones de estrelas
  const renderStars = (count, filled) => {
    // Determina o nome do ícone de estrela a ser usado com base na propriedade filled (preenchido)
    const starIconName = filled ? 'star' : 'star-border';

    // Cria um array com o tamanho count (número total de estrelas) e preenche-o com valores undefined
    // Em seguida, mapeia o array e retorna elementos de ícones de estrelas, com índices únicos como key
    // e o nome do ícone de estrela definido pela variável starIconName
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
    <>
    {/* chmando a função renderstars para preencher as estrelas com base no numero que esta na variavel filledstars e retorna mostrando as estrelas*/}
      {renderStars(filledStars, true)}
      {/* essa condicional verifica se a uma meia estrela, caso tenha a condional entrara no true e sera exibido a meia estrela */}
      {hasHalfStar && <MaterialIcons name="star-half" size={20} color="#FFD700" />}
      {/* Renderiza as estrelas vazias com base no número total de estrelas (5) menos as cheias (Math.ceil(rating)). */}
      {renderStars(5 - Math.ceil(rating), false)}
    </>
  );
};

const PacotesScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pacotesData, setPacotesData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Pacotes de viagem',
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

   // useEffect é usado para buscar os dados dos hotéis ao carregar a tela
  useEffect(() => {
    // Função para buscar os dados dos hotéis na coleção "hoteis" do Firestore
    const fetchPacotesData = async () => {
      try {
        const collectionRef = firestore().collection('pacotes_viagem');
        const snapshot = await collectionRef.get();
        const pacotes = snapshot.docs.map((doc) => doc.data());
        setPacotesData(pacotes);
        setLoading(false);
        console.log(pacotes);
      } catch (error) {
        console.log('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchPacotesData();
  }, []);

  if(loading === true) return;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {pacotesData.map((pacote, index) => (
          <View key={index} style={styles.pacoteWrapper}>
            <PacoteCard pacote={pacote} />
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
  pacoteWrapper: {
    marginBottom: 20,
  },
  pacoteCard: {
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
  pacoteName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  pacoteLocation: {
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
  pacoteDescription: {
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
  valorDescription: {
fontSize: 24,
color: '#0D4BF2',
fontWeight: 'bold',
marginBottom: 8,
  },
  airplane: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  airplaner: {
    marginRight: 4,
  },
  duracaoC: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  duracaoIcon: {
    marginRight: 4,
  },
  pagantesC: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  pagantesIcon:{
    marginRight: 4,
  },
  verDetalhesButton: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  verDetalhesButtonText: {
    color: '#0D4BF2',
    fontSize: 18,
    textDecorationLine: 'underline',
    
  },
  favoriteButton: {
    position: "absolute",
    top: -7,
    right: 10,
    marginRight: -10,
   
  }, 
});


export default PacotesScreen;
