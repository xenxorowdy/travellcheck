import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HeaderImage = () => {
  return (
         <Image
  source={require("@/assets/images/heading.png")}
  alt="heading"
  resizeMode="stretch"
  style={{
    width: "100%",
    height: 80,
    borderRadius: 20, // Adjust this value to achieve the desired roundness
    overflow: "hidden",
  }}
/>
  )
}

export default HeaderImage

const styles = StyleSheet.create({})