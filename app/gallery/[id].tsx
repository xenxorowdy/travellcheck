import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { fetchGetAPI } from '@/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '@/components/commons/Loading';
import { Image } from 'expo-image';

const Gallery = () => {
  const { id } = useLocalSearchParams();
  // Fetch the gallery data based on the provided id.
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const fetchGalleryInfo = async () => {
     const galleryRes = await fetchGetAPI(`get/data/${id}?db=gallery`);
    setGalleryData(galleryRes)
    console.log(galleryRes,`get/data/${id}?db=gallery`);
    setLoadingData(false)
  }
  useEffect(() => {
    fetchGalleryInfo();
    
  }, [id])
  if (loadingData) {
    return <Loading/>
  }
  return (
    <ParallaxScrollView
      safeView={false}
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.row}>
              {galleryData?.map((gallery: any, idx: number) => (
        <Image key={idx} source={gallery.image} style={styles.image} />
        ))}
      </ThemedView>
      </ThemedView>
          </ParallaxScrollView>
  )
}

export default Gallery

const styles = StyleSheet.create({
   container: {
      flex: 1,
      gap: 8,
      padding:10
    },
     row: {
       flexDirection: 'row',
       gap: 15,
    marginBottom: 20,
    flexWrap: 'wrap', 
  },
  column: {
     width: '30%', // Adjust width for two columns layout
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 110,
    height: 150,
    marginBottom: 10,
    borderRadius:10
  },
  label: {
    fontSize: 16,
  },
})