import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { Image } from 'expo-image'
import WelcomeScreen from '@/components/WellAnimation'

const City = () => {
  const [welcome, setWelcome] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => setWelcome(false), 2000)
  }, [])


  return (

    <ThemedView style={styles.container}>
      
               <Image
                   source={require('@/assets/images/taj.jpg')}
                   style={styles.img}
       />
      
              </ThemedView>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
        flex: 1,
        padding: 8, gap: 8,
    },
    img: { width: '100%', height: 340, borderRadius:4, backgroundColor: 'black',objectFit:"cover" }
})