import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import {Link, Stack, useRouter, useSegments} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import {ClerkProvider, useAuth} from '@clerk/clerk-expo';
import {TouchableOpacity, View} from "react-native";
import Colors from "@/constants/Colors";
import {Ionicons} from "@expo/vector-icons";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function InitialLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if(!isLoaded) return;
    const isTabsGroup = segments[0] === '(tabs)';

    if(isSignedIn && !isTabsGroup) {
      router.replace("/(tabs)/chats");
    }

    if(!isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <View />;
  }

  return (
     <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="otp" options={{
          headerTitle: 'Enter Your Phone Number',
          headerBackVisible: false,
        }} />
        <Stack.Screen name="verify/[phone]" options={{
          headerTitle: 'Verify Your Phone Number',
          headerShown: true,
          headerBackTitle: 'Edit number',
        }} />
       <Stack.Screen name="(tabs)" options={{headerShown: false}} />
       <Stack.Screen name="(modals)/new-chat" options={{
         presentation: 'modal',
         title: 'New Chat',
         headerTransparent: true,
         headerBlurEffect: 'regular',
         headerStyle: {
            backgroundColor: Colors.background,
         },
         headerSearchBarOptions: {
           placeholder: 'Search name or number',
           hideWhenScrolling: false,
         },
         headerRight: () => {
            return (
              <Link href={'/(tabs)/chats'} asChild>
                <TouchableOpacity
                 style={{ backgroundColor: Colors.lightGray, borderRadius: 20, padding: 4 }}
                >
                  <Ionicons name="close" size={30} color={Colors.gray} />
                </TouchableOpacity>
              </Link>
            );
         }
       }} />
     </Stack>
  );
}

function RootLayoutNav() {
  return (
   <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY!}>
     <InitialLayout />
   </ClerkProvider>
  );
}

export default RootLayoutNav;
