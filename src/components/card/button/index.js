import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

export function ButtonCard({onClick, item, title, color}) {
  return (
    <TouchableOpacity style={ {...styles.button, backgroundColor: color} } onPress={ () => onClick(item) }>
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