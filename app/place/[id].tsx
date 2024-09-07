import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import WelcomeScreen from '@/components/WellAnimation'
import { exibit } from '@/utils'
import { FontAwesome } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Divider, Searchbar } from 'react-native-paper'

import Animated, { useAnimatedRef } from 'react-native-reanimated'


const City = () => {

    const [welcome, setWelcome] = useState<boolean>(true)
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    setTimeout(()=>setWelcome(false),2000)
  },[])
  const width = Dimensions.get("screen").width;
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
            
                <Image
            source={require('@/assets/images/india_national_museum.jpg')}
            style={styles.img}
              />
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
            <FlatList
              data={exibit.filter(exib=>exib.id.includes(searchQuery) || exib.title.toLowerCase().includes(searchQuery.toLowerCase()))}
              horizontal={true}
              keyExtractor={(item) => item.id} // Assuming 'id' is a unique property
              showsHorizontalScrollIndicator={true}
              style={{ flex: 1, marginTop: 1 }}
              renderItem={({ item }) => (
                <ThemedView style={{ width:width-40,  marginVertical: 0, borderRadius: 6 }}>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => router.push(`exibt/${item.title}`)} // Adjust to pass the correct ID
                    style={styles.courosual}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={{ width:width-70, height: 250, objectFit: 'scale-down', resizeMode: 'stretch', borderRadius: 18,margin:10 }}
                    />
                    <ThemedView style={{ margin: 5 }} >
                      <ThemedView style={{ flexDirection: "row",alignItems:"flex-start" }}>
                      <ThemedText style={{fontSize:14}} >{item.id} </ThemedText>
                      <ThemedText type="catlogTitle" >
                        : {item.title}
                      </ThemedText  >
                      </ThemedView>
                      <ThemedView style={{flexDirection:"row",width:width-140,alignContent:"flex-start",alignItems:"flex-start"}}>
                      <ThemedText type="defaultSemiBold">Highlights:  </ThemedText><ThemedText type="weather" >{item.highlights.join(', ')}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </TouchableOpacity>
                </ThemedView>
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