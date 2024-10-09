import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { TabBarIcon } from '../navigation/TabBarIcon';
const icon = ({ value }) => {

    useEffect(() => {
   
    },[value])
   
    return <TabBarIcon name={value} color={'orange'}/>;
}

export default icon

const styles = StyleSheet.create({})