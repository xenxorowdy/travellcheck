import { fetchGetAPI } from '@/api'
import CusModal from '@/components/commons/CusModal'
import Dropdown from '@/components/Dropdown'
import ExpandableText from '@/components/Expand'
import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { cuppons, getData, language, mapping as mappingTemp, storeData } from '@/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'expo-image'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedRef } from 'react-native-reanimated'
type monument = {
  _id: string;
  city_id: string;
  monument_name: string;
  additional_details: {
    location: string;
    opening_hours: string;
    entry_fee: string;
  };
  custom_mapping?: {IMAGE_GALLERY: string;
    FOUNDERS_GALLERY: string;
    OUR_MAP: string;
    CONTACT_US: string;
    DIRECTION: string;
    SUPPORT_US: string;
  },
  image_url: string;
  description: string,
}
export type lanType = "en" | "hi" | "es" | "fr";

const Monument = () => {
  // 
  // let mapping = { ...mappingTemp }
  const [mapping,setMapping] = useState({...mappingTemp})
  const [lan, setLan] = useState<lanType>('en');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [accessCode, setAccessCode] = useState<string>('');
  const { id } = useLocalSearchParams();
  const [url, setUrl] = useState<string>('');
  const [warning,setWarning] = useState<string>('');
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [monuments, setMonuments] = useState<monument>({
    _id: "",
    city_id: "",
    monument_name: "",
    additional_details: {
      location: "",
      opening_hours: "",
      entry_fee: "",
    },
    custom_mapping: {
      
    },
    image_url: "",
    description: "",
  })
    const handleCuppon  = (text:string) :boolean =>  {
    if (cuppons.some(cupp => cupp === text)) {
      console.log("redirecting...")
      storeData("key", "cupponDone")

      return true;
    }
    else {
      setWarning("Cuppon code is not valid");
      return false
    }
      
  }

  const [loading, setLoading] = useState<boolean>(true)
    const handleApply = (): void => {
      console.log("Access Code:", accessCode);
      if (handleCuppon(accessCode)) {
        closeModal();
        router.push(url);
      }
      else {
        setWarning("Invalid access code");
      }
  };
    const closeModal = () => {
         setAccessCode('');
          setModalVisible(false);
    }
    const openModal = () => {
        setModalVisible(true);
    }
  console.log(`place/${lan}/${monuments._id}/full`, "mommm");
  const fetchMonument = async () => {
    try {
      const monumentObj = await fetchGetAPI(`get/monuments/${id}`);
      const _monument = monumentObj?.[0]
      setMonuments(_monument);
      console.log("monument", _monument);
      const tempMapping = mapping;
      if (_monument.custom_mapping) {
        Object.keys(_monument.custom_mapping).forEach(key   => tempMapping[key] = _monument.custom_mapping[key]);
      }
      setMapping(tempMapping);
      console.error("monument", _monument,mapping);
      setLoading(false);
    } catch (error) {
      console.error("error", "hello", error, `get/monuments/${id}`);
    }
  }
  const setLangue = async() => {
    const value = await getData(language);
    if (null === value) return;
    setLan(value);
  }
  console.error("errrrr", mapping);

  const setLanguedata = (lan: lanType) => {
    storeData(language, lan);
    setLan(lan);
  }
  useEffect(() => {
    setLoading(true);
    fetchMonument();
    setLangue()
  }, [id])

  if (loading) {
    return <ThemedView style={styles.container} >
      <ActivityIndicator size="large" />
    </ThemedView>
  }
  return (
    <ThemedView style={{ flex: 1 }}>
      <Animated.ScrollView horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 10 }}>
        <Image source={{ uri: monuments?.image_url }} style={{ width: "100%", height: 200, objectFit: "fill", resizeMode: "contain" }} />
        {/* <ThemedText type="subtitle">{monuments?.description} </ThemedText> */}
        <ExpandableText text={monuments.description} />
        <Dropdown lan={lan} setLan={setLanguedata} />
        <ThemedView style={styles.buttonGroup}>
          <TouchableOpacity style={styles.button} onPress={async() => {
            await storeData('paid','free');
            router.push(`place/${monuments.monument_name}/${monuments._id}`)
          }} >
            <ThemedText>Free Tour</ThemedText>
            <TabBarIcon name={"chevron-forward"} color={'orange'} size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={async() => {
            storeData('paid', 'paid');
            const value = await AsyncStorage.getItem("key");

            if (value === "cupponDone") {
              router.push(`place/${monuments.monument_name}/${monuments._id}`)
            }
            else {
              setUrl(`place/${monuments.monument_name}/${monuments._id}`);
              openModal();
            }
          }}>
            <ThemedText>Full Tour</ThemedText>
            <TabBarIcon name={"chevron-forward"} color={'orange'} size={30} />
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={{ display: "flex", flexDirection: "column", gap: 10 }} >
          <TouchableOpacity onPress={() => router.push(`/gallery/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.IMAGE_GALLERY}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/founders_gallery/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.FOUNDERS_GALLERY}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/map/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.OUR_MAP}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/contact_us/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.CONTACT_US}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/direction/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.DIRECTION}</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push(`/support_us/${monuments._id}`)}>
            <ThemedText type="subtitle" >{mapping.SUPPORT_US}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
          <CusModal
        modalVisible={modalVisible}
        setModalVisible={modalVisible}
        closeModal={closeModal}
        setAccessCode={setAccessCode}
        accessCode={accessCode}
        warning={warning}
        handleApply={handleApply}
      />
        <ThemedText type="subtitle" style={{ color: "orange", alignSelf: "center", marginTop: 30, margin: 10 }} > Explore the world your way </ThemedText>
      </Animated.ScrollView>
    </ThemedView>
  )
}

export default Monument

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
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    backgroundColor: '#799179',
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
})