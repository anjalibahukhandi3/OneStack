import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigations/types';

type SplashScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoIcon}>❖</Text>
      </View>

      <Text style={styles.title}>MiniShop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  logoPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF1E8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoIcon: {
    fontSize: 48,
    color: '#DE7225',
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
  },
});

export default SplashScreen;