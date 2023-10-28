import React, { useContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth';

import EntrarScreen from "../pages/EntrarScreen";
import { StackRoutes } from "./stack.routes";

import { UserContext } from "../contexts/useUser";
import HomeScreen from "../pages/HomeScreen";
import { BottomTabRoutes } from "./tab.routes";

export function Routes() {
  const { user, setUser } = useContext(UserContext);

  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if(initializing) return null;
  return <BottomTabRoutes />;
}