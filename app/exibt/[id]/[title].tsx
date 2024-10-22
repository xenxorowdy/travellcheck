import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { exibit, getData, language } from '@/utils';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Loading from '@/components/commons/Loading';
import { fetchGetAPI } from '@/api';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Speeh from '@/components/speeh';
type catlo =  {
  _id?: string,
  monument_id?: string,
     title: string;
    description: {
        en: string;
      hi: string;
      es: string;
      fr: string;
    };
    url: string;
    highlights?: string[];
}



const Exibit = () => {
    const { title,id,lang  } = useLocalSearchParams();
    const [catalog, setCatalog] = useState<catlo | null>();
    const [lan, setLan] = useState<"en"| "hi"| "es"| "fr" >('en');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchExhibit = async()=> {
    const res = await fetchGetAPI(`exibit?id=${id}`);
    console.log(res, "exit1223", id);
    if (res?.[0]) {
      setCatalog(res[0]);
      setLoading(false);
    }
  }
  const fetchLan = async () => {
    const lan = await getData(language);
  
    if (!lan) return;
    setLan(lan);
  }
  useEffect(() => {
    fetchLan();
      fetchExhibit();
        // const tempExhibit = exibit.find(ele => ele.title === title);
        // if (tempExhibit) {
        //     setCatalog(tempExhibit);
        // }
    }, [title]);

  if (loading) 
      return <Loading/>

  const startSpeaking = () => {
    console.log('Start', catalog?.description?.[lan]);
    setIsSpeaking(true);
     Speech.speak(catalog?.description?.[lan], {
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

  
    return (
      <ParallaxScrollView 
        safeView={false}
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
       <ThemedView>

          <Image source={{ uri: catalog?.url }} style={{ width: "100%", height: 300, objectFit: 'scale-down', resizeMode: 'stretch' }} />
        </ThemedView>
        <ThemedView style={{ height: 100, flexDirection: "row", alignItems: "center", alignContent: "center", margin: 1 }}>
       
          <ThemedView>
          <TouchableOpacity  onPress={isSpeaking ? stopSpeaking : startSpeaking} style={{ margin: 20 ,flexDirection:"row",alignItems:"center",justifyContent:"center",alignSelf:"center",gap:10}}>
                <TabBarIcon name={isSpeaking ? 'pause' : 'play'} color={"orange"}  size={30}/>
            <ThemedText type="weather">{isSpeaking ? 'pause' : 'play'}</ThemedText>
            </TouchableOpacity>
          </ThemedView>

        </ThemedView>
        <ThemedView style={{margin:10}}>
          <ThemedText  > {catalog?.description?.[lan]} </ThemedText>
        </ThemedView>
        </ParallaxScrollView>
  )
}

Exibit.propTypes = {}

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
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: 'lightgrey',
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
});


export default Exibit