import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigator, TabNavigator } from "./src/Navgator/Navigator";
import { StatusBar } from "expo-status-bar";

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <>
        <StatusBar style="auto" />
        <TabNavigator />
      </>
    </NavigationContainer>
  );
}
