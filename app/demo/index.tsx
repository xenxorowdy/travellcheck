import { fetchGetAPI, fetchPostAPI } from '@/api';
import HeaderImage from '@/components/commons/HeaderImage';
import { ThemedText } from '@/components/ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { border } from 'native-base/lib/typescript/theme/styled-system';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Checkbox } from 'react-native-paper';


const BookDemoForm: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [agreeContact, setAgreeContact] = useState<boolean>(false);
  const [agreePrivacy, setAgreePrivacy] = useState<boolean>(false);

  const handleSubmit = (): void => {
    console.log({
      firstName,
      lastName,
      phoneNumber,
      email,
      message,
      agreeContact,
      agreePrivacy,
    });
      fetchPostAPI("add", {
          firstName,
          lastName,
          phoneNumber,
          email,
          message,
          agreeContact,
          agreePrivacy,
      });
      resetForm();
      
  };
    const resetForm = (): void => {
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setMessage('');
        setAgreeContact(false);
        setAgreePrivacy(false);
    }
    
        const color = useThemeColor({}, "text");
    const backgroundColor = useThemeColor({}, "background");
      styles.input.color = color;

  return (
      <ScrollView contentContainerStyle={styles.container}>
          <HeaderImage/>
      <ThemedText style={styles.header}>Book a Demo</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone number (with country code)"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textArea}
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
                  status={agreeContact ? 'checked' : 'unchecked'}
          onPress={() => setAgreeContact(!agreeContact)}
        />
        <ThemedText style={{...styles.label,width:"85%"}}>I agree to let The Heritage Tour contact me</ThemedText>
      </View>
      <View style={styles.checkboxContainer}>
              <Checkbox
                  style={{borderColor: 'gray', // adjust the border color as needed
                      borderWidth: 1,
                  }}
          status={agreePrivacy ? 'checked' : 'unchecked'}
          onPress={() => setAgreePrivacy(!agreePrivacy)}
        />
        <ThemedText  style={{...styles.label,width:"80%"}}>I have read and agree to the Terms of Privacy</ThemedText>
      </View>
      <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    borderRadius: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    color: '#000',
  },
  textArea: {
    height: 80,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    marginLeft: 8,
  },
});

export default BookDemoForm;
