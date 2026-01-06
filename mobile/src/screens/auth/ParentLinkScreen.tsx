import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../theme/theme';
import { TextField } from '../../components/TextField';
import { PrimaryButton } from '../../components/PrimaryButton';

export function ParentLinkScreen({ navigation }: { navigation: any }) {
  const [studentId, setStudentId] = useState('STU-12345');
  const [childCode, setChildCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLink = () => {
    // Mock submit only; replace with backend call later.
    // eslint-disable-next-line no-alert
    alert('Submitted mock parent link form.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'<'} Back to Login</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Image source={require('../../../assets/ocare.png')} style={styles.logo} />
          <Text style={styles.title}>Parent Account Linking</Text>
          <Text style={styles.subtitle}>Connect to your child&apos;s account</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Child Information</Text>
          <TextField
            label="Child's Student ID"
            value={studentId}
            onChangeText={setStudentId}
            editable={false}
          />
          <TextField
            label="Child Code"
            placeholder="Enter code provided by school"
            value={childCode}
            onChangeText={setChildCode}
          />
          <Text style={styles.hint}>Ask your child&apos;s teacher or coordinator for this code</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Your Information</Text>
          <TextField label="Full Name" placeholder="Your full name" value={fullName} onChangeText={setFullName} />
          <TextField label="Email" placeholder="your@email.com" value={email} onChangeText={setEmail} />
          <View style={styles.passwordWrapper}>
            <TextField
              label="Create Password"
              placeholder="At least 8 characters"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={styles.eye} onPress={() => setShowPassword((v) => !v)}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.muted} />
            </Pressable>
          </View>
          <View style={styles.passwordWrapper}>
            <TextField
              label="Confirm Password"
              placeholder="Re-enter password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Pressable style={styles.eye} onPress={() => setShowConfirmPassword((v) => !v)}>
              <Ionicons
                name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.muted}
              />
            </Pressable>
          </View>
        </View>

        <PrimaryButton label="Link Account" onPress={handleLink} disabled={!childCode || !fullName || !email || !password || password !== confirmPassword} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: spacing.xxl,
    gap: spacing.lg,
  },
  backRow: {
    marginBottom: spacing.sm,
  },
  backText: {
    color: colors.text,
    fontWeight: '700',
  },
  header: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.brand,
  },
  subtitle: {
    color: colors.muted,
  },
  section: {
    backgroundColor: '#fff9f3',
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: '#ffe1c6',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.brand,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  hint: {
    color: colors.muted,
  },
  form: {
    gap: spacing.sm,
    position: 'relative',
  },
  passwordWrapper: {
    position: 'relative',
  },
  eye: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.xl + spacing.lg,
    transform: [{ translateY: -5 }],
  },
});
