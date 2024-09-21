import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from './ThemedView'
import { TabBarIcon } from './navigation/TabBarIcon'
import * as Speech from 'expo-speech';
type files = {
    file: string,
    lan : string
}
const Speeh: React.FC<files> = ({ file, lan }) => {
    console.debug(file,lan);
    const [isSpeaking, setIsSpeaking] = useState(false);
    
     const startSpeaking = () => {
    setIsSpeaking(true);
     Speech.speak(file, {
         language: lan,
         _voiceIndex: 3,
         pitch: 1.2,
      onDone: () => setIsSpeaking(false),
    });
  };

  const stopSpeaking = () => {
    Speech.stop();
    setIsSpeaking(false);
  };
    
  return (

          <TouchableOpacity onPress={isSpeaking ? stopSpeaking : startSpeaking} >
                <TabBarIcon name={isSpeaking ? 'pause' : 'play'} color={"orange"}  size={30}/>
      </TouchableOpacity>
  )
}

export default Speeh;

const styles = StyleSheet.create({})