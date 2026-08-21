export interface KYCData {
  name: string;
  maskedUid: string;
  approvalDate: string;
  approvalTime: string;
  profileImageUri?: string;
  dob: string;
  gender: string;
  vtc: string;
  district: string;
  state: string;
  pincode: string;
  address: string;
}

export const SAMPLE_KYC_DATA: KYCData = {
  name: 'Shivani Verma',
  maskedUid: 'UID-XXXX-XXXX-8841',
  approvalDate: '03 Jul 2026',
  approvalTime: '14:22 IST',
  dob: '18-11-2000',
  gender: 'Female',
  vtc: 'Meerut 4',
  district: 'Meerut',
  state: 'Uttar Pradesh',
  pincode: '250004',
  address: 'D/O Lakhan Lal Singh, H No 31, Pravesh Vihar, Shanti Nagar, Meerut, Near S.A.M Medical College, Meerut, Uttar Pradesh, 250004',
};