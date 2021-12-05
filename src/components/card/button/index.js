import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components';

export function ButtonCard({onClick, item, icon, color}) {
  return (
    <TouchableOpacity style={ {...styles.button, backgroundColor: color} } onPress={ () => onClick(item) }>
      <Icon style={{width: 30, height: 30}} fill="rgba(255, 255, 255, 0.9)" name={icon}/>
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