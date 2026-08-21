import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { QRCodeSection } from './QRCodeSection';
import { THEME } from '../globals/theme';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const AadhaarVerificationScreen: React.FC = () => {
  const [showQR, setShowQR] = useState<boolean>(true);

  const toggleQRCode = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowQR((prev) => !prev);
  };

  const handleRedirect = () => {
    // Action to open Aadhaar URL or Deep Link
    console.log('Redirecting to Aadhaar App...');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable hitSlop={10} style={styles.backButton} onPress={() => console.log('Go back')}>
          <Text style={styles.backChevron}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Aadhaar verification</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Peach Card Container */}
        <View style={styles.card}>
          {/* Top ID Card Badge */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <View style={styles.idCardIcon}>
                <View style={styles.idCardCircle} />
                <View style={styles.idCardLine} />
              </View>
            </View>
          </View>

          {/* Heading & Subtitle */}
          <Text style={styles.cardTitle}>Authenticate with Aadhaar</Text>
          <Text style={styles.cardSubtitle}>
            Verify the customer directly with UIDAI to fetch the requested fields
          </Text>

          {/* Orange Redirect Button */}
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && { backgroundColor: THEME.primaryOrangePressed },
            ]}
            onPress={handleRedirect}
          >
            <Text style={styles.primaryButtonText}>Redirect to Aadhaar App</Text>
          </Pressable>

          {/* Toggle QR Button */}
          <Pressable hitSlop={8} style={styles.togglePressable} onPress={toggleQRCode}>
            <Text style={styles.toggleText}>
              {showQR ? 'Hide QR ^' : 'Show QR ˇ'}
            </Text>
          </Pressable>

          {/* Collapsible QR Code Box */}
          {showQR && <QRCodeSection />}
        </View>

        {/* Bottom Pill Indicator */}
        <View style={styles.bottomPillContainer}>
          <View style={styles.bottomPill}>
            <Text style={styles.bottomPillText}>10 fields requested</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backChevron: {
    fontSize: 28,
    fontWeight: '700',
    color: THEME.primaryOrange,
    lineHeight: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.primaryOrange,
    letterSpacing: -0.2,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  card: {
    backgroundColor: THEME.cardBackground,
    borderRadius: 24,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.borderLight,
  },
  badgeContainer: {
    marginBottom: 16,
  },
  badge: {
    width: 60,
    height: 60,
    backgroundColor: THEME.white,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  idCardIcon: {
    width: 32,
    height: 22,
    borderWidth: 2,
    borderColor: THEME.primaryOrange,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 3,
    justifyContent: 'space-between',
  },
  idCardCircle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: THEME.primaryOrange,
  },
  idCardLine: {
    width: 10,
    height: 2,
    backgroundColor: THEME.primaryOrange,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 13,
    color: THEME.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: THEME.primaryOrange,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: '700',
  },
  togglePressable: {
    marginTop: 14,
    paddingVertical: 4,
  },
  toggleText: {
    color: THEME.primaryOrange,
    fontSize: 14,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  bottomPillContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  bottomPill: {
    backgroundColor: THEME.pillBackground,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bottomPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.textMuted,
  },
});