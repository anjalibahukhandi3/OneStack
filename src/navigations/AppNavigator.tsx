import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { AadhaarVerificationScreen } from '../screens/AadhaarVerificationScreen';
import { KYCVerifiedScreen } from '../screens/KYCVerifiedScreen';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RequestInfo from '../screens/HomeScreen/OVSE/RequestInfo';
import SplashScreen from '../screens/SplashScreen';



const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
      <Stack.Navigator
        id="RootStack"
        initialRouteName="Splash"
        screenOptions={{ 
          headerShown: false,
          animation: 'fade',}}
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
        <Stack.Screen
        name="AadhaarVerification"
        component={AadhaarVerificationScreen}
      />
      <Stack.Screen
        name="KYCVerified"
        component={KYCVerifiedScreen}
      />
      </Stack.Navigator>
  );
};

export default AppNavigator;