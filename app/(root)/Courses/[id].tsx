import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const course = () => {
  const {id} =useLocalSearchParams();

  return (
    <View>
      <Text>course {id}</Text>
    </View>
  )
}

export default course