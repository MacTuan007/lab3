import 'react-native-gesture-handler';
import Login from './src/login'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Register from './src/register';
import Home from './src/home';
import Additem from './src/additem';
import Updateitem from './src/updateitem';
import Personal from './src/personal';
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
        <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='Additem' component={Additem} options={{ headerShown: false }} />
        <Stack.Screen name='Updateitem' component={Updateitem} options={{ headerShown: false }} />
        <Stack.Screen name='Personal' component={Personal} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

