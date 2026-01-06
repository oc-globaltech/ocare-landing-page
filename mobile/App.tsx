import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AppUser } from './src/types/user';
import './src/services/firebase';

export default function App() {
  const [user, setUser] = React.useState<AppUser | null>(null);

  const handleSignIn = (signedInUser: AppUser) => setUser(signedInUser);

  const handleSignOut = () => setUser(null);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigator user={user} onSignIn={handleSignIn} onSignOut={handleSignOut} />
    </GestureHandlerRootView>
  );
}
