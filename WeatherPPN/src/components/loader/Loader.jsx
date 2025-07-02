import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const Loader = () => {
  return (
    <ActivityIndicator animating={true} color={MD2Colors.red400} size={48} />
  )
}

export default Loader