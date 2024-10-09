import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { fetchGetAPI } from '@/api'
import { useLocalSearchParams } from 'expo-router'
import ExpandableText from '@/components/Expand'
import { commonStyles } from '@/components/commons/styled'

const FoundersGallery = () => {
  const [loading, setLoading] = useState(false);
  const [founder, setFoundersData] = useState<any[]>([]);
  const { id } = useLocalSearchParams(); // Assuming id is the monument id
    const fetchGalleryInfo = async () => {
     const galleryRes = await fetchGetAPI(`get/data/${id}?db=founder_gallery`);
      setFoundersData(galleryRes);
    setLoading(false)
  }
  useEffect(() => {
    fetchGalleryInfo();
  },[])
    return (
       <ParallaxScrollView
          headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
          <ThemedText style={{ alignSelf: "center" }} type="subtitle" > From The Founder Desk </ThemedText>
        <ThemedView style={{alignSelf:"center"}}>
              {founder?.map((monument: any, idx: number) => (
                <ThemedView>
            <Image source={monument.image} style={{ width: 200, height: 300, objectFit:"fill",  borderRadius:18, backgroundColor: 'black', alignSelf:"center" }} />
                  <ThemedText type="default" style={commonStyles.textCenter} >{monument.name}</ThemedText>
                  <ExpandableText text={monument.description} />
                  </ThemedView>
        ))}
      </ThemedView>
          </ParallaxScrollView>
  )
}

export default FoundersGallery

const styles = StyleSheet.create({
  image: {
    
  }
})