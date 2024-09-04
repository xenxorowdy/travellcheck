import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import WelcomeScreen from '@/components/WellAnimation'
import { exibit } from '@/utils'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'

import Animated, { useAnimatedRef } from 'react-native-reanimated'


const City = () => {
    const [welcome, setWelcome] = useState<boolean>(false)
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
//   useEffect(() => {
//     setTimeout(()=>setWelcome(false),2000)
//   },[])

  return (
 <ThemedView style={styles.container}>
      {welcome ? (
        <WelcomeScreen />
      ) : (
        <ThemedView>
          <Animated.ScrollView
            ref={scrollRef}
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingLeft: 16, marginTop: 10, gap: 10 }}
          >
            <ThemedText type="title">National Museum Delhi</ThemedText>
            <Image
              source={require('@/assets/images/india_national_museum.jpg')}
              style={styles.img}
            />
            <FlatList
              data={exibit}
              keyExtractor={(item) => item.title} // Assuming 'id' is a unique property
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, marginTop: 30 }}
              renderItem={({ item }) => (
                <ThemedView style={{ borderWidth: 1, marginVertical: 5, borderRadius: 6 }}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => router.push(`exibt/${item.title}`)} // Adjust to pass the correct ID
                    style={styles.courosual}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{ width: 400, height: 300, objectFit: 'scale-down', resizeMode: 'stretch', borderRadius: 18 }}
                    />
                    <ThemedView style={{ marginHorizontal: 10 }} >
                      <ThemedText type="subtitle" >
                        {item.title}
                              </ThemedText  >

                      <ThemedText type="defaultSemiBold" >Highlights: <ThemedText type="default" >{item.highlights.join(', ')}</ThemedText> </ThemedText>
                     
                    </ThemedView>
                  </TouchableOpacity>
                </ThemedView>
              )}
            />
          </Animated.ScrollView>
        </ThemedView>
      )}
    </ThemedView>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 8, gap: 8,
    },
    img: { width: '100%', height: 340, borderRadius: 6, backgroundColor: 'black', objectFit: "cover" },
    imageRelativeText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 25,
    },
      courosual: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    marginBottom: 8,
    paddingRight: 50,
  },
})


{/* <ThemedView>
                                      <ThemedText type="defaultSemiBold" style={{ marginHorizontal: 10 }} >{item.title}</ThemedText>
                                      <ThemedText type="subtitle" >Highlights:</ThemedText> <ThemedText>{item?.highlights.join(", ")}</ThemedText>
                  </ThemedView> */}