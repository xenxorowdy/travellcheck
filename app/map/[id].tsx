import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import { fetchGetAPI } from '@/api'
import { Image } from 'expo-image'
import Loading from '@/components/commons/Loading'
import { commonStyles } from '@/components/commons/styled'

const map = () => {
       const { id } = useLocalSearchParams();
    const [ contact,setContact ] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const fetchContact = async () => {
        const res = await fetchGetAPI(`get/data/${id}?db=map`);
        setContact(res?.[0]?.maps || []);
        console.log(res?.[0]?.maps,"data map");
        setLoading(false);
    }
    useEffect(() => {
        fetchContact();
    }, []);
    if (loading) {
        return <Loading/>
    }
  return (
      <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}  >
          <ThemedText type="defaultSemiBold"> Map </ThemedText>
          <FlatList
            data={contact}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item,index }:any) => (
                <View key={index} style={styles.floorContainer}>
                    { console.log("fllorraa",item)}
          <Text style={{...styles.heading,...commonStyles.textCenter}}>Floor {item?.floor}</Text>
          <Image source={{ uri: item?.image }} style={{...styles.image,...commonStyles.textCenter}} />
          {item?.layout?.areas.map((area :any, idx : number) => (
            <Text key={idx} style={styles.text}>
              {area.name}: X = {area.coordinates.x}, Y = {area.coordinates.y}, Width = {area.coordinates.width}, Height = {area.coordinates.height}
            </Text>
          ))}
        </View>
            )}
          />
</ParallaxScrollView>
  )
}

export default map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  floorContainer: {
      marginBottom: 30,
      alignSelf:"center"
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  }
})