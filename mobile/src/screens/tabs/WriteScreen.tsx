import React, { useMemo, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { colors, radius, spacing } from '../../theme/theme';
import { PrimaryButton } from '../../components/PrimaryButton';

type TabKey = 'post' | 'diary' | 'status';

const feelings = [
  { key: 'happy', label: 'Happy', emoji: '😊' },
  { key: 'sad', label: 'Sad', emoji: '😔' },
  { key: 'anxious', label: 'Anxious', emoji: '😰' },
  { key: 'calm', label: 'Calm', emoji: '😌' },
  { key: 'angry', label: 'Angry', emoji: '😠' },
  { key: 'excited', label: 'Excited', emoji: '🎉' },
  { key: 'tired', label: 'Tired', emoji: '😴' },
  { key: 'loved', label: 'Loved', emoji: '❤️' },
];

const privacyOptions = [
  { key: 'public', title: 'Public Post', desc: 'Everyone can see your name and post', icon: 'chatbox-outline' },
  { key: 'anonymous', title: 'Anonymous Post', desc: 'Everyone can see your post, username is hidden', icon: 'eye-off-outline' },
  { key: 'admin', title: 'Admin Only', desc: 'Only admin can see this post', icon: 'lock-closed-outline' },
];

export function WriteScreen() {
  const [tab, setTab] = useState<TabKey>('post');
  const [feeling, setFeeling] = useState<string>('loved');
  const [privacy, setPrivacy] = useState<string>('public');
  const [text, setText] = useState('');
  const [diaryText, setDiaryText] = useState('');
  const [entryDate, setEntryDate] = useState('06/01/2026');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusPrivacy, setStatusPrivacy] = useState<'public' | 'anonymous'>('public');

  const tabItems = useMemo(
    () => [
      { key: 'post' as const, label: 'Post', icon: 'chatbox-outline' as const },
      { key: 'diary' as const, label: 'Diary', icon: 'calendar-clear-outline' as const },
      { key: 'status' as const, label: 'Status', icon: 'happy-outline' as const },
    ],
    [],
  );

  return (
    <View style={styles.screen}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <Image source={require('../../../assets/ocare-copy.png')} style={styles.logo} />
          <View>
            <Text style={styles.title}>Write</Text>
            <Text style={styles.subtitle}>Express yourself</Text>
          </View>
        </View>
        <View style={styles.actions}>
          <View style={[styles.roundButton, styles.sos]}>
            <Ionicons name="alert-circle" size={28} color="#fff" />
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tabs}>
          {tabItems.map((item) => {
            const active = tab === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setTab(item.key)}
                style={[styles.tab, active && styles.tabActive]}
              >
                <Ionicons name={item.icon} size={18} color={active ? colors.brand : colors.muted} />
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {tab === 'post' && (
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>How are you feeling?</Text>
              <View style={styles.feelingsGrid}>
                {feelings.map((f) => {
                  const active = feeling === f.key;
                  return (
                    <Pressable
                      key={f.key}
                      onPress={() => setFeeling(f.key)}
                      style={[styles.feelingChip, active && styles.feelingChipActive]}
                    >
                      <Text style={styles.feelingEmoji}>{f.emoji}</Text>
                      <Text style={[styles.feelingText, active && styles.feelingTextActive]}>{f.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Write your thoughts...</Text>
              <TextInput
                placeholder="What’s on your mind today?"
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={5}
                value={text}
                onChangeText={setText}
                style={styles.textArea}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Privacy Settings</Text>
              {privacyOptions.map((opt) => {
                const active = privacy === opt.key;
                return (
                  <Pressable
                    key={opt.key}
                    onPress={() => setPrivacy(opt.key)}
                    style={[styles.privacyCard, active && styles.privacyCardActive]}
                  >
                    <Ionicons
                      name={opt.icon as any}
                      size={22}
                      color={active ? colors.brand : colors.muted}
                      style={styles.privacyIcon}
                    />
                    <View style={styles.privacyTextWrap}>
                      <Text style={[styles.privacyTitle, active && styles.privacyTitleActive]}>{opt.title}</Text>
                      <Text style={styles.privacyDesc}>{opt.desc}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <PrimaryButton label="Submit Post" onPress={() => {}} />
          </>
        )}

        {tab === 'diary' && (
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Entry Date</Text>
              <View style={styles.dateRow}>
                <TextInput
                  value={entryDate}
                  onChangeText={setEntryDate}
                  style={styles.dateInput}
                  placeholderTextColor={colors.muted}
                  editable={false}
                />
                <Pressable style={styles.dateIcon} onPress={() => setShowDatePicker(true)}>
                  <Ionicons name="calendar-outline" size={18} color="#fff" />
                </Pressable>
              </View>
            </View>
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString('en-US', {
                      
                      month: '2-digit',
                      day: '2-digit',
                      year: 'numeric',
                    });
                    setEntryDate(formatted);
                  }
                }}
              />
            )}

            <View style={styles.section}>
              <Text style={styles.heading}>How are you feeling today?</Text>
              <View style={styles.feelingsGrid}>
                {feelings.map((f) => {
                  const active = feeling === f.key;
                  return (
                    <Pressable
                      key={f.key}
                      onPress={() => setFeeling(f.key)}
                      style={[styles.feelingChip, active && styles.feelingChipActive]}
                    >
                      <Text style={styles.feelingEmoji}>{f.emoji}</Text>
                      <Text style={[styles.feelingText, active && styles.feelingTextActive]}>{f.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Dear Diary...</Text>
              <TextInput
                placeholder="Write about your day, your thoughts, your feelings..."
                placeholderTextColor={colors.muted}
                multiline
                numberOfLines={6}
                value={diaryText}
                onChangeText={setDiaryText}
                style={[styles.textArea, { minHeight: 180 }]}
              />
            </View>

            <View style={styles.infoCard}>
              <Ionicons name="lock-closed-outline" size={18} color="#7c3aed" />
              <Text style={styles.infoText}>Diary entries are private</Text>
            </View>

            <PrimaryButton label="Save Diary Entry" onPress={() => {}} />
          </>
        )}

        {tab === 'status' && (
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Set your mood status</Text>
              <View style={styles.feelingsGrid}>
                {feelings.map((f) => {
                  const active = feeling === f.key;
                  return (
                    <Pressable
                      key={f.key}
                      onPress={() => setFeeling(f.key)}
                      style={[styles.statusChip, active && styles.statusChipActive]}
                    >
                      <Text style={styles.statusEmoji}>{f.emoji}</Text>
                      <Text style={[styles.statusText, active && styles.statusTextActive]}>{f.label}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Status Message </Text>
              <TextInput
                placeholder="What’s your vibe today?"
                placeholderTextColor={colors.muted}
                value={statusText}
                onChangeText={setStatusText}
                style={styles.statusInput}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Status Privacy</Text>
              <Pressable
                onPress={() => setStatusPrivacy('public')}
                style={[styles.privacyCard, statusPrivacy === 'public' && styles.privacyCardActive]}
              >
                <Ionicons
                  name="happy-outline"
                  size={22}
                  color={statusPrivacy === 'public' ? colors.brand : colors.muted}
                  style={styles.privacyIcon}
                />
                <View style={styles.privacyTextWrap}>
                  <Text style={[styles.privacyTitle, statusPrivacy === 'public' && styles.privacyTitleActive]}>
                    Public Status
                  </Text>
                  <Text style={styles.privacyDesc}>Everyone can see your status</Text>
                </View>
              </Pressable>

              <Pressable
                onPress={() => setStatusPrivacy('anonymous')}
                style={[styles.privacyCard, statusPrivacy === 'anonymous' && styles.privacyCardActive]}
              >
                <Ionicons
                  name="eye-off-outline"
                  size={22}
                  color={statusPrivacy === 'anonymous' ? colors.brand : colors.muted}
                  style={styles.privacyIcon}
                />
                <View style={styles.privacyTextWrap}>
                  <Text style={[styles.privacyTitle, statusPrivacy === 'anonymous' && styles.privacyTitleActive]}>
                    Anonymous Status
                  </Text>
                  <Text style={styles.privacyDesc}>Username is hidden for others</Text>
                </View>
              </Pressable>
            </View>

            <PrimaryButton label="Update Status" onPress={() => {}} />
          </>
        )}
      </ScrollView>
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
  subtitle: {
    color: colors.muted,
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
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  tabsContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    overflow: 'visible',
  },
  tabs: {
    flexDirection: 'row',
    gap: spacing.xs,
    backgroundColor: '#f7f8fb',
    padding: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: '#eef0f4',
    overflow: 'visible',
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    flex: 1,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    zIndex: 2,
  },
  tabText: {
    color: colors.muted,
    fontWeight: '700',
  },
  tabTextActive: {
    color: colors.brand,
  },
  section: {
    gap: spacing.sm,
  },
  heading: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  feelingsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  feelingChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
  },
  feelingChipActive: {
    borderColor: colors.brand,
    backgroundColor: '#fff8f2',
  },
  feelingEmoji: {
    fontSize: 12,
  },
  feelingText: {
    color: colors.text,
    fontWeight: '400',
    fontSize: 12,

  },
  feelingTextActive: {
    color: colors.brand,
  },
  statusChip: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f7f8fb',
    width: 80,
    height: 72,
  },
  statusChipActive: {
    borderColor: colors.brand,
    backgroundColor: '#fff8f2',
  },
  statusEmoji: {
    fontSize: 18,
  },
  statusText: {
    color: colors.text,
    fontWeight: '400',
    fontSize: 12,
  },
  statusTextActive: {
    color: colors.brand,
  },
  statusInput: {
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f7f8fb',
    paddingHorizontal: spacing.md,
    height: 44,
    color: colors.text,
  },
  textArea: {
    minHeight: 120,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f7f8fb',
    padding: spacing.lg,
    textAlignVertical: 'top',
    color: colors.text,
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    marginBottom: spacing.sm,
  },
  privacyCardActive: {
    borderColor: colors.brand,
    backgroundColor: '#fff8f2',
  },
  privacyIcon: {
    width: 28,
    textAlign: 'center',
  },
  privacyTextWrap: {
    flex: 1,
    gap: spacing.xs / 2,
  },
  privacyTitle: {
    fontWeight: '800',
    color: colors.text,
  },
  privacyTitleActive: {
    color: colors.brand,
  },
  privacyDesc: {
    color: colors.muted,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#e9d5ff',
    backgroundColor: '#f8f1ffff',
  },
  infoText: {
    color: '#7c3aed',
    fontWeight: '500',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#f7f8fb',
    paddingHorizontal: spacing.md,
    height: 44,
  },
  dateInput: {
    flex: 1,
    color: colors.text,
    paddingVertical: 0,
  },
  dateIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
});
