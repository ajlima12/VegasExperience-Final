import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import Swiper from "react-native-swiper";

import { hotelImages } from "../utils/globalConts";
import { UserContext } from "../contexts/useUser";

// Componente StarsRating - exibe a classificação de estrelas com base na pontuação
const StarsRating = ({ rating }) => {
  const filledStars = Math.floor(rating); // A variável filledStars armazena a parte inteira da pontuação (número de estrelas cheias)
  const hasHalfStar = rating % 1 !== 0; // essa variavel verifica se a pontuação tem decimal, caso tenha ela cria uma meia estrela.
  // A função renderStars recebe um valor count (número total de estrelas) e filled (booleano indicando
  // se as estrelas devem ser preenchidas ou vazias) e retorna um array de elementos de ícones de estrelas
  const renderStars = (count, filled) => {
    // Determina o nome do ícone de estrela a ser usado com base na propriedade filled (preenchido)
    const starIconName = filled ? "star" : "star-border";

    // Cria um array com o tamanho count (número total de estrelas) e preenche-o com valores undefined
    // Em seguida, mapeia o array e retorna elementos de ícones de estrelas, com índices únicos como key
    // e o nome do ícone de estrela definido pela variável starIconName
    return Array(count)
      .fill()
      .map((_, index) => (
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
      {hasHalfStar && (
        <MaterialIcons name="star-half" size={20} color="#FFD700" />
      )}
      {/* Renderiza as estrelas vazias com base no número total de estrelas (5) menos as cheias (Math.ceil(rating)). */}
      {renderStars(5 - Math.ceil(rating), false)}
    </>
  );
};

export function HotelCard({ hotel }) {
  // lembrar de importar o useContext;
  const { user, userInformations, toggleFavorite } = useContext(UserContext);

  const { nome_hot, localizacao_hot, descricao_hot } = hotel; //nome do campo
  const imagens = hotelImages[nome_hot]; // Obtém as imagens do hotel com base no nome
  const rating = hotel.rating || 4.5; // Valor padrão para a classificação

  return (
    <View style={styles.hotelCard}>
      <View style={styles.hotelHeader}>
        <Text style={styles.hotelName}>{nome_hot}</Text>
      </View>
      <View style={styles.carouselContainer}>
        <Swiper autoplay={true} height={150}>
          {imagens.map((imagem, index) => (
            <View key={index} style={styles.slide}>
              <Image source={imagem} style={styles.image} />
            </View>
          ))}
        </Swiper>
      </View>
      <View style={styles.starsContainer}>
        <StarsRating rating={rating} />
      </View>
      <View style={styles.locationContainer}>
        <View style={styles.locationIconContainer}>
          <MaterialIcons
            name="location-on"
            size={16}
            color="#147DEB"
            style={styles.locationIcon}
          />
        </View>
        <Text style={styles.hotelLocation}>{localizacao_hot}</Text>
      </View>
      <Text style={styles.hotelDescription}>{descricao_hot}</Text>
      {/* chamar a função toggleFavorite passando o nome do hotel */}
      <TouchableOpacity
        onPress={() => toggleFavorite(nome_hot)}
        style={styles.favoriteButton}
      >
        <MaterialIcons
          // verifica se o hotel esta na lista de favoritos, caso esteja ele exibira o icone de favorito preenchido, caso nao esteja ele exibira o icone de favorito vazio
          name={user && userInformations?.favorites.includes(nome_hot) ? 'favorite' : 'favorite-border'}
          size={24}
          color={user && userInformations?.favorites.includes(nome_hot) ? '#0D4BF2' : '#0D4BF2'}
        />
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFFF",
  },
  favoriteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  hotelWrapper: {
    marginBottom: 20,
  },
  hotelCard: {
    width: "92%",
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
  },

  favoriteButton: {
    position: "absolute",
    top: 7,
    right: 12,
    marginRight: -6,
   
  },   
  hotelName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  hotelLocation: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  hotelDescription: {
    fontSize: 16,
    color: "#333",
  },
  carouselContainer: {
    width: "100%",
    height: 150,
    borderRadius: 20,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationIconContainer: {
    marginRight: 4,
  },
});