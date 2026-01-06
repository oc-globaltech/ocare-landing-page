import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';
import { UserRole } from '../../types/user';

type Props = {
  role: UserRole;
};

const threads = [
  { id: '1', name: 'Safety Alerts', lastMessage: 'Coordinator: Fire drill complete', unread: 2 },
  { id: '2', name: 'Teacher Room', lastMessage: 'New assignment posted', unread: 0 },
  { id: '3', name: 'Parent Group', lastMessage: 'Reminder: Parent-teacher night', unread: 1 },
];

export function MessagesScreen({ role }: Props) {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={threads}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.preview}>{item.lastMessage}</Text>
            <Text style={styles.meta}>Role: {role}</Text>
          </View>
          {item.unread ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </View>
          ) : null}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    paddingTop: spacing.xxl + spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff1e6',
    borderWidth: 1,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.brand,
    fontWeight: '800',
    fontSize: 18,
  },
  flex: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    fontWeight: '700',
    color: colors.text,
  },
  preview: {
    color: colors.muted,
  },
  meta: {
    color: colors.brand,
    fontSize: 12,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.brand,
    minWidth: 26,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
});
