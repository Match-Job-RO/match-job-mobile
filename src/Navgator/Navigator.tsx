import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Map from "../screens/Map";
import Post from "../screens/Post";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Post" component={Post} />
		</Stack.Navigator>
	);
}
function MainStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
}
function TabNavigator() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Map") {
						iconName = focused ? "map" : "map-outline";
					}

					return <Ionicons name={iconName} size={size} color={color} />;
				},
			})}
			tabBarOptions={{
				activeTintColor: "blue",
				inactiveTintColor: "gray",
				style: "bg-white",
			}}>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="Map" component={Map} />
		</Tab.Navigator>
	);
}
export default function RootNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="Main"
				component={TabNavigator}
				options={{ animationEnabled: false }}
			/>
			<Stack.Screen
				name="Auth"
				component={AuthStack}
				options={{ animationEnabled: false }}
			/>
		</Stack.Navigator>
	);
}
