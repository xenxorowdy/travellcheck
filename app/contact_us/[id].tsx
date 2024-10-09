import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import { fetchGetAPI } from '@/api'
import { useLocalSearchParams } from 'expo-router'
import Loading from '@/components/commons/Loading'
import { commonStyles } from '@/components/commons/styled'

const ContactUs = () => {
//     {
//   "_id": {
//     "$oid": "6703d54b6d450800929f6500"
//   },
//   "name": "MA Museum",
//   "address": {
//     "street": "1622 Worcester Road",
//     "city": "Framingham",
//     "state": "MA",
//     "zip": "01702"
//   },
//   "contact": {
//     "phone": "+1 (508) 395-1234",
//     "email": "monument_ma@gmail.com"
//   },
//   "monument_id": "66e8a63e74ad767f37358ac5"
    // }
    const { id } = useLocalSearchParams();
    const [ contact,setContact ] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const fetchContact = async () => {
        const res = await fetchGetAPI(`get/data/${id}?db=contact_us`);
        setContact(res?.[0] || {});
        setLoading(false);
    }
    useEffect(() => {
        fetchContact();
    }, []);
    if (loading) {
        return <Loading/>
    }
  return (
      <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}  >
          <ThemedView style={commonStyles.textCenter} >
          <ThemedText type="defaultSemiBold" > 
               Contact Us
          </ThemedText>
          <ThemedView style={{flex:1,gap:10}}>
          <ThemedText type="default" > 
               {contact?.name}
          </ThemedText>
          <ThemedText type="default" > 
               {contact?.address?.street}, {contact?.address?.city}, {contact?.address?.state}, {contact?.address?.zip}
          </ThemedText>

                <View style={styles.container}>
      <View style={styles.divider} />
    </View>
          <ThemedText type="default" > 
               Contact Information
          </ThemedText>

          <ThemedText type="default" > 
               {contact?.contact?.phone}
          </ThemedText>
          <ThemedText type="default" > 
               {contact?.contact?.email}
              </ThemedText>
              </ThemedView>
</ThemedView>
    </ParallaxScrollView>
  )
}

export default ContactUs

const styles = StyleSheet.create({
     container: {
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
})