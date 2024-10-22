import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '../ThemedView'
import { commonStyles } from './styled'

const Loading = () => {
  return (
   <ThemedView style={commonStyles.container} >
       <ThemedView style={{flex:1,position:"absolute",top:"45%",left:"50%"}} >
              <ActivityIndicator size="large"  />
              </ThemedView>
    </ThemedView>
  )
}

export default Loading

const styles = StyleSheet.create({})