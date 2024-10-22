import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { useColorScheme } from '@/hooks/useColorScheme';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const linkedin = 'https://www.linkedin.com/company/the-heritage-tour';

const twitter = 'https://x.com/okHeritagetour'

const facebook = 'https://www.facebook.com/profile.php?id=61566801894647'

const insta = "https://www.instagram.com/theheritagetour/"


import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const openLink = (url:string) => {
  Linking.openURL(url).catch(err => console.error("An error occurred", err));
};

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
        {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
         <Stack.Screen
        name="index"
        
          options={{
          headerShown: false,
          title: '',
        }}
      />
      <Stack.Screen
        name="city/[id]/[city]"
        options={({ route , params }) => ({
          headerTitle: decodeURIComponent(route.params?.city),
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: "700",
            backgroundColor: '#494c7d',
          },

        })}
        />
         <Stack.Screen
          name="city/galary/[cityId]"
          options={{
            headerTitle: "Gallery",
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: "700",
            }
          }}
   />
      <Stack.Screenf
        name="place/[title]/[id]"
        options={({ route }) => ({
          headerTitle: "Exhibits",
          headerTitleAlign: 'center',
        })
      }

      />
        <Stack.Screen
          name="exibt/[id]/[title]"
          options={({ route, params }) => ({
            headerTitle: decodeURIComponent(route.params?.title),

          })
        }
        />
        <Stack.Screen
          name='place/[title]/[id]'
          options={{
            headerTitle: "Exhibits",
            headerTitleAlign: 'center',
          }}
        />
            <Stack.Screen
          name='gallery/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
        />
               <Stack.Screen
          name='founders_gallery/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
        />
                     <Stack.Screen
          name='map/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
        />
               <Stack.Screen
          name='contact_us/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
        />
                  <Stack.Screen
          name='support_us/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
        />
                  <Stack.Screen
          name='direction/[id]'
          options={{
            headerTitle: "",
            headerTitleAlign: 'center',
          }}
          />
      <Stack.Screen
        name="monument/[id]/index"
        options={{
          headerTitle: "Monument",
          headerTitleAlign: 'center',
        }}
        />
  
        <Stack.Screen name="+not-found" />
      </Stack>
      <ThemedView value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} style={{ padding: 30, justifyContent: "space-around", display: "flex", flexDirection: "row" }} >
 <TouchableOpacity onPress={() => openLink(facebook)}>
      <TabBarIcon name="logo-facebook" color={"#1977F2"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => openLink(insta)}>
      <TabBarIcon name="logo-instagram" color={"#d62976"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => openLink(linkedin)}>
      <TabBarIcon name="logo-linkedin" color={"#0B65C2"} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => openLink(twitter)}>
      <FontAwesome6 name="x-twitter" size={28} style={{ marginBottom: -3 }} color={colorScheme === 'dark' ? "#fff" : "#000"} />
    </TouchableOpacity>
      </ThemedView>
    </ThemeProvider>
  );
}


