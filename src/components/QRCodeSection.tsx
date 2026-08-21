import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';
import QRCode from 'react-native-qrcode-svg';


export const QRCodeSection: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Left: QR Code */}
      <QRCode
  value="https://resident.uidai.gov.in/verify?session=xyz123"
  size={64}
  color="#000000"
  backgroundColor="#FFFFFF"
/>

      {/* Right: Instructions */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Scan with Aadhaar app</Text>
        <Text style={styles.instructions}>
          Hand the device to the customer →{'\n'}
          Open Aadhaar app → Scan → Approve sharing
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  qrContainer: {
    width: 68,
    height: 68,
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrGrid: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 4,
    borderRadius: 6,
  },
  qrDot: {
    width: '18%',
    height: '18%',
    borderRadius: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 12,
    color: COLORS.textMuted,
    lineHeight: 17,
  },
});