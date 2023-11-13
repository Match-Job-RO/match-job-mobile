import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Signup from "../screens/Signup";
import Map from "../screens/Map";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
}
