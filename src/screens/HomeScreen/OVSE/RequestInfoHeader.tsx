import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import THEME from '../../../globals/theme';

interface RequestInfoHeaderProps {
  onBack?: () => void;
  navigation?: any;
  title?: string;
}

const RequestInfoHeader: React.FC<RequestInfoHeaderProps> = ({
  onBack,
  navigation,
  title = 'Request Info',
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation?.goBack) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleBack}
        activeOpacity={0.7}
        hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      >
        <Text style={styles.backIcon}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  backIcon: {
    fontSize: 22,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  title: {
    fontFamily: 'Bold',
    fontSize: 21,
    fontWeight: '700',
    color: THEME.primary,
    letterSpacing: 0.2,
  },
});

export default RequestInfoHeader;
