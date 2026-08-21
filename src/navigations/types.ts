import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { KYCData } from '../types/kyc';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  RequestInfo: undefined;
  AadhaarVerification: undefined;
  KYCVerified: { kycData?: KYCData } | undefined;

};

export type AadhaarVerificationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AadhaarVerification'
>;

export type KYCVerifiedScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'KYCVerified'
>;