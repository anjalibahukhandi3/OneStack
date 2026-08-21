import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { THEME } from '../globals/theme';
import { SAMPLE_KYC_DATA } from '../types/kyc';
import { KYCVerifiedScreenProps } from '../navigations/types';

export const KYCVerifiedScreen: React.FC<KYCVerifiedScreenProps> = ({
  route,
  navigation,
}) => {
  const kycData = route.params?.kycData || SAMPLE_KYC_DATA;

  const fields = [
    { label: 'DOB', value: kycData.dob },
    { label: 'GENDER', value: kycData.gender },
    { label: 'VTC', value: kycData.vtc },
    { label: 'DISTRICT', value: kycData.district },
    { label: 'STATE', value: kycData.state },
    { label: 'PINCODE', value: kycData.pincode },
    { label: 'ADDRESS', value: kycData.address },
  ];

  const handleSubmit = () => {
    Alert.alert(
      'Success',
      'Submitted successfully',
      [
        {
          text: 'OK',
          onPress: () => {
            navigation.popToTop(); 
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>KYC verified</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={true}>
        <View style={styles.successBadgeContainer}>
          <View style={styles.greenCircle}>
            <Text style={styles.checkmarkIcon}>✓</Text>
          </View>
          <Text style={styles.verifiedTitle}>KYC verified</Text>
          <Text style={styles.approvalSubtitle}>
            Approved by customer on Aadhaar app · {kycData.approvalDate}, {kycData.approvalTime}
          </Text>
        </View>

        <View style={styles.uidaiCard}>
          <View style={styles.uidaiHeaderStrip}>
            <View style={styles.statusDotRow}>
              <View style={styles.greenDot} />
              <Text style={styles.uidaiResponseText}>UIDAI response received</Text>
            </View>
            <Text style={styles.timeStampText}>{kycData.approvalTime}</Text>
          </View>

          <View style={styles.nameplateRow}>
            {kycData.profileImageUri ? (
              <Image source={{ uri: kycData.profileImageUri }} style={styles.avatarPlaceholder} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{kycData.name}</Text>
              <Text style={styles.maskedUid}>{kycData.maskedUid}</Text>
            </View>
          </View>

          <View style={styles.dottedDivider} />

          <View style={styles.fieldsInsideCard}>
            {fields.map((field, index) => (
              <View key={field.label} style={styles.fieldItem}>
                <Text style={styles.fieldLabel}>{field.label}</Text>
                <Text style={styles.fieldValue}>{field.value}</Text>
                {index < fields.length - 1 && <View style={styles.dottedDivider} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && { backgroundColor: THEME.primaryOrangePressed },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: THEME.white },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5E7EB',
    backgroundColor: THEME.white,
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: THEME.primaryOrange, letterSpacing: -0.2 },
  scrollContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
  successBadgeContainer: { alignItems: 'center', marginBottom: 20 },
  greenCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#2E854B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#2E854B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 3,
  },
  checkmarkIcon: { color: THEME.white, fontSize: 32, fontWeight: '800', lineHeight: 36 },
  verifiedTitle: { fontSize: 20, fontWeight: '800', color: '#111827', marginBottom: 6 },
  approvalSubtitle: { fontSize: 13, color: '#6B7280', textAlign: 'center', lineHeight: 18, paddingHorizontal: 16 },
  uidaiCard: {
    backgroundColor: THEME.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFE2D3',
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  uidaiHeaderStrip: {
    backgroundColor: '#F9EDE0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusDotRow: { flexDirection: 'row', alignItems: 'center' },
  greenDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#2E854B', marginRight: 8 },
  uidaiResponseText: { fontSize: 13, fontWeight: '700', color: '#111827' },
  timeStampText: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  nameplateRow: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatarPlaceholder: { width: 58, height: 62, backgroundColor: '#EBECEF', borderRadius: 12, marginRight: 14 },
  userInfo: { flex: 1, justifyContent: 'center' },
  userName: { fontSize: 17, fontWeight: '800', color: '#111827', marginBottom: 4 },
  maskedUid: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  fieldsInsideCard: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  fieldItem: { marginBottom: 16 },
  fieldLabel: {
    fontFamily: Platform.select({ ios: 'Courier', android: 'monospace', default: 'monospace' }),
    fontSize: 11,
    fontWeight: '600',
    color: '#8A8A8E',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  fieldValue: { fontSize: 15, fontWeight: '700', color: '#111827', lineHeight: 21 },
  dottedDivider: {
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dotted',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: THEME.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E7EB',
  },
  submitButton: {
    backgroundColor: THEME.primaryOrange,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.primaryOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  submitButtonText: { color: THEME.white, fontSize: 16, fontWeight: '700' },
});