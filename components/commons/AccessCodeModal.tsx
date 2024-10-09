import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ModalProps,
  TouchableOpacity,
} from 'react-native';
import { useFonts, Roboto_400Regular } from '@expo-google-fonts/roboto';
import { ThemedText } from '../ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from '../ThemedView';
import { TabBarIcon } from '../navigation/TabBarIcon';
type AccessCodeModalProps = {
  warning?: string;
  handleCuppon: (code : string) => boolean;
};
const AccessCodeModal = (props:AccessCodeModalProps) => {
    const {handleCuppon,warning} = props
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>('');

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
  });

  const handleApply = (): void => {
      console.log("Access Code:", accessCode);
      if (handleCuppon(accessCode)) {
          closeModal();
      }
  };
    const closeModal = () => {
         setAccessCode('');
          setModalVisible(false);
    }
    const openModal = () => {
        
        setModalVisible(true);
    }

const color = useThemeColor({  }, "text");

  return (
    <View style={styles.container}>
<TouchableOpacity onPress={openModal} >
          <ThemedText style={{alignSelf:"center"}} type="link" > Have a access code? Clinc here</ThemedText>
        </TouchableOpacity>
      <Modal
              animationType="slide"
               
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
          >
        <View style={styles.centeredView}>
                  <ThemedView style={styles.modalView}  >
                      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <TabBarIcon name="close" color={color}  />
                      </TouchableOpacity>
            <ThemedText  >Enter Access Code</ThemedText>
                      <TextInput

              style={[styles.input,{color:color}]}
              placeholder="Access Code"
              value={accessCode}
              onChangeText={setAccessCode}
                      />{
                          accessCode&&
                          <ThemedText type="error" >{warning}</ThemedText>
                      }
                      
                      <Button title="Apply" onPress={handleApply} />
          </ThemedView>
        </View>
      </Modal>
    </View>
  );
};

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

export default AccessCodeModal;
