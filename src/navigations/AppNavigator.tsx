import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RequestInfo from '../screens/HomeScreen/OVSE/RequestInfo';
import SplashScreen from '../screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  RequestInfo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="RequestInfo"
          component={RequestInfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;