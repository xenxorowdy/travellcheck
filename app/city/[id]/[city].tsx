import { fetchGetAPI } from '@/api'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import { Divider, FlatList, NativeBaseProvider } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ListRenderItem, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'
type monument = {

  _id: string;
  city_id: string;
  monument_name: string;
  additional_details: {
    location: string;
    opening_hours: string;
    entry_fee: string;
  };
  image_url: string;

}

const City = () => {
  const { id, city } = useLocalSearchParams();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [monuments,setMonuments] = useState<monument[]>()
  console.log(id, city);
  const [loading, setloading] = useState<boolean>(true)


  const fetchMonument = async() => {
    const monumentObj = await fetchGetAPI(`get/monument/${id}`);
    console.debug(monumentObj);
    setMonuments(monumentObj);
    setloading(false);
  }
  useEffect(() => {
    setloading(true);
    fetchMonument();
  }, [id])
  // const getUrl = (city: String) => {
  //   return cities.find(cit => cit.name === city)?.image_url;
  // }

  const handlePress: (event: { item: monument }) => void = ({ item }) => {
    router.push(`monument/${item._id}`);
    // router.push(`place/${item.monument_name}/${item._id}`);
  }

  const renderItem : ListRenderItem<monument> = ({ item }) => (
    <ThemedView style={styles.itemContainer}>
      <TouchableOpacity activeOpacity={0.7} style={styles.itemContainer} onPress={()=>handlePress({item})}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <ThemedView style={styles.textContainer}>
          <ThemedText lightColor='#666671' type="subtitle">{item.monument_name}</ThemedText>
          <ThemedText lightColor='#666' type="details">📍 {item.additional_details.location}</ThemedText>
          <ThemedText lightColor='#666' type="details">🕒 {item.additional_details.opening_hours}</ThemedText>
          <ThemedText lightColor='#666' type="details">💵 ₹{item.additional_details.entry_fee}</ThemedText>
        </ThemedView>
        </TouchableOpacity>
      <Divider/>
      </ThemedView>
  );

  if (loading) {
    return <ThemedView style={styles.container} >
       <ThemedView style={{width:"100%",marginVertical:100}} >
              <ActivityIndicator size="large"  />
              </ThemedView>
    </ThemedView>
  }

  return (
    <NativeBaseProvider>
  <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
        <ThemedView style={styles.container}>  
                <ThemedView style={styles.subTitle}>
            <ThemedText type="subtitle">Monuments</ThemedText>
            </ThemedView>
           <Animated.ScrollView ref={scrollRef}
        contentContainerStyle={styles.list}
      >

       <FlatList
      data={monuments}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      contentContainerStyle={styles.list}
    />
        </Animated.ScrollView>  
      </ThemedView>
      </ParallaxScrollView>
      </NativeBaseProvider>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
        flex: 1,
         gap: 8,
    },
  img: { width: '100%', height: 340, borderRadius: 4, backgroundColor: 'black', objectFit: "cover" },
    list: {
    padding: 10,
  },
  itemContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subTitle: {
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding:10
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  }
})