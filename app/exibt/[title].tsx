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
interface catlo  {
     title: String;
    description: {
        english: String;
        hindi: String;
    };
    url: String;
    highlights: String[];
}



const Exibit = () => {
    const { title  } = useLocalSearchParams();
    const [catlog, setCatlog] = useState<catlo | null>();
    const [lan, setLan] = useState<'english' | 'hindi'>('english');
    const [isSpeaking,setIsSpeaking] = useState();
    console.log(title, exibit)
    
    useEffect(() => {
        const exbt = exibit.find(ele => ele.title === title);
        setCatlog(exbt);

    }, [])

    const handleChange = () => {
        if (lan === 'english') {
            setLan("hindi")
        } else {
            setLan("english");
        }
    }

 const startSpeaking = () => {
    setIsSpeaking(true);
     Speech.speak(catlog?.description?.[lan], {
         language: lan ==='english' ? "en" : "hi",
         _voiceIndex: 3,
         pitch: 1.4,
         quality: "Enhanced",
      onDone: () => setIsSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
    return (
        <ParallaxScrollView>
       <ThemedView>
          <ThemedText type="subtitle" >{catlog?.title}</ThemedText>
                <Image source={{ uri: catlog?.url }} style={{ width: "100%", height: 400, objectFit: 'scale-down', resizeMode: 'stretch', borderRadius: 18 }} />
                <ThemedView style={{flexDirection:"row"}} >
             <TouchableOpacity
          style={[styles.button, lan === 'english' && styles.activeButton]}
          onPress={handleChange}
        >
          <ThemedText style={[styles.buttonText, lan === 'english' && styles.activeButtonText]}>english</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, lan === 'hindi' && styles.activeButton]}
          onPress={handleChange}
        >
          <ThemedText style={[styles.buttonText, lan === 'hindi' && styles.activeButtonText]}>hindi</ThemedText>
        </TouchableOpacity>
                </ThemedView>
            <TouchableOpacity onPress={isSpeaking ? stopSpeaking : startSpeaking} style={{margin:20}}>
                <TabBarIcon name={isSpeaking ? 'pause' : 'play'} color={"orange"}  size={30}/>
      </TouchableOpacity>
          <ThemedText type="subtitle" > {catlog?.description?.[lan]} </ThemedText>
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