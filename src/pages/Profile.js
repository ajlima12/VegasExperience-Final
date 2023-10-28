import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../contexts/useUser";
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Objetos de imagens
import {
  hotelImages,
  PontoTuristicoImages,
  pacoteImages,
  commerceImages,
} from "../utils/globalConts";

// Modifique o componente FavoriteCard
function FavoriteCard({ nome, descricao, onRemove, imageURIs, onPressCard }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressCard}>
      <Image style={styles.cardImage} source={imageURIs[0]} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{nome}</Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardText}>
          {descricao}
        </Text>
      </View>
      <TouchableOpacity style={styles.heartButton} onPress={onRemove}>
        <AntDesign name="heart" size={24} color="#0D4BF2" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function FavoriteCardPacotes2({
  agencia,
  hotel_pct,
  valor,
  descricao,
  onRemove,
  imageURIs,
  onPressCard,
}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPressCard}>
      <Image style={styles.cardImage} source={imageURIs[0]} />
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{agencia}</Text>
        <Text style={styles.cardTitlePacote}>{hotel_pct}</Text>
        <Text style={styles.cardTextPacote}>Valor: R$ {valor}</Text>
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardText}>
          {descricao}
        </Text>
      </View>
      <TouchableOpacity style={styles.heartButton} onPress={onRemove}>
        <AntDesign name="heart" size={24} color="#0D4BF2" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export function Profile() {
  const { user, userInformations, handleSignOut, toggleFavorite, getInformations } = useContext(UserContext);

  const [hoteis, setHoteis] = useState([]);
  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [comercio, setComercio] = useState([]);
  const [pacotes, setPacotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigationHoteis = useNavigation(); // Para hotéis

  useFocusEffect(useCallback(() => {
    !loading && setLoading(true);
    async function getData() {
      await firestore().collection("hoteis").get().then((querySnapshot) => {
        const hoteis = [];
        querySnapshot.forEach((documentSnapshot) => {
          userInformations.favorites && userInformations.favorites.forEach((favorite) => {
            if (favorite === documentSnapshot.data().nome_hot) {
              hoteis.push(documentSnapshot.data());
            }
          });
        });
        setHoteis(hoteis);
      });
      await firestore().collection("pontos_turisticos").get().then((querySnapshot) => {
        const pontosTuristicos = [];
        querySnapshot.forEach((documentSnapshot) => {
          pontosTuristicos.push(documentSnapshot.data());
        });
        setPontosTuristicos(pontosTuristicos);
      });
      await firestore().collection("centros_comerciais").get().then((querySnapshot) => {
        const comercio = [];
        querySnapshot.forEach((documentSnapshot) => {
          comercio.push(documentSnapshot.data());
        });
        setComercio(comercio);
      });
      await firestore().collection("pacotes_viagem").get().then((querySnapshot) => {
        const pacotes = [];
        querySnapshot.forEach((documentSnapshot) => {
          pacotes.push(documentSnapshot.data());
        });
        setPacotes(pacotes);
      });
      setLoading(false);
    };
    getData();
  }, [user, userInformations.favorites]));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image style={styles.image} source={{ uri: user.photoURL }} />
          <Text style={styles.username}>{user.displayName}</Text>
        </View>
        <TouchableOpacity style={styles.buttonLogout} onPress={handleSignOut}>
          <Feather name="log-out" size={20} color="white" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
      {!loading && !getInformations && userInformations.favorites.length !== 0 && userInformations.favorites !== null ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {userInformations.favorites.map((favorite, index) => {
              const favoriteData = hoteis.find((hotel) => hotel.nome_hot === favorite);
              if (favoriteData) {
                return (
                  <FavoriteCard
                    key={index}
                    nome={favoriteData.nome_hot}
                    descricao={favoriteData.descricao_hot}
                    imageURIs={hotelImages[favoriteData.nome_hot]}
                    onRemove={() => toggleFavorite(favoriteData.nome_hot)}
                    onPressCard={() =>
                      navigationHoteis.navigate("HotelScreen", {
                        hotelData: favoriteData,
                      })
                    }
                  />
                );
              }
              return null;
            })}

          {userInformations.favorites.map((favorite, index) => {
              const favoriteData = pontosTuristicos.find(
                (pontosTuristicos) => pontosTuristicos.nome_ptur === favorite
              );

              if (favoriteData) {
                return (
                  <FavoriteCard
                    key={index}
                    nome={favoriteData.nome_ptur}
                    descricao={favoriteData.descricao_ptur}
                    imageURIs={PontoTuristicoImages[favoriteData.nome_ptur]}
                    onRemove={() => toggleFavorite(favoriteData.nome_ptur)}
                    onPressCard={() =>
                      navigationHoteis.navigate("PontoTuristicoScreen", {
                        hotelData: favoriteData,
                      })
                    }
                  />
                );
              }
              return null;
            })}

          {userInformations.favorites.map((favorite, index) => {
              const favoriteData = comercio.find(
                (comercio) => comercio.nome_comer === favorite
              );

              if (favoriteData) {
                return (
                  <FavoriteCard
                    key={index}
                    nome={favoriteData.nome_comer}
                    descricao={favoriteData.descricao_comer}
                    imageURIs={commerceImages[favoriteData.nome_comer]}
                    onRemove={() => toggleFavorite(favoriteData.nome_comer)}
                    onPressCard={() =>
                      navigationHoteis.navigate("ComercioScreen", {
                        hotelData: favoriteData,
                      })
                    }
                  />
                );
              }
              return null;
            })}

          {userInformations.favorites.map((favorite, index) => {
            const favoriteData = pacotes.find(
              (pacote) => pacote.valor === favorite
            );
            if (favoriteData) {
              return (
                <FavoriteCardPacotes2
                  key={index}
                  agencia={favoriteData.agencia}
                  hotel_pct={favoriteData.hotel_pct}
                  valor={favoriteData.valor}
                  imageURIs={pacoteImages[favoriteData.agencia]}
                  onRemove={() => toggleFavorite(favoriteData.valor)}
                  onPressCard={() =>
                    navigationHoteis.navigate("PacoteScreen", {
                      hotelData: favoriteData,
                    })
                  }
                />
              );
            }
            return null;
          })}
        </ScrollView>
      ) : !loading && !getInformations && userInformations.favorites.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* criar quando nao tem favoritos */}
          <Text>Você não favoritou nada ainda</Text>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* carregando */}
          <Text>Carregando...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#147DEB",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },
  username: {
    color: "white",
    fontSize: 20,
    marginLeft: 10,
  },
  buttonLogout: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#0D4BF2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardImage: {
    width: 104,
    height: 148,
    borderRadius: 10,
    overflow: "hidden",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  cardTitlePacote: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
    color: "black",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: "black",
  },
});
