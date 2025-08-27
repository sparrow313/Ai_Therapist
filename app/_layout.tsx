import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'HankenGrotesk-Regular': require('../assets/fonts/HankenGrotesk-Regular.ttf'),
    'HankenGrotesk-Bold': require('../assets/fonts/HankenGrotesk-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#18181b' },
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#18181b' }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="post/[id]" 
          options={{ 
            headerShown: true, 
            title: "Post"
          }} 
        />
        <Stack.Screen 
          name="info" 
          options={{ 
            headerShown: true,
            title: "Information"
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            headerShown: true,
            title: "Login"
          }} 
        />
        <Stack.Screen 
          name="signup" 
          options={{ 
            headerShown: true,
            title: "Sign Up"
          }} 
        />
      </Stack>
    </SafeAreaProvider>
  );
}
