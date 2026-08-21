import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import THEME from '../../../../globals/theme';

export interface FieldItem {
  id: string;
  label: string;
  selected: boolean;
  required?: boolean;
}

interface InfoSectionProps {
  title: string;
  fields: FieldItem[];
  expanded: boolean;
  onToggleExpand: () => void;
  onToggleField: (id: string) => void;
  onToggleSection?: () => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({
  title,
  fields,
  expanded,
  onToggleExpand,
  onToggleField,
  onToggleSection,
}) => {
  const selectedCount = fields.filter(f => f.selected).length;
  const totalCount = fields.length;
  const allSelected = totalCount > 0 && selectedCount === totalCount;
  const someSelected = selectedCount > 0 && selectedCount < totalCount;

  const handleSectionCheckboxPress = () => {
    if (onToggleSection) {
      onToggleSection();
    }
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        {/* Section Select-All Checkbox */}
        <TouchableOpacity
          onPress={handleSectionCheckboxPress}
          activeOpacity={0.7}
          style={styles.sectionCheckboxContainer}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <View
            style={[
              styles.checkbox,
              allSelected && styles.checkboxSelected,
              someSelected && styles.checkboxIndeterminate,
            ]}
          >
            {allSelected && <Text style={styles.checkmark}>✓</Text>}
            {someSelected && <View style={styles.minusLine} />}
          </View>
        </TouchableOpacity>

        {/* Section Title & Expand button */}
        <TouchableOpacity
          style={styles.headerTouchable}
          onPress={onToggleExpand}
          activeOpacity={0.7}
        >
          <Text style={styles.sectionTitle}>{title.toUpperCase()}</Text>

          <View style={styles.rightHeader}>
            <Text style={styles.countText}>
              {`${selectedCount} / ${totalCount}`}
            </Text>
            <Text style={styles.arrowIcon}>
              {expanded ? '▲' : '▼'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Fields List */}
      {expanded && (
        <View style={styles.fieldsContainer}>
          {fields.map((field, index) => {
            const isLast = index === fields.length - 1;
            return (
              <TouchableOpacity
                key={field.id}
                style={[
                  styles.fieldRow,
                  isLast && styles.fieldRowLast,
                ]}
                onPress={() => onToggleField(field.id)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    field.selected && styles.checkboxSelected,
                  ]}
                >
                  {field.selected && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>

                <Text
                  style={[
                    styles.fieldLabel,
                    field.selected && styles.fieldLabelSelected,
                  ]}
                >
                  {field.label}
                </Text>

                {field.required && (
                  <View style={styles.requiredPill}>
                    <Text style={styles.requiredText}>Required</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.border,
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionCheckboxContainer: {
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTouchable: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.textDark,
    letterSpacing: 0.8,
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.textMuted,
    marginRight: 10,
  },
  arrowIcon: {
    fontSize: 11,
    color: THEME.textMuted,
    marginLeft: 2,
  },
  fieldsContainer: {
    marginTop: 8,
    paddingLeft: 4,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  fieldRowLast: {
    paddingBottom: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: THEME.checkboxBorder,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  checkboxIndeterminate: {
    backgroundColor: THEME.primary,
    borderColor: THEME.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 16,
    textAlign: 'center',
  },
  minusLine: {
    width: 10,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  fieldLabel: {
    marginLeft: 12,
    fontSize: 15,
    color: '#2A2A2A',
    fontWeight: '500',
    flex: 1,
  },
  fieldLabelSelected: {
    color: THEME.textDark,
    fontWeight: '500',
  },
  requiredPill: {
    backgroundColor: '#FFF1E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  requiredText: {
    fontFamily: 'Thin',
    fontSize: 11,
    color: THEME.primaryDark,
    fontWeight: '600',
  },
});

export default InfoSection;
