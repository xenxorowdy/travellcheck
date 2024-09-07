import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { cities } from '@/utils'
import { Image } from 'expo-image'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const City = () => {
  const { city } = useLocalSearchParams();
  const [welcome, setWelcome] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => setWelcome(false), 2000)
  }, [])
  const getUrl = (city: String) => {
    return cities.find(cit => cit.name === city)?.image_url;
  }

  return (

    <ThemedView style={styles.container}>      
        <Image
        source={{uri: getUrl(city)}}
        style={styles.img}
      />
      <ThemedText type="title"  > Comming Soon... </ThemedText>
    </ThemedView>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
        flex: 1,
         gap: 8,
    },
    img: { width: '100%', height: 340, borderRadius:4, backgroundColor: 'black',objectFit:"cover" }
})