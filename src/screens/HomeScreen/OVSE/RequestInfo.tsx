import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import THEME from '../../../globals/theme';
import RequestInfoHeader from './RequestInfoHeader';
import ContinueButton from './widgets/ContinueButton';
import InfoSection, { FieldItem } from './widgets/InfoSection';
import SearchFilter from './widgets/SearchFilter';

export interface FieldDefinition extends FieldItem {
  section: 'IDENTITY' | 'CONTACT' | 'ADDRESS' | 'OTHERS';
  aliases?: string[];
}
interface AppProps {
  navigation?: any;
}



const INITIAL_FIELDS: FieldDefinition[] = [
  // 1. IDENTITY (4/4 selected)
  {
    id: 'fullName',
    label: 'Full Name',
    selected: true,
    section: 'IDENTITY',
    required: true,
    aliases: ['name', 'full name'],
  },
  {
    id: 'dob',
    label: 'Date of Birth',
    selected: true,
    section: 'IDENTITY',
    required: true,
    aliases: ['dob', 'date of birth', 'birth', 'birthday', 'age'],
  },
  {
    id: 'gender',
    label: 'Gender',
    selected: true,
    section: 'IDENTITY',
    required: true,
    aliases: ['gender', 'sex'],
  },
  {
    id: 'photo',
    label: 'Photo',
    selected: true,
    section: 'IDENTITY',
    required: true,
    aliases: ['photo', 'image', 'picture', 'avatar'],
  },

  // 2. CONTACT (2/2 selected)
  {
    id: 'mobile',
    label: 'Mobile',
    selected: true,
    section: 'CONTACT',
    required: true,
    aliases: ['mobile', 'phone', 'number', 'cell', 'contact'],
  },
  {
    id: 'email',
    label: 'Email',
    selected: true,
    section: 'CONTACT',
    aliases: ['email', 'mail'],
  },

  // 3. ADDRESS (5/5 selected)
  {
    id: 'address',
    label: 'Address',
    selected: true,
    section: 'ADDRESS',
    required: true,
    aliases: ['address', 'street'],
  },
  {
    id: 'district',
    label: 'District',
    selected: true,
    section: 'ADDRESS',
    aliases: ['district'],
  },
  {
    id: 'villageTownCity',
    label: 'Village / Town / City',
    selected: true,
    section: 'ADDRESS',
    aliases: ['village', 'town', 'city', 'vtc'],
  },
  {
    id: 'state',
    label: 'State',
    selected: true,
    section: 'ADDRESS',
    aliases: ['state', 'province'],
  },
  {
    id: 'pincode',
    label: 'Pincode',
    selected: true,
    section: 'ADDRESS',
    aliases: ['pincode', 'pin', 'postal', 'zip', 'zipcode'],
  },

  // 4. OTHERS (0/23 selected, completing the full 34-field dataset)
  {
    id: 'building',
    label: 'Building',
    selected: false,
    section: 'OTHERS',
    aliases: ['building', 'house'],
  },
  {
    id: 'localBuilding',
    label: 'Local Building',
    selected: false,
    section: 'OTHERS',
    aliases: ['local building', 'house'],
  },
  {id: 'locality', 
   label: 'Locality', 
   selected: false, 
   section: 'OTHERS', 
   aliases: ['locality', 'area']},
  {id: 'localLocality', 
   label: 'Local Locality', 
   selected: false, 
   section: 'OTHERS', 
   aliases: ['local locality']},
  {
    id: 'street',
    label: 'Street',
    selected: false,
    section: 'OTHERS',
    aliases: ['street', 'road'],
  },
  {id:'localStreet',
   label:'Local Street',
   selected:false,
   section:'OTHERS',
   aliases:['local street','local road']},
  {
    id: 'landmark',
    label: 'Landmark',
    selected: false,
    section: 'OTHERS',
    aliases: ['landmark'],
  },

  {
    id: 'localLandmark',
    label: 'Local Landmark',
    selected: false,
    section: 'OTHERS',
    aliases: ['local landmark'],
  },
 
  
  
  {
    id: 'localVTC',
    label: 'Local Village / Town / City',
    selected: false,
    section: 'OTHERS',
    aliases: ['local village', 'local town', 'local city', 'local vtc'],
  },
  {
    id: 'Subdistrict',
    label: 'Subdistrict',
    selected: false,
    section: 'OTHERS',
    aliases: ['subdistrict']
  },
  {
    id: 'localSubdistrict',
    label: 'Local Subdistrict',
    selected: false,
    section: 'OTHERS',
    aliases: ['local subdistrict']
  },
  {
    id: 'localDistrict',
    label: 'Local District',
    selected: false,
    section: 'OTHERS',
    aliases: ['local district', 'district'],
  },
  {id:'localState',
   label:'Local State',
   selected:false,
   section:'OTHERS',
   aliases:['local state']},
  {
    id: 'regionalAddress',
    label: 'Regional Address',
    selected: false,
    section: 'OTHERS',
    aliases: ['regional address'],
  },
  {id:'localName',
   label:'Local Name',
   selected:false,
   section:'OTHERS',
   aliases:['local name']},
  {
    id: 'localponame',
    label: 'Local PO Name',
    selected: false,
    section: 'OTHERS',
    aliases: ['local po name', 'post office'],
  },
  {id:'credentialdate',
   label:'Credential Date',
   selected:false,
   section:'OTHERS',
   aliases:['credential date', 'date']},
  {
    id: 'ageAbove18',
    label: 'Age Above 18',
    selected: false,
    section: 'OTHERS',
    aliases: ['age above 18', '18', 'adult'],
  },
  {
    id: 'ageAbove50',
    label: 'Age Above 50',
    selected: false,
    section: 'OTHERS',
    aliases: ['age above 50', '50'],
  },
  {
    id: 'ageAbove60',
    label: 'Age Above 60',
    selected: false,
    section: 'OTHERS',
    aliases: ['age above 60', '60', 'senior'],},
   {
    id: 'ageAbove75',
    label: 'Age Above 75',
    selected: false,
    section: 'OTHERS',
    aliases: ['age above 75', '75'],
  },
  { id: 'isNri',
    label: 'Is NRI',
    selected: false,
    section: 'OTHERS',
    aliases: ['is nri', 'nri', 'overseas'],
  },
  { id: 'careOf',
    label: 'Care Of',
    selected: false,
    section: 'OTHERS',
    aliases: ['care of', 'c/o', 'co', 'guardian'],
  }
  
];

