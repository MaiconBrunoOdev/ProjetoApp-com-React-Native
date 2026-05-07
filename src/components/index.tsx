import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from 'react-native';

const COLORS = {
  primary: '#2E7D32',
  secondary: '#FFC107',
  background: '#F5F5F5',
  text: '#333333',
  border: '#CCCCCC',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
};

export { COLORS };

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginVertical: 8,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: '#FFFFFF',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginTop: 12,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subLabel,
}) => (
  <View style={[styles.card, { marginHorizontal: 8, flex: 1 }]}>
    <Text style={{ fontSize: 12, color: '#999', marginBottom: 4 }}>
      {label}
    </Text>
    <Text style={{ fontSize: 28, fontWeight: 'bold', color: COLORS.primary }}>
      {value}
    </Text>
    {subLabel && (
      <Text style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
        {subLabel}
      </Text>
    )}
  </View>
);

interface StudentItemProps {
  name: string;
  school: string;
  status: string;
  onPress?: () => void;
  onDelete?: () => void;
}

export const StudentItem: React.FC<StudentItemProps> = ({
  name,
  school,
  status,
  onPress,
  onDelete,
}) => (
  <TouchableOpacity
    style={styles.card}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.text }}>
          {name}
        </Text>
        <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
          {school}
        </Text>
      </View>
      <View
        style={[
          styles.badge,
          {
            backgroundColor:
              status === 'active' ? COLORS.success : COLORS.danger,
          },
        ]}
      >
        <Text style={styles.badgeText}>
          {status === 'active' ? 'Ativo' : 'Inativo'}
        </Text>
      </View>
    </View>
    {onDelete && (
      <TouchableOpacity
        onPress={onDelete}
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        }}
      >
        <Text style={{ color: COLORS.danger, fontSize: 13, fontWeight: '600' }}>
          Deletar
        </Text>
      </TouchableOpacity>
    )}
  </TouchableOpacity>
);

interface TripCardProps {
  time: string;
  route: string;
  students: number;
  capacity: number;
  status: string;
  onPress?: () => void;
  type: 'pickup' | 'return';
}

export const TripCard: React.FC<TripCardProps> = ({
  time,
  route,
  students,
  capacity,
  status,
  onPress,
  type,
}) => {
  const isFull = students === capacity;
  const percentage = Math.round((students / capacity) * 100);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.text }}>
            {type === 'pickup' ? '🚌 Ida' : '🚌 Volta'} - {time}
          </Text>
          <Text style={{ fontSize: 13, color: '#666', marginTop: 4 }}>
            {route}
          </Text>
        </View>
        <View
          style={[
            styles.badge,
            {
              backgroundColor: isFull ? COLORS.danger : COLORS.success,
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {students}/{capacity}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 12 }}>
        <View
          style={{
            height: 6,
            backgroundColor: COLORS.border,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: isFull ? COLORS.danger : COLORS.success,
            }}
          />
        </View>
        <Text style={{ fontSize: 11, color: '#666', marginTop: 4 }}>
          {percentage}% de ocupação
        </Text>
      </View>
    </TouchableOpacity>
  );
};

interface SearchBarProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  onChangeText,
  value,
}) => (
  <View style={{ marginBottom: 16 }}>
    <TextInput
      style={[
        styles.input,
        {
          paddingLeft: 40,
          fontSize: 14,
          height: 44,
        },
      ]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      onChangeText={onChangeText}
      value={value}
    />
  </View>
);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'danger' | 'secondary';
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) => {
  const backgroundColor =
    variant === 'danger'
      ? COLORS.danger
      : variant === 'secondary'
      ? COLORS.secondary
      : COLORS.primary;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor, opacity: disabled ? 0.5 : 1 },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
