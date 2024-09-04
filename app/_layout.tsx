import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="city/[city]"
        options={({ route, params }) => ({
          headerTitle: "city",
          headerStyle: { backgroundColor: '#24AEFA' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: "700",
            backgroundColor: '#24AEFA',
          },

        })}
   />
      <Stack.Screen
        name="place/[id]"
        options={{
          headerTitle: "place",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#24AEFA' },

        }}

      />
      <Stack.Screen
        name="exibt/[title]"
        options={{
          headerTitle: "Exbit",
          headerStyle: { backgroundColor: '#24AEFA' },

        }}
      />
      <Stack.Screen
        name="series/[id]"
        options={{
          headerTitle: "series Information",
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#24AEFA' },

        }}
      />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}


