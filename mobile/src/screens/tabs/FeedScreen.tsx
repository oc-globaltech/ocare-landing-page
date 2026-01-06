import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/theme';
import { UserRole } from '../../types/user';

type Props = {
  role: UserRole;
};

const statusData = [
  { id: 'add', name: 'Add Status', avatar: null },
  { id: '1', name: 'Sarah', emoji: '😊', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60' },
  { id: '2', name: 'Mike', emoji: '🙂', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=60' },
  { id: '3', name: 'Emma', emoji: '🎉', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=60' },
  { id: '4', name: 'David', emoji: '❤️', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=60' },
  { id: '5', name: 'Lee', emoji: '🙂', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=80&q=60' },

];

const posts = [
  {
    id: 'p1',
    author: 'Anonymous #42',
    time: '2 hours ago',
    emoji: '😊',
    text: 'Finally had a good day after weeks of stress. Sometimes small victories matter the most.',
    likes: 24,
    comments: 5,
  },
  {
    id: 'p2',
    author: 'Anonymous #127',
    time: '4 hours ago',
    emoji: '😔',
    text: 'Feeling stressed today... Work has been overwhelming and I don\'t know how to cope.',
    likes: 18,
    comments: 12,
  },
  {
    id: 'p3',
    author: 'Anonymous #89',
    time: '6 hours ago',
    emoji: '🎉',
    text: 'Shared a great chat with a friend. Feeling seen and heard today.',
    likes: 30,
    comments: 9,
  },
    {
    id: 'p4',
    author: 'Anonymous #89',
    time: '6 hours ago',
    emoji: '🎉',
    text: 'Shared a great chat with a friend. Feeling seen and heard today.',
    likes: 30,
    comments: 9,
  },
];

export function FeedScreen({ role }: Props) {
  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Image source={require('../../../assets/ocare-copy.png')} style={styles.logo} />
          <View>
            <Text style={styles.feedTitle}>Whisper Feed</Text>
          </View>
        </View>
        <View style={styles.sos}>
          <Ionicons name="alert-circle" size={28} color="#fff" />
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.statusRow}
          >
            {statusData.map((status) => (
              <View key={status.id} style={styles.statusItem}>
                {status.avatar ? (
                  <View style={styles.statusAvatarWrap}>
                    <Image source={{ uri: status.avatar }} style={styles.statusAvatar} />
                    {status.emoji ? (
                      <View style={styles.statusEmojiBubble}>
                        <Text style={styles.statusEmoji}>{status.emoji}</Text>
                      </View>
                    ) : null}
                  </View>
                ) : (
                  <View style={styles.statusAdd}>
                    <Ionicons name="add" size={22} color={colors.muted} />
                  </View>
                )}
                <Text style={styles.statusName} numberOfLines={1}>{status.name}</Text>
              </View>
            ))}
          </ScrollView>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>{item.emoji}</Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.author}>{item.author}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <Text style={styles.text}>{item.text}</Text>
            <View style={styles.actions}>
              <View style={styles.action}>
                <Ionicons name="heart-outline" size={20} color={colors.muted} />
                <Text style={styles.actionText}>{item.likes}</Text>
              </View>
              <View style={styles.action}>
                <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.muted} />
                <Text style={styles.actionText}>{item.comments}</Text>
              </View>
              <View style={styles.action}>
                <Ionicons name="share-social-outline" size={20} color={colors.muted} />
              </View>
            </View>
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
  container: {
    padding: spacing.md,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e5e7eb',
    zIndex: 5,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 22,
    resizeMode: 'contain',
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.brand,
  },
  feedSubtitle: {
    color: colors.muted,
  },
  sos: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#e11d48',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#e11d48',
    shadowOpacity: 0.,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 12,
    elevation: 6,
  },
  statusRow: {
    gap: spacing.xs,
    paddingBottom: spacing.lg,
  },
  statusItem: {
    alignItems: 'center',
    width: 74,
    gap: spacing.xs,
  },
  statusAvatarWrap: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: colors.brand,
    padding: 2,
    backgroundColor: colors.surface,
    overflow: 'visible',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 31,
  },
  statusAdd: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth : 1.5,
    borderColor: colors.border,
    backgroundColor: '#f5f7fb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusName: {
    color: colors.text,
    fontSize: 11,
  },
  statusEmoji: {
    fontSize: 16,
  },
  statusEmojiBubble: {
    position: 'absolute',
    bottom: -8,
    right: -10,
    width: 26,
    height: 26,
    borderRadius: 14,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 1,
    marginBottom: spacing.xs,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  avatarCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#f5f5f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: {
    fontSize: 20,
  },
  meta: {
    gap: spacing.xs / 2,
  },
  author: {
    color: colors.text,
    fontWeight: '700',
  },
  time: {
    color: colors.muted,
    fontSize: 12,
  },
  text: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  actionText: {
    color: colors.muted,
    fontWeight: '600',
  },
});
