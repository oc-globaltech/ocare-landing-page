import { NavigationContainer, DefaultTheme, Theme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { enableScreens } from 'react-native-screens';
import { Ionicons, Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
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
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          paddingVertical: 10,
          height: 90,
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          elevation: 8,
        },
        tabBarItemStyle: { paddingVertical: 8, },
        tabBarLabelStyle: { fontSize: 10, marginTop: 9, fontWeight: '500' },
        tabBarIcon: ({ color, focused }) => {
          const iconMap: Record<
            string,
            { lib: 'Feather' | 'Ionicons'; name: string }
          > = {
            Feed: { lib: 'Feather', name: 'home' },
            Chats: { lib: 'Ionicons', name: 'chatbubble-outline' },
            Write: { lib: 'Feather', name: 'edit' },
            Stats: { lib: 'Ionicons', name: 'bar-chart-outline' },
            Profile: { lib: 'Feather', name: 'user' },
          };

          const iconInfo = iconMap[route.name] ?? { lib: 'Ionicons', name: 'ellipse-outline' };
          const IconComponent = iconInfo.lib === 'Feather' ? Feather : Ionicons;
          const iconName = iconInfo.name as React.ComponentProps<typeof IconComponent>['name'];

          if (focused) {
            return (
              <View
                style={{
                  backgroundColor: colors.brand,
                  width: 45,
                  height: 45,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: colors.brand,
                  shadowOpacity: 0.5,
                  shadowOffset: { width: 0, height: 4 },
                  shadowRadius: 6,
                  elevation: 6,
                }}
              >
                <IconComponent name={iconName} size={22} color="#fff" />
              </View>
            );
          }

          return <IconComponent name={iconName} size={20} color={color} />;
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
