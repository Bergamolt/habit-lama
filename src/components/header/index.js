import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from '@ui-kitten/components'

const Header = ({onModalShow}) => {
  return (
    <View style={ styles.header }>
      <Text style={ {fontFamily: 'MontserratBold', fontSize: 21, lineHeight: 26, color: '#2A334B'} }>
        Мои привычки
      </Text>
      <TouchableOpacity activeOpacity={ 0.9 } style={ styles.button } onPress={ onModalShow }>
        <Icon style={ {width: 25, height: 25} } fill="#eaeaea" name="plus-outline"/>
      </TouchableOpacity>
    </View>
  )
}

Header.propTypes = {
  onModalShow: PropTypes.func
}

export default Header

const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  button: {
    borderRadius: 40,
    width: 74,
    height: 40,
    backgroundColor: '#2A334B',
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
  },
})
