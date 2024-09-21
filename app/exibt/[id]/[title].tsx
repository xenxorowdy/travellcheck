import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { exibit } from '@/utils';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
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
    const [catlog, setCatlog] = useState<catlo | null>();
    const [lan, setLan] = useState<"en"| "hi"| "es"| "fr" >('en');
    const [isSpeaking,setIsSpeaking] = useState(false);
    console.log(title, exibit)
    
    useEffect(() => {
        const exbt = exibit.find(ele => ele.title === title);
        setCatlog(exbt);

    }, [])

console.log(lan)

 const startSpeaking = () => {
    setIsSpeaking(true);
     Speech.speak(catlog?.description?.[lan], {
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
     <Animated.ScrollView

            horizontal={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, gap: 10 }}
            >
       <ThemedView>

          <Image source={{ uri: catlog?.url }} style={{ width: "100%", height: 300, objectFit: 'scale-down', resizeMode: 'stretch' }} />
        </ThemedView>
        <ThemedView style={{height:100 ,flexDirection:"row",alignItems:"center",alignContent:"center",margin:1}}>
          <ThemedView>
          <TouchableOpacity onPress={isSpeaking ? stopSpeaking : startSpeaking} style={{ margin: 20 }}>
                <TabBarIcon name={isSpeaking ? 'pause' : 'play'} color={"orange"}  size={30}/>
      </TouchableOpacity>
          </ThemedView>
          <Dropdown lan={lan} setLan={setLan} />
        </ThemedView>
        <ThemedView style={{margin:10}}>
          <ThemedText  > {catlog?.description?.[lan]} </ThemedText>
        </ThemedView>
    </Animated.ScrollView>
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