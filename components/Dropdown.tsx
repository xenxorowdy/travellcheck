import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
interface app {
    lan: "en"| "hi"| "es"| "fr";
    setLan: React.Dispatch<React.SetStateAction<"en" | "hi" | "es" | "fr">>
}
const App :React.FC<app> =  (props) => {
    const { lan, setLan } = props;

  return (
    <ThemedView style={styles.container}>
        <Picker
          selectedValue={lan}
          style={{ height: 30, width: 150,borderWidth:1,borderColor:"#CCC",color:"orange" }}
          mode={"dialog"}
          onValueChange={(itemValue: "en" | "hi" | "es" | "fr")=>setLan(itemValue)}
        >
          <Picker.Item style={{color:"orange"}} label="English" value="en" />
          <Picker.Item style={{color:"orange"}} label="español" value="es" />
            <Picker.Item style={{color:"orange"}} label="français" value="fr" />
            <Picker.Item style={{color:"orange"}} label="हिंदी" value="hi" />
        </Picker>
  
    </ThemedView>
  );
};

const styles = StyleSheet.create({
    container: {
      width:140
  },
  label: {
    fontSize: 11,
  },
  Picker: {
    height: 50,
    width: 50,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;
