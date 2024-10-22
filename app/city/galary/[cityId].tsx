import { fetchGetAPI } from '@/api'
import Loading from '@/components/commons/Loading'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator,  StyleSheet, TouchableOpacity } from 'react-native'

const Gallery = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const [monuments, setMonuments] = useState<any>([]);
    const {cityId} = useLocalSearchParams();
    
    const fetchMonument = async () => {
        const monumentObj = await fetchGetAPI(`get/monument/${cityId}`);
        console.log("fetch monuments",monumentObj);
    setMonuments(monumentObj);
    setLoading(false);
  }

  const handlePress: (event: { item: any }) => void = ({ item }) => {
    router.push(`monument/${item._id}`);
    // router.push(`place/${item.monument_name}/${item._id}`);
  }


  useEffect(() => {
    setLoading(true);

    fetchMonument();
  }, [cityId])
      if (loading) {
        return <Loading/>
  }
  return (
    <ParallaxScrollView
      safeView={false}
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
          <ThemedText style={{ alignSelf: "center",marginTop:10 }} type="subtitle" > All Place of interest ({monuments?.length})  </ThemedText>
        <ThemedView style={styles.row}>
              {monuments?.map((monument: any, idx: number) => (
            <TouchableOpacity style={styles.column} onPress={() => handlePress({ item: monument })} key={idx} >

            <Image source={monument.image_url} style={styles.image} />
            <ThemedText type="default" style={styles.label}>{monument.monument_name}</ThemedText>

            </TouchableOpacity>
        ))}
      </ThemedView>
          </ParallaxScrollView>
  )
}

export default Gallery

const styles = StyleSheet.create({
     container: {
        flex: 1,
         gap: 8,
    },
     row: {
       flexDirection: 'row',
       justifyContent:"space-evenly",
    marginBottom: 20,
       flexWrap: 'wrap', 
       padding: 10,
    gap:10
  },
  column: {
     width: 170,
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 160,
    height: 150,
    marginBottom: 10,
    borderRadius:15
  },
  label: {
    fontSize: 16,
  },
})