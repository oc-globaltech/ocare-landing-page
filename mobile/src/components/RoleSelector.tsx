import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../theme/theme';
import { UserRole } from '../types/user';

type Props = {
  value: UserRole;
  onChange: (role: UserRole) => void;
};

const roles: UserRole[] = ['admin', 'coordinator', 'teacher', 'parent', 'student'];

export function RoleSelector({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>I am signing in as</Text>
      <View style={styles.pills}>
        {roles.map((role) => (
          <Pressable
            key={role}
            onPress={() => onChange(role)}
            style={({ pressed }) => [
              styles.pill,
              value === role && styles.active,
              pressed && styles.pressed,
            ]}
          >
            <Text style={[styles.text, value === role && styles.activeText]}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  label: {
    color: colors.muted,
    fontSize: 14,
  },
  pills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  pill: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  active: {
    backgroundColor: '#fff4eb',
    borderColor: colors.brand,
  },
  pressed: {
    transform: [{ translateY: 1 }],
  },
  text: {
    color: colors.text,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  activeText: {
    color: colors.brand,
  },
});
