import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';
import { AppUser } from '../../types/user';

type Props = {
  user: AppUser;
  onSignOut?: () => void;
};

export function ProfileScreen({ user, onSignOut }: Props) {
  const [alertsEnabled, setAlertsEnabled] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.email.charAt(0).toUpperCase()}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{user.displayName || 'O\'Care user'}</Text>
          <Text style={styles.meta}>{user.email}</Text>
          <Text style={styles.meta}>Role: {user.role}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.name}>Alerts on this device</Text>
            <Text style={styles.meta}>Critical messages for {user.role}</Text>
          </View>
          <Switch
            value={alertsEnabled}
            onValueChange={setAlertsEnabled}
            trackColor={{ true: '#ffd6b3', false: '#d1d5db' }}
            thumbColor={alertsEnabled ? colors.brand : '#fff'}
          />
        </View>

        {onSignOut ? (
          <Pressable style={styles.signOut} onPress={onSignOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: spacing.xxl + spacing.lg,
    gap: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff4eb',
    borderWidth: 1,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.brand,
    fontWeight: '800',
    fontSize: 24,
  },
  info: {
    gap: spacing.xs,
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
    color: colors.text,
  },
  meta: {
    color: colors.muted,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  signOut: {
    marginTop: spacing.sm,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    backgroundColor: '#fff1e6',
  },
  signOutText: {
    color: colors.brand,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
