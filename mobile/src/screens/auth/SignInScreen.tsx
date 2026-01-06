import React, { useMemo, useState } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from '../../components/PrimaryButton';
import { TextField } from '../../components/TextField';
import { colors, radius, spacing } from '../../theme/theme';
import { AppUser } from '../../types/user';

type Props = {
  onSignIn: (payload: AppUser) => void;
};

const DUMMY_USERS: Array<AppUser & { username: string; password: string }> = [
  {
    id: 'demo-1',
    username: 'teacher1',
    password: 'password123',
    email: 'demo@ocare.test',
    displayName: 'Demo Teacher',
    role: 'teacher',
  },
  {
    id: 'student-1',
    username: 'student1',
    password: 'password123',
    email: 'student@ocare.test',
    displayName: 'Demo Student',
    role: 'student',
  },
];

export function SignInScreen({ onSignIn }: Props) {
  const navigation = useNavigation<any>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = useMemo(() => username.trim().length > 0 && password.trim().length > 0, [username, password]);

  const handleSubmit = () => {
    if (!isValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const match = DUMMY_USERS.find(
        (u) => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password,
      );
      if (match) {
        setError('');
        onSignIn(match);
      } else {
        setError('Invalid username or password. Ask an admin/coordinator to verify your account.');
      }
    }, 400);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Image source={require('../../../assets/ocare.png')} style={styles.logo} />
          <Text style={styles.tagline}>Empowering every connection with care</Text>
        </View>

        <View style={styles.card}>
          <TextField
            label="Username / ID"
            placeholder="Enter your username or ID"
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={setUsername}
          />
          <View style={styles.passwordWrapper}>
            <TextField
              label="Password"
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable style={styles.eye} onPress={() => setShowPassword((v) => !v)}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={colors.muted}
              />
            </Pressable>
          </View>

          {error ? <Text style={styles.error}>{error}</Text> : null}

          <PrimaryButton label="Sign In" onPress={handleSubmit} loading={loading} disabled={!isValid} />

          <TouchableOpacity style={styles.forgot}>
            <Text style={styles.link}>Forgot password?</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('ParentLink' as never)}>
            <Text style={styles.secondaryText}>Parents? Link to student</Text>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    padding: spacing.xxl,
    paddingTop: spacing.xxl + spacing.lg,
  },
  header: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.brand,
  },
  tagline: {
    color: colors.muted,
    textAlign: 'center',
    maxWidth: 260,
  },
  card: {
    width: '100%',
    maxWidth: 460,
    backgroundColor: colors.surface,
    padding: spacing.xxl,
    borderRadius: radius.lg,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 2,
    gap: spacing.md,
    position: 'relative',
  },
  passwordWrapper: {
    position: 'relative',
  },
  forgot: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  eye: {
    position: 'absolute',
    right: spacing.lg,
    top: spacing.xl + spacing.lg,
    transform: [{ translateY: -5 }],
  },
  link: {
    color: colors.muted,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,

  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.muted,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.brand,
    fontWeight: '700',
    letterSpacing: 0.3,
    textAlign: 'center',
    marginTop: spacing.md,

  },
  error: {
    color: colors.danger,
    fontWeight: '600',
  },
});
