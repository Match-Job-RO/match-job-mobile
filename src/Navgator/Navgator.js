import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Map from "../screens/Map";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function Navigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Map" component={MapStackScreen} />
    </Tab.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      {/* Adicione outras telas do HomeStack aqui, se necessário */}
    </Stack.Navigator>
  );
}

function MapStackScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Map" component={Map} />
      {/* Adicione outras telas do MapStack aqui, se necessário */}
    </Stack.Navigator>
  );
}