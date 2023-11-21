import { NavigationContainer } from '@react-navigation/native';
import { BottomNavgator, Navigator } from './src/Navgator/Navgator';

export default function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}