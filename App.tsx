import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StatusBar } from "expo-status-bar";
import RootNavigator from "./src/Navgator/Navigator";
import TabNavigator from "./src/Navgator/Navigator";

import { Ionicons } from "@expo/vector-icons";

export default function App(): JSX.Element {
  Ionicons.loadFont();
  return (
    <NavigationContainer>
      <>
        <StatusBar style="auto" />
        <TabNavigator />
      </>
    </NavigationContainer>
  );
}
