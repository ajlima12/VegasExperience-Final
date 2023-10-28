import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import { HotelCard } from "../components/HotelCard";

function HotelScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [hotelsData, setHotelsData] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Hotéis",
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
      },
      headerStyle: {
        backgroundColor: "#147DEB",
        height: 110,
        borderBottomColor: "transparent",
        shadowColor: "transparent",
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
    const fetchHotelsData = async () => {
      try {
        const collectionRef = firestore().collection("hoteis");
        const snapshot = await collectionRef.get();
        const hotels = snapshot.docs.map((doc) => doc.data());
        setHotelsData(hotels);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar dados do Firestore:", error);
      }
    };

    fetchHotelsData();
  }, []);

  if (loading === true) return;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {hotelsData.map((hotel, index) => (
          <View key={index} style={styles.hotelWrapper}>
            <HotelCard hotel={hotel} />
          </View>
        ))}
      </ScrollView>
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
    width: "90%",
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

export default HotelScreen;
