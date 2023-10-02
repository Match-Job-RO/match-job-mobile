import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Home from "../screens/Home";

const Stack = createStackNavigator();

export default function Navigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen name="Signup" component={Signup} /> */}
    </Stack.Navigator>
  );
}