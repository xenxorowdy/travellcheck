import React, { useState } from 'react'
import { Button, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedView } from '../ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { TabBarIcon } from '../navigation/TabBarIcon'
import { ThemedText } from '../ThemedText'

const CusModal = ({ setModalVisible, closeModal, setAccessCode, accessCode, warning, handleApply,modalVisible }:any) => {
    const color = useThemeColor({}, "text");
    const [warn,setWarn] = useState(false);
  return (
     <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredView}>
                  <ThemedView style={styles.modalView}  >
                  <TouchableOpacity style={styles.closeButton} onPress={() => { closeModal(); setWarn(false); }}>
              <TabBarIcon name="close" color={color}  />
                      </TouchableOpacity>
            <ThemedText  >Enter Access Code</ThemedText>
                      <TextInput
              style={[styles.input,{color:color}]}
              placeholder="Access Code"
              value={accessCode}
              onChangeText={setAccessCode}
                      />{
                          warn&&
                          <ThemedText type="error" >{warning}</ThemedText>
                      }
                      
                  <Button title="Apply" onPress={() => {
                      handleApply();
                      setWarn(true);
                  }} />
          </ThemedView>
        </View>
      </Modal>
  )
}

export default CusModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Roboto_400Regular',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10
    },
  input: {
    width: 200,
    height: 40,
    borderColor: '#ccc',
      borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
});