import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useLocalSearchParams } from 'expo-router';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { exibit } from '@/utils';
import { StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image'
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import * as Speech from 'expo-speech';
import { Select } from 'native-base';
import Dropdown from '@/components/Dropdown';
import Animated from 'react-native-reanimated';
interface catlo  {
     title: String;
    description: {
        en: String;
      hi: String;
      es: String;
      fr: String;
    };
    url: String;
    highlights: String[];
}



const Exibit = () => {
    const { title  } = useLocalSearchParams();
    const [catlog, setCatlog] = useState<catlo | null>();
    const [lan, setLan] = useState<String>('en');
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