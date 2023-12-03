import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Map from "../screens/Map";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function StackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Signup" component={Signup} />
			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
}
export function StackTabNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
}

export function TabNavigator() {
	return (
		<Tab.Navigator screenOptions={{ headerShown: false }}>
			<Tab.Screen name="Home" component={StackNavigator} />
			<Tab.Screen name="Map" component={StackNavigator} />
		</Tab.Navigator>
	);
}
