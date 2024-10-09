import { fetchGetAPI } from '@/api'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import WelcomeScreen from '@/components/WellAnimation'
import { exibit } from '@/utils'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider, Searchbar } from 'react-native-paper'
import * as Speech from 'expo-speech';
import Animated, { useAnimatedRef } from 'react-native-reanimated'
import Speeh from '@/components/speeh'


const City = () => {
const { id,title } = useLocalSearchParams();
    const [welcome, setWelcome] = useState<boolean>(true)
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [loading, setloading] = useState(false);
  const [exibits, setExbitis] = useState<[]>([])
  const [isSpeaking,setIsSpeaking] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const fetchMonument = async () => {
    try {      
      const exibit = await fetchGetAPI(`get/exibit/${id}`);
      console.debug(exibit, "monumvents", exibit, `get/exibit/${id}`);
      if (Array.isArray(exibit)) setExbitis(exibit);
      setloading(false);
    } catch (error) {
      console.error("error", "hello",error,`get/monuments/${id}`);
    }
  }
  useEffect(() => {
    setloading(true);
    fetchMonument();
  }, [id])
  useEffect(() => {

    setTimeout(()=>setWelcome(false),2000)
  }, [])
   const startSpeaking = () => {
    setIsSpeaking(true);
     Speech.speak(exibits?.description?.[lan], {
         language: lan,
         _voiceIndex: 3,
         pitch: 1.2,
         quality: "Enhanced",
      onDone: () => setIsSpeaking(false),
    });
  };
  
  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
  const width = Dimensions.get("screen").width;
  if (loading)
    return <ThemedView style={styles.container} >
      <ActivityIndicator size="large" />
    </ThemedView>;
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
            contentContainerStyle={{ flexGrow: 1, gap: 10 }}
            >
              <ThemedView style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",marginHorizontal:10}}>

                <Searchbar
                  style={{width:"80%"}}
        theme={{ roundness: 3}}
      placeholder="Search by exibit id or name"
      onChangeText={setSearchQuery}
      value={searchQuery}
              />
               <FontAwesome name="qrcode" size={40} color="grey" />
              </ThemedView>
              <ThemedView>
                <ThemedText type="link" >Exibits</ThemedText>
         
                {console.log(exibits)}
            <FlatList
              data={exibits?.filter(exib=>exib?.id.includes(searchQuery) || exib?.title?.toLowerCase().includes(searchQuery.toLowerCase()))}
              horizontal={false}
              keyExtractor={(item) => item.id} // Assuming 'id' is a unique property
              showsHorizontalScrollIndicator={true}
              style={{ flex: 1, marginVertical: 10 }}
              renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.75}
                  onPress={() => {
                    console.debug(`/exibt/${item._id}/${item.title}`);
                    router.push(`/exibt/${item._id}/${item.title}`)
                  }
                  } // Adjust to pass the correct ID
                    style={styles.courosual}
                  >
                  <ThemedView style={{ width: width - 20, marginVertical: 0, borderRadius: 6, backgroundColor: "#777499", padding: 6, paddingHorizontal: 8, justifyContent: "space-between", marginTop: 10, display: "flex", flexWrap: "nowrap",flexDirection:"row" }}>
                    <ThemedText lineBreakMode="clip" numberOfLines={1} style={{width:"60%"}} >{item.id} {item?.title}</ThemedText>
                    <ThemedText>Info</ThemedText>
                <Speeh file={item?.description?.[title]} lan={title} />
                </ThemedView>
                  </TouchableOpacity>
              )}
                />
                <Divider />
                <ThemedView style={{margin:10,flexDirection:"row",alignItems:"center"}}>
                  <ThemedText>Other Services: </ThemedText>

                </ThemedView>
              </ThemedView>
              
            </Animated.ScrollView>
            
        </ThemedView>
      )}
    </ThemedView>
  )
}

export default City

const styles = StyleSheet.create({
  container: {
    padding: 10,
        flex: 1,
         gap: 8,
    },
    img: { width: '100%',height: 200,  backgroundColor: 'black', objectFit: "cover" },
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


                    // <Image
                    //   source={{ uri: item.url }}
                    //   style={{ width:width-70, height: 250, objectFit: 'scale-down', resizeMode: 'stretch', borderRadius: 18,margin:10 }}
                    // />
                    // <ThemedView style={{ margin: 5 }} >
                    //   <ThemedView style={{ flexDirection: "row",alignItems:"flex-start" }}>
                    //   <ThemedText style={{fontSize:14}} >{item.id} </ThemedText>
                    //   <ThemedText type="catlogTitle" >
                    //     : {item.title}
                    //   </ThemedText  >
                    //   </ThemedView>
                    //   <ThemedView style={{flexDirection:"row",width:width-140,alignContent:"flex-start",alignItems:"flex-start"}}>
                    //   <ThemedText type="defaultSemiBold">Highlights:  </ThemedText><ThemedText type="weather" >{item.highlights.join(', ')}</ThemedText>
                    //   </ThemedView>
                    // </ThemedView>