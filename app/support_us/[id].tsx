import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { commonStyles } from '@/components/commons/styled'
import { ThemedView } from '@/components/ThemedView'

const Support = () => {
    return (
        <ParallaxScrollView

            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        >
            <ThemedText style={commonStyles.textCenter} type="subtitle" >Support Us</ThemedText>
            <ThemedText darkColor={"#009951"} lightColor="#009951" style={commonStyles.textCenter} type="catlogTitle"> Help us spread our love of art </ThemedText>
            <ThemedView style={commonStyles.container}>

                <ThemedText type="defaultSemiBold" >Choose payment method</ThemedText>
                <ThemedText type="link"> Credit Card </ThemedText>
                <ThemedText type="link"> Check/Debit Card </ThemedText>
                <ThemedText type="link">UPI  </ThemedText>
                <ThemedText type="link"> AliPay </ThemedText>
            </ThemedView>
        </ParallaxScrollView>
    )
}

export default Support

const styles = StyleSheet.create({

})