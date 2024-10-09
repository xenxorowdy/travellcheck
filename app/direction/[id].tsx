import { fetchGetAPI } from '@/api'
import Loading from '@/components/commons/Loading'
import { commonStyles } from '@/components/commons/styled'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

const Direction = () => {
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState(true);
    const [direction, setDirection] = useState < any >({});

    const fetchDirection = async() => {
        const data = await fetchGetAPI(`get/data/${id}?db=direction`);
        setDirection(data?.[0]);
        console.log("data fetch", data?.[0]);
        setLoading(false);
    }
    useEffect(() => {
        fetchDirection();
        
    }, []);
    if (loading) {
        return <Loading/>
    }
  return (
      <ParallaxScrollView headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}  >
          <ThemedView style={commonStyles.container}>
          <ThemedText style={commonStyles.textCenter} type="subtitle" >Direction</ThemedText>

      {/* By Road */}
   <ThemedText style={{ fontSize: 20, fontWeight: 'bold', color: 'green', marginBottom: 10 }}>By Road</ThemedText>
{
              Object.keys(direction?.by_road || {}).map((direct, index) => {
                  console.log(direct,"directttt");
        return (
            <ThemedView key={index}>
                <ThemedText style={{ fontWeight: 'bold', marginTop: 10 }}>
                    {direct.replace(/_/g, " ")}
                </ThemedText>
                <ThemedText>
                    {direction?.by_road[direct]}
                </ThemedText>
            </ThemedView>
        );
    })
}

          <ThemedText style={{ fontSize: 20, fontWeight: 'bold', color: 'green', marginBottom: 10 }}>Public Transport</ThemedText>
                   {
              Object.keys(direction?.public_transport||{}).map(direct => {
                  return (
                      <ThemedView>
                            <ThemedText style={{ fontWeight: 'bold', marginTop: 10 }}>{direct.replace(/_/g, " ")}</ThemedText>
                            <ThemedText>{direction?.public_transport[direct]}</ThemedText>
                      </ThemedView>
                  )
              })
          }

</ThemedView>
    </ParallaxScrollView>
  )
}

export default Direction

const styles = StyleSheet.create({})