import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { commonStyles } from './styled'

const Loading = () => {
  return (
   <ThemedView style={commonStyles.container} >
       <ThemedView style={{width:"100%",marginVertical:100}} >
              <ActivityIndicator size="large"  />
              </ThemedView>
    </ThemedView>
  )
}

export default Loading

const styles = StyleSheet.create({})