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
          headerTitle: decodeURIComponent(route.params?.city),
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: "700",
            backgroundColor: '#494c7d',
          },

        })}
   />
      <Stack.Screen
        name="place/[id]"
        options={{
          headerTitle: "National Museum Delhi",
          headerTitleAlign: 'center',

        }}

      />
        <Stack.Screen
          name="exibt/[title]"
          options={({ route, params }) => ({
            headerTitle: decodeURIComponent(route.params?.title),

          })
        }
      />
      <Stack.Screen
        name="series/[id]"
        options={{
          headerTitle: "series Information",
          headerTitleAlign: 'center',
        }}
      />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}


