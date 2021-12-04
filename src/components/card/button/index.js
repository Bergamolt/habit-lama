import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ButtonCard({onClick, id, title, color}) {
  return (
    <TouchableOpacity
      style={ {...styles.button, backgroundColor: color} }
      onPress={ () => onClick(id) }
    >
      <Text>{ title }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  }
})