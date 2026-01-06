import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../theme/theme';

const entries = [
  { id: '1', title: 'Mood check-in', detail: 'Feeling calm after mindfulness activity', date: 'Today' },
  { id: '2', title: 'Progress note', detail: 'Completed reading assignment early', date: 'Yesterday' },
  { id: '3', title: 'Reminder', detail: 'Schedule follow-up with counselor', date: 'Mon' },
];

export function DiaryScreen() {
  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={entries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.detail}>{item.detail}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  date: {
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  detail: {
    color: colors.muted,
  },
});
