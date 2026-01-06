import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

export function WriteScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Write a post</Text>
        <Text style={styles.body}>Compose a new update or anonymous whisper. Coming soon.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    paddingTop: spacing.xxl + spacing.lg,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    fontWeight: '800',
    fontSize: 18,
    marginBottom: spacing.sm,
    color: colors.text,
  },
  body: {
    color: colors.muted,
  },
});