interface RequestInfoProps {
  navigation?: any;
}

const RequestInfo: React.FC<RequestInfoProps> = ({ navigation }) => {
  const [search, setSearch] = useState<string>('');
  const [fields, setFields] = useState<FieldDefinition[]>(INITIAL_FIELDS);

  // Section accordion expansion state (default: all expanded)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    IDENTITY: true,
    CONTACT: true,
    ADDRESS: true,
    OTHERS: true,
  });

  /* ---------------- Toggle single field ---------------- */
  const toggleField = useCallback((id: string) => {
    setFields(prevFields =>
      prevFields.map(field =>
        field.id === id
          ? { ...field, selected: !field.selected }
          : field,
      ),
    );
  }, []);

  /* ---------------- Toggle all fields in a section ---------------- */
  const toggleSection = useCallback((sectionKey: 'IDENTITY' | 'CONTACT' | 'ADDRESS' | 'OTHERS') => {
    setFields(prevFields => {
      const sectionFields = prevFields.filter(f => f.section === sectionKey);
      const allSelected = sectionFields.every(f => f.selected);
      const newSelectedValue = !allSelected;

      return prevFields.map(field =>
        field.section === sectionKey
          ? { ...field, selected: newSelectedValue }
          : field,
      );
    });
  }, []);

  /* ---------------- Toggle section expand/collapse ---------------- */
  const toggleExpand = useCallback((sectionKey: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  }, []);

  /* ---------------- Filter fields by search query ---------------- */
  const filteredFields = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (!trimmed) {
      return fields;
    }

    return fields.filter(field => {
      const matchLabel = field.label.toLowerCase().includes(trimmed);
      const matchId = field.id.toLowerCase().includes(trimmed);
      const matchAlias = field.aliases?.some(alias =>
        alias.toLowerCase().includes(trimmed),
      );
      return matchLabel || matchId || matchAlias;
    });
  }, [fields, search]);

  /* ---------------- Group fields by section ---------------- */
  const identityFields = useMemo(
    () => filteredFields.filter(f => f.section === 'IDENTITY'),
    [filteredFields],
  );

  const contactFields = useMemo(
    () => filteredFields.filter(f => f.section === 'CONTACT'),
    [filteredFields],
  );

  const addressFields = useMemo(
    () => filteredFields.filter(f => f.section === 'ADDRESS'),
    [filteredFields],
  );

  const othersFields = useMemo(
    () => filteredFields.filter(f => f.section === 'OTHERS'),
    [filteredFields],
  );

  /* ---------------- Counts ---------------- */
  const totalCount = fields.length; // exactly 34
  const selectedCount = useMemo(
    () => fields.filter(f => f.selected).length,
    [fields],
  );

  /* ---------------- Continue handler ---------------- */
  const handleContinue = () => {
    const selectedFields = fields.filter(f => f.selected);
    const selectedLabels = selectedFields.map(f => f.label).join(', ');

    if (navigation?.navigate) {
      Alert.alert(
        'e-KYC Request Info',
        `${selectedFields.length} fields requested:\n\n${selectedLabels}`,
        [
          {
            text: 'Done',
            onPress: () => navigation.goBack?.(),
          },
        ],
      );
    } else {
      Alert.alert('Fields Selected', `${selectedCount} of ${totalCount} fields selected.`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. Header */}
      <RequestInfoHeader navigation={navigation} />

      {/* 2. Scrollable Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Title */}
        <Text style={styles.heading}>Select information to request</Text>

        {/* Description */}
        <Text style={styles.description}>
          Fields sent to UIDAI as part of the Aadhaar OTP e-KYC request
        </Text>

        {/* Selected counter pill */}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {`${selectedCount} of ${totalCount} fields selected`}
          </Text>
        </View>

        {/* Search filter input */}
        <SearchFilter
          value={search}
          onChangeText={setSearch}
        />

        {/* IDENTITY section */}
        {(identityFields.length > 0 || !search) && (
          <InfoSection
            title="IDENTITY"
            fields={identityFields}
            expanded={expandedSections.IDENTITY}
            onToggleExpand={() => toggleExpand('IDENTITY')}
            onToggleField={toggleField}
            onToggleSection={() => toggleSection('IDENTITY')}
          />
        )}

        {/* CONTACT section */}
        {(contactFields.length > 0 || !search) && (
          <InfoSection
            title="CONTACT"
            fields={contactFields}
            expanded={expandedSections.CONTACT}
            onToggleExpand={() => toggleExpand('CONTACT')}
            onToggleField={toggleField}
            onToggleSection={() => toggleSection('CONTACT')}
          />
        )}

        {/* ADDRESS section */}
        {(addressFields.length > 0 || !search) && (
          <InfoSection
            title="ADDRESS"
            fields={addressFields}
            expanded={expandedSections.ADDRESS}
            onToggleExpand={() => toggleExpand('ADDRESS')}
            onToggleField={toggleField}
            onToggleSection={() => toggleSection('ADDRESS')}
          />
        )}

        {/* OTHERS section */}
        {(othersFields.length > 0 || !search) && (
          <InfoSection
            title="OTHERS"
            fields={othersFields}
            expanded={expandedSections.OTHERS}
            onToggleExpand={() => toggleExpand('OTHERS')}
            onToggleField={toggleField}
            onToggleSection={() => toggleSection('OTHERS')}
          />
        )}

        {/* Required Message Box */}
        <View style={styles.requiredMessageBox}>
          <View style={styles.infoIconCircle}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
          <Text style={styles.requiredMessageText}>
            Identity, Contact, Address and Photo are required for UPI mobile-number binding
          </Text>
        </View>

        {/* Bottom spacing for smooth scroll above fixed footer */}
        <View style={styles.scrollPaddingBottom} />
      </ScrollView>

      {/* 3. Fixed Bottom Action Area */}
      <View style={styles.footerContainer}>
        {/* Continue Button */}
        <View style={styles.continueButtonWrapper}>
          <ContinueButton
            onPress={handleContinue}
            title="Continue →"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: THEME.textDark,
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: THEME.textSecondary,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: THEME.primaryLight,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.primaryDark,
    fontFamily: 'Bold',
  },
  requiredMessageBox: {
    marginTop: 22,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoIconCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#6C757D',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
  },
  infoIconText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  requiredMessageText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: '#495057',
    fontWeight: '400',
  },
  scrollPaddingBottom: {
    height: 20,
  },
  footerContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: THEME.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
  continueButtonWrapper: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
});

export default RequestInfo;