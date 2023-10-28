import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { UserContext } from "../contexts/useUser";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { Profile } from "./Profile";
import { useLayoutEffect } from "react";
import { MaterialIcons } from '@expo/vector-icons';

function EntrarScreen() {
  const { handleGoogleSignIn, handleSignOut, user } = useContext(UserContext);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, // Removendo a barra de navegação
    });
  }, [navigation]); 

  if (user) return <Profile />;
  return (
    <View style={styles.container}>
      {user && (
        <>
          <View style={styles.userInformations}>
            <Text style={styles.username}>{`Olá, ${user.displayName}!`}</Text>
            {user.email && <Text style={styles.email}>{user.email}</Text>}
          </View>
          <TouchableOpacity style={styles.buttonLogout} onPress={handleSignOut}>
            <Feather
              name="log-out"
              size={15}
              color="white"
              style={{ lineHeight: 20 }}
            />
            <Text style={styles.buttonLogoutText}>Sair</Text>
          </TouchableOpacity>
        </>
      )}
      {!user && (
        <>
          <Text style={styles.username}>
            {"Para personalizar seu roteiro,\nfaça o login!"}
          </Text>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
          >
            <Image
              source={require("../assets/googleIcon.png")}
              style={styles.googleButtonImage}
            />
            <Text style={styles.googleButtonText}>Entrar com Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.adminButton} // Removendo a classe extra 'styles.button'
            onPress={() => navigation.navigate("AdminScreen")}
          >
            <Text style={styles.adminButtonText}> Administrador </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F1EFFF",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  userInformations: {
    alignItems: "center",
    justifyContent: "center",
  },
  username: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  email: {
    textAlign: "center",
  },
  buttonLogout: {
    marginTop: 20,
    flexDirection: "row",
    width: "80%",
    height: 50,
    backgroundColor: "#147DEB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 5,
  },
  buttonLogoutText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
  googleButton: {
    marginTop: 20,
    flexDirection: "row",
    width: "80%",
    height: 50,
    backgroundColor: "#147DEB",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    elevation: 5,
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
  },
  googleButtonImage: {
    width: 20,
    height: 20,
    marginLeft: 15, // Espaço entre o texto e a imagem
    marginRight: 10,
    width: 33,
    height: 33,
  },
  adminButton: {
    borderRadius: 5,
    padding: 8,
    position: "absolute",
    bottom: 20,
    right: 15,
    backgroundColor: "#F1EFFF", // Personalize as cores conforme necessário
  },
  adminButtonText: {
    color: "#147DEB",
    fontSize: 14,
    textDecorationLine: "underline",
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default EntrarScreen;
