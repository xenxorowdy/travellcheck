import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return null;
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        
        options={{
          title: '',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'apps' : 'apps-outline'} color={color} />
          ),
        }}
        
      />
      {/* /Users/riyamjain/Library/Group Containers/group.com.apple.notes/Accounts/B6DB7452-8838-4EE1-A404-04442CAFE85A/Media/A75A7BD2-4A78-433E-BA2A-A244692966FB/1_0A8A9BE0-1D70-46C1-BE3A-87239C01CF39/original-7f60bf58594571753827fd62dab4d68e.png */}
      {/* <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      /> */}
    </Tabs>
  );
}
