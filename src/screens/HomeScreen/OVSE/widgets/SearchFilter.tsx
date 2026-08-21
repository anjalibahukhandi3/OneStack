import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import THEME from '../../../../globals/theme';

interface SearchFilterProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChangeText,
  onClear,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Filter — district, mobile, DOB..."
        placeholderTextColor="#9E9E9E"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={() => {
            onChangeText('');
            onClear?.();
          }}
          style={styles.clearButton}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View style={styles.clearCircle}>
            <Text style={styles.clearText}>✕</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderWidth: 1,
    borderColor: THEME.borderInput,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  iconContainer: {
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 14,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: THEME.textDark,
    paddingVertical: 0,
    height: '100%',
  },
  clearButton: {
    padding: 4,
    marginLeft: 6,
  },
  clearCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#D0D0D0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default SearchFilter;
