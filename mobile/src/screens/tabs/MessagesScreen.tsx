import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/theme';
import { UserRole } from '../../types/user';

type Props = {
  role: UserRole;
};

type Thread = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  members?: string;
  avatar?: string;
};

const threads: Thread[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    lastMessage: 'Thank you for listening, it really helps.',
    time: '2m ago',
    unread: 2,
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '2',
    name: 'Mental Health Circle',
    members: '12 members',
    lastMessage: "Emma: That's a great coping strategy...",
    time: '15m ago',
    unread: 5,
  },
  {
    id: '3',
    name: 'Mike Chen',
    lastMessage: 'I totally understand how you feel...',
    time: '1h ago',
    unread: 0,
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=60',
  },
  {
    id: '4',
    name: 'Wellbeing Coach',
    lastMessage: 'Schedule a quick check-in this week?',
    time: '2h ago',
    unread: 1,
  },
  {
    id: '5',
    name: 'Parent Group',
    lastMessage: 'Reminder: Parent-teacher night this Friday.',
    time: '3h ago',
    unread: 3,
  },
  {
    id: '6',
    name: 'Study Buddies',
    members: '8 members',
    lastMessage: 'New study guide uploaded to the group.',
    time: '4h ago',
    unread: 0,
  },
  {
    id: '7',
    name: 'Counselor',
    lastMessage: 'Let me know if you need resources on coping strategies.',
    time: '5h ago',
    unread: 0,
  },
];

export function MessagesScreen({ role }: Props) {
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'groups'>('all');

  const pills = [
    { key: 'all' as const, label: 'All' },
    { key: 'unread' as const, label: 'Unread' },
    { key: 'read' as const, label: 'Read' },
    { key: 'groups' as const, label: 'Groups' },
  ];

  const filteredThreads = useMemo(() => {
    switch (filter) {
      case 'unread':
        return threads.filter((t) => t.unread > 0);
      case 'read':
        return threads.filter((t) => t.unread === 0);
      case 'groups':
        return threads.filter((t) => !!t.members);
      default:
        return threads;
    }
  }, [filter]);

  return (
    <View style={styles.screen}>
      {/* TOP BAR */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Image
            source={require('../../../assets/ocare-copy.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Chats</Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.roundButton}>
            <Feather name="plus" size={20} color="#fff" />
          </View>
          <View style={[styles.roundButton, styles.sos]}>
            <Ionicons name="alert-circle" size={28} color="#fff" />
          </View>
        </View>
      </View>

      {/* SEARCH */}
      <View style={styles.searchRow}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.muted}
        />
        <TextInput
          placeholder="Search conversations, people..."
          placeholderTextColor={colors.muted}
          style={styles.searchInput}
        />
      </View>

      {/* PILLS */}
      <View style={styles.pillsRow}>
        {pills.map((pill) => {
          const active = pill.key === filter;
          return (
            <Pressable
              key={pill.key}
              onPress={() => setFilter(pill.key)}
              style={[styles.pill, active && styles.pillActive]}
            >
              <Text style={[styles.pillText, active && styles.pillTextActive]}>{pill.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredThreads}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.avatarWrap}>
              {item.avatar ? (
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.avatarImage}
                />
              ) : (
                <View style={styles.groupAvatar}>
                  <Feather
                    name="users"
                    size={22}
                    color={colors.brand}
                  />
                </View>
              )}
              {item.unread > 0 && (
                <View style={styles.online} />
              )}
            </View>

            <View style={styles.flex}>
              <View style={styles.rowTop}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>
                <Text style={styles.time}>
                  {item.time}
                </Text>
              </View>

              {item.members && (
                <Text style={styles.members}>
                  {item.members}
                </Text>
              )}

              <Text
                style={styles.preview}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>

            {item.unread > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {item.unread}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: spacing.xxl + spacing.lg,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
    zIndex: 5,
  },

  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 22,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.brand,
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  roundButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brand,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 8,
    elevation: 3,
  },

  sos: {
    backgroundColor: '#e11d48',
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xs,
    backgroundColor: '#f5f7fb',
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 44,
  },

  searchInput: {
    flex: 1,
    color: colors.text,
  },

  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginHorizontal: spacing.md,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
    justifyContent: 'center',
  },

  pill: {
    paddingHorizontal: spacing.xs + spacing.lg,
    height: 35,
    borderRadius: 999,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pillActive: {
    backgroundColor: colors.brand,
  },

  pillText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.muted,
  },

  pillTextActive: {
    color: '#fff',
  },

  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    backgroundColor: colors.surface,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },

  avatarWrap: {
    position: 'relative',
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f5f5f7',
    overflow: 'hidden',
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  groupAvatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  online: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#fff',
  },

  flex: {
    flex: 1,
    gap: spacing.xs / 2,
  },

  rowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },

  time: {
    color: colors.muted,
    fontSize: 12,
  },

  members: {
    color: colors.muted,
    fontSize: 12,
  },

  preview: {
    color: colors.muted,
  },

  badge: {
    backgroundColor: colors.brand,
    minWidth: 26,
    height: 26,
    paddingHorizontal: spacing.sm,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    color: '#fff',
    fontWeight: '700',
  },

  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#e5e7eb',
  },
});
