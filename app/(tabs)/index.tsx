import { FlatList, Image, StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { cities, openapi, weatherApiKey } from '@/utils';
import * as Location from 'expo-location';
import { Redirect, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, Searchbar, TextInput } from 'react-native-paper';
import Animated, { useAnimatedRef, useScrollViewOffset } from 'react-native-reanimated';
// import CityCarousel from '@/components/CityCarousel';
interface LocationObject {
  temp: number;
  icon: string;
}

const cuppons =   ["ALKIDoQ","H6C6Pp2","oQi9Y14","WXNjRZP","AhwAZxH"]

export default function HomeScreen() {
  const [location, setLocation] = useState<null | LocationObject >(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [city, setCity] = useState<string | null>('');
  const [weather, setWeather] = useState<any | null>(null);
  const [cuppon, setcuppon] = useState<boolean>(false);
  const [textCuppon,setText] = useState<String|null>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [warning, setWarning] = useState<String|null>();
    const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const lng = location.coords.longitude;

      const res = await fetch(`https://api.locationiq.com/v1/reverse.php?key=pk.bb9563dbec37f95deae150d32658e7ab&lat=${lat}&lon=${lng}&format=json`);
      const data = await res.json();

      const {city , neighbourhood,village ,country_code} = data.address
      setCity((city || neighbourhood || village|| '') + ', ' + country_code.toUpperCase());

      const query = `?q=${lat},${lng}&key=${weatherApiKey}`;
      const weatherUrl = openapi + query;
      const weatherres = await fetch(weatherUrl)
      const weatherdata = await weatherres.json();
      const wea = weatherdata.current;
      console.log(wea.condition.text);
      setWeather({
        temp: wea.temp_c,
        icon: wea.condition.text
      });
    };

    fetchLocation();
  }, []);

  const getIconName = (value : string) => {
          switch (value) {
        case 'Partly cloudy':
                 return 'cloudy';
        case 'Cloudy':
                 return 'cloudy';
        case 'Sunny':
                 return 'sunny';
        case 'Rainy':
                 return 'rainy';
        case 'Stormy':
              return 'rainy';
        case 'Snowy':
                 return 'snowy';
        case 'Foggy':
              return 'fog';
        case 'Windy':
              return 'windy';
        case 'Hail':
              return 'hail';
        case 'Thunderstorm':
              return 'thunderstorm';
        case 'Drizzle':
              return 'rainy';
            case 'Light rain shower':
              return 'rainy';
        case 'Clear':
              return 'moon-sharp';
        
        default:
                 return null;
    }
  }

  const handleCode = () => {
    
  }

  const handleCuppon = () => {
    if (cuppons.some(cupp=>cupp===textCuppon)) {
      router.push("place/2324")
    }
    else {
      setWarning("Cuppon code is not valid");
    }
      
  }

  useEffect(() => {
    setWarning("");
  },[textCuppon])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={{padding:16,gap:10}}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="weather">{city}</ThemedText>
          <ThemedView style={styles.weather} >
            {/* <ThemedText type="weather">{weather?.icon}</ThemedText> */}
          <ThemedText type="weather">{weather?.temp}°C</ThemedText>
            <TabBarIcon name={getIconName(weather?.icon)} color={'orange'} size={20}/>
          </ThemedView>
          </ThemedView>
 
        {!cuppon?
        <Button mode="contained-tonal" style={styles.button} onPress={()=>setcuppon(!cuppon)} >Enter coupon code</Button>
          :
        <ThemedView style={{flexDirection:"row",justifyContent:"space-around"}} >
        <TextInput
              placeholder='Enter Code'
              onChangeText={setText}
              value={textCuppon}
              style={{ width: 250, height: 40 }} />
        <Button mode="contained-tonal" onPress={handleCuppon} > apply</Button>
        </ThemedView>
        }
        <ThemedText type="error" >{warning}</ThemedText>
             <Searchbar
        theme={{ roundness: 3}}
      placeholder="Search city"
      onChangeText={setSearchQuery}
      value={searchQuery}
        />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="subtitle">Popular Cities</ThemedText>
        <TouchableOpacity activeOpacity={0.5}>
        <ThemedText type='weather' >See All</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      </ThemedView>
      <Animated.ScrollView ref={scrollRef}
       horizontal={true}
          showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1,paddingLeft:16 }}>
        <FlatList
          data={cities.filter(city=>city.name?.toLowerCase().includes(searchQuery.toLowerCase()))}
          keyExtractor={(item) => item.name.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1, }}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.75} onPress={() =>  router.push(`city/${item.name}`)} style={styles.courosual} >
              <Image
                source={{uri: item.image_url}}
                style={{ width: 200, height: 300, objectFit:"fill",  borderRadius:18, backgroundColor: 'black', }}
              />
              <ThemedText type="weather" style={styles.imageRelativeText} >{item.name}</ThemedText>
            </TouchableOpacity>
          )}
        />
        </Animated.ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weather: {
    display: 'flex',
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  stepContainer: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    display: 'flex',
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  courosual: {
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    gap: 12,
    marginBottom: 8,
    paddingRight: 50,
  },
  imageRelativeText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    fontSize: 25,
  },
  applyButton: {
    width:50
  },
  button: {
    width:200
  }
});
