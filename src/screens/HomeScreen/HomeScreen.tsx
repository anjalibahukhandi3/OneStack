import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          My App
        </Text>
      </View>

      {/* Content */}
      <View style={styles.content}>

        <Text style={styles.heading}>
          OVSE
        </Text>


        {/* Profile Info */}
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('RequestInfo')
          }
        >
          <View>
            <Text style={styles.cardTitle}>
              OVSE
            </Text>

            <Text style={styles.cardDescription}>
              Aadhaar OTP e-KYC via e-KYC Setu
            </Text>
          </View>

          <Text style={styles.arrow}>
            →
          </Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 65,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#DE7225',
  },

  content: {
    flex: 1,
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111111',
  },

  description: {
    marginTop: 6,
    fontSize: 15,
    color: '#777777',
  },

  card: {
    marginTop: 25,
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#222222',
  },

  cardDescription: {
    marginTop: 6,
    fontSize: 13,
    color: '#777777',
  },

  arrow: {
    fontSize: 24,
    color: '#DE7225',
  },
});

export default HomeScreen;