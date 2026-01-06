import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../theme/theme';

type Props = {
  tagline?: string;
};

export function BrandHeader({ tagline }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Ionicons name="hand-left" size={58} color={colors.brand} />
        <Text style={styles.logoText}>C</Text>
      </View>
      <Text style={styles.title}>O&apos;Care</Text>
      {tagline ? <Text style={styles.tagline}>{tagline}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffaf5',
  },
  logoText: {
    position: 'absolute',
    fontSize: 28,
    fontWeight: '800',
    color: colors.brand,
    bottom: 18,
    right: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.brand,
    letterSpacing: 0.4,
  },
  tagline: {
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 240,
  },
});
