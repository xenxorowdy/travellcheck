import { fetchGetAPI } from '@/api'
import Dropdown from '@/components/Dropdown'
import ExpandableText from '@/components/Expand'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
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
  description:string,
}
const Monument = () => {
  const [lan, setLan] = useState<"en" | "hi" | "es" | "fr">('en');
    const { id } = useLocalSearchParams();
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [monuments, setMonuments] = useState<monument>({
    _id: "",
  city_id: "",
  monument_name: "",
  additional_details: {
    location: "",
    opening_hours: "",
    entry_fee: "",
  },
    image_url: "",
  description:"",
  })
  const [loading, setloading] = useState<boolean>(true)

  console.log(`place/${lan}/${monuments._id}/full`,"mommm");
  const fetchMonument = async () => {
    try {      
      const monumentObj = await fetchGetAPI(`get/monuments/${id}`);
      console.debug(monumentObj?.[0],"monumvents",monumentObj);
      setMonuments(monumentObj?.[0]);
      setloading(false);
    } catch (error) {
      console.error("error", "hello",error,`get/monuments/${id}`);
    }
  }
  useEffect(() => {
    setloading(true);
    fetchMonument();
  }, [id])
  if (loading) {
    return   <ThemedView style={styles.container} >
              <ActivityIndicator size="large"  />
              </ThemedView>
  }
    return (
      <ThemedView style={{flex:1}}>
              <Animated.ScrollView horizontal={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ flexGrow: 1, gap: 10 }}>
          <Image source={{ uri: monuments?.image_url }} style={{ width: "100%", height: 300, objectFit: 'scale-down', resizeMode: 'stretch' }} />
          {/* <ThemedText type="subtitle">{monuments?.description} </ThemedText> */}
          <ExpandableText text={monuments.description} />
          <Dropdown lan={lan} setLan={setLan} />
          <ThemedView style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`place/${lan}/${monuments._id}`)} >
            <ThemedText>Free Tour</ThemedText>
            <TabBarIcon name={"chevron-forward"} color={'orange'}  size={30}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>router.push(`place/${lan}/${monuments._id}`)}>
            <ThemedText>Full Tour</ThemedText>
            <TabBarIcon name={"chevron-forward"} color={'orange'}  size={30}/>
          </TouchableOpacity>
          </ThemedView>
          <ThemedView style={{display:"flex",flexDirection:"column",gap:10}} >
            <ThemedText type="subtitle" >Image Gallery</ThemedText>
            <ThemedText type="subtitle" >Founders Gallery</ThemedText>
            <ThemedText type="subtitle" >Our Map</ThemedText>
            <ThemedText type="subtitle" >Contact us</ThemedText>
            <ThemedText type="subtitle" >Direction</ThemedText>
            <ThemedText type="subtitle" >Support US</ThemedText>
          </ThemedView>
        <ThemedText type="subtitle" style={{color:"orange",alignSelf:"center",marginTop:30,margin:10}} > Explore the world your way </ThemedText>
        </Animated.ScrollView>
        </ThemedView>
    )
}

export default Monument

const styles = StyleSheet.create({
   container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  highlight: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    display: "flex",
    flexDirection:"row",
      padding: 5,
      alignItems:"center",
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#799179',
  },
  activeButton: {
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  activeButtonText: {
    color: 'white',
  },
})