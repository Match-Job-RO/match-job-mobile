import {
	BottomTabScreenProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Map from "../screens/Map";

// Seus tipos de parâmetros
type RootStackParamList = {
	Home: undefined;
	Map: undefined;
	Signup: undefined;
	Login: undefined;
};

type RootTabParamList = {
	Home: undefined;
	Map: undefined;
	Signup: undefined;
	Login: undefined;
};

// ...

// Seus componentes de navegação
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

// ...

// Propriedades de tela
export type HomeScreenProps = BottomTabScreenProps<RootTabParamList, "Home">;
export type SingupScreenProps = BottomTabScreenProps<
	RootTabParamList,
	"Signup"
>;
export type LoginScreenProps = BottomTabScreenProps<RootTabParamList, "Login">;
type MapScreenProps = BottomTabScreenProps<RootTabParamList, "Map">;

// ...

// ...

// Suas pilhas
function HomeStackScreen(): JSX.Element {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={Home} />
		</Stack.Navigator>
	);
}

function MapStackScreen(): JSX.Element {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Map" component={Map} />
		</Stack.Navigator>
	);
}

// ...

// Seu componente Navigator
export function Navigator(): JSX.Element {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Home" component={HomeStackScreen} />
			<Tab.Screen name="Map" component={MapStackScreen} />
		</Tab.Navigator>
	);
}
