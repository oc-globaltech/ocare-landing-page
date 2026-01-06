import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SignInScreen } from '../screens/auth/SignInScreen';
import { ParentLinkScreen } from '../screens/auth/ParentLinkScreen';
import { FeedScreen } from '../screens/tabs/FeedScreen';
import { MessagesScreen } from '../screens/tabs/MessagesScreen';
import { ProfileScreen } from '../screens/tabs/ProfileScreen';
import { WriteScreen } from '../screens/tabs/WriteScreen';
import { StatsScreen } from '../screens/tabs/StatsScreen';
import { colors } from '../theme/theme';
import { AppUser, UserRole } from '../types/user';

enableScreens();

type RootStackParamList = {
  Login: undefined;
  ParentLink: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

type Props = {
  user: AppUser | null;
  onSignIn: (payload: { email: string; role: UserRole }) => void;
  onSignOut: () => void;
};

const navigationTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.brand,
    text: colors.text,
    border: colors.border,
  },
};

function MainTabs({ user, onSignOut }: { user: AppUser; onSignOut: () => void }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { paddingVertical: 6, height: 64 },
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, React.ComponentProps<typeof Ionicons>['name']> = {
            Feed: 'home-outline',
            Chats: 'chatbubble-ellipses-outline',
            Write: 'create-outline',
            Stats: 'stats-chart-outline',
            Profile: 'person-circle-outline',
          };

          const name = icons[route.name] ?? 'ellipse-outline';
          return <Ionicons name={name} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feed">
        {() => <FeedScreen role={user.role} />}
      </Tab.Screen>
      <Tab.Screen name="Chats">
        {() => <MessagesScreen role={user.role} />}
      </Tab.Screen>
      <Tab.Screen name="Write" component={WriteScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Profile">
        {() => <ProfileScreen user={user} onSignOut={onSignOut} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export function RootNavigator({ user, onSignIn, onSignOut }: Props) {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main">
            {() => <MainTabs user={user} onSignOut={onSignOut} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login">
              {() => <SignInScreen onSignIn={onSignIn} />}
            </Stack.Screen>
            <Stack.Screen name="ParentLink" component={ParentLinkScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
