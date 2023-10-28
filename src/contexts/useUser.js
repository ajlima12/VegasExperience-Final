import React, { createContext, useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(true);
  const [userInformations, setUserInformations] = useState({}); // {favorites: []}
  const [getInformations, setGetInformations] = useState(true);
  
  const { navigate } = useNavigation();

  async function toggleFavorite(name) {
    if(!user) {
      navigate("EntrarScreen");
      ToastAndroid.show('Faça o login para favoritar', ToastAndroid.SHORT);
      return;
    }
  
    const isFavorite = userInformations.favorites.includes(name);
  
    firestore().collection('users').doc(user.uid).update({
      Favoritos: isFavorite === true ? firestore.FieldValue.arrayRemove(name) : firestore.FieldValue.arrayUnion(name)
    });
  
    setUserInformations(prevState => ({
      ...prevState,
      favorites: isFavorite === true
        ? prevState.favorites.filter(favorite => favorite !== name) 
        : [...prevState.favorites, name]
    }));
  };

  async function handleSignOut() {
    await auth().signOut()
    .then(async () => {
      await GoogleSignin.signOut()
      .then(async () => {
        await GoogleSignin.revokeAccess();
        setUser(null);
        setUserInformations({favorites: []});
        ToastAndroid.show('Saiu com sucesso', ToastAndroid.SHORT);
      })
      .catch(() => setUser(null));
    })
    .catch(() => ToastAndroid.show('Erro ao sair', ToastAndroid.SHORT));
  };

  async function getUserInformations(userUid) {
    !getInformations && setGetInformations(true);
    firestore().collection('users').doc(userUid).get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        setUserInformations({favorites: documentSnapshot.data().Favoritos});
      } else {
        setUserInformations({favorites: []});
      }
    })
    .finally(() => {
      setGetInformations(false);
    })
  }

  async function handleGoogleSignIn() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential)
    .then(async (user) => {
      setUser(user.user);
      await firestore().collection('users').doc(user.user.uid).get()
      .then(async (documentSnapshot) => {
        if (!documentSnapshot.exists) {
          await firestore().collection('users').doc(user.user.uid).set({
            Favoritos: [],
          });
        } else {
          getUserInformations(user.user.uid);
        }
      })
      .then(() => {
        ToastAndroid.show('Entrou com sucesso', ToastAndroid.SHORT);
      })
    })
    .catch((error) => {
      console.log(error)
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleGoogleSignIn, handleSignOut, getInformations,
      setGetInformations, getUserInformations, userInformations, setUserInformations, toggleFavorite,  }}>
      {children}
    </UserContext.Provider>
  );
}