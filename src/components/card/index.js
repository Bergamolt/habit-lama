import React from 'react';
import { SwipeButtonsContainer, SwipeItem } from 'react-native-swipe-item';
import ButtonCard from './button';
import { Text, TouchableOpacity, Vibration, View } from 'react-native';
import { Icon } from '@ui-kitten/components';
import Styles from '../../style'

export default function Card({ item, deleteHabit, checkMode, doneHabit }) {
  const leftButton = (
    <SwipeButtonsContainer style={ Styles.swiperContainer }>
      <ButtonCard color="green" onClick={ () => {
        // setValue(item.name)
        // setIsEdit(!isEdit)
        // setEditId(item.id)
        // setModalShow(!modalShow)
      } } id={ item.id } title="Изменить"/>
    </SwipeButtonsContainer>
  )

  const rightButton = (
    <SwipeButtonsContainer style={ Styles.swiperContainer }>
      <ButtonCard color="red" onClick={ deleteHabit } id={ item.id } title="Удалить"/>
    </SwipeButtonsContainer>
  )

  return (
    <SwipeItem style={ styles.swiper } swipeContainerStyle={ {
      justifyContent: 'center',
      alignItems: 'center',
    } } leftButtons={ leftButton } rightButtons={ rightButton }>
      <TouchableOpacity
        style={ {
          width: '100%',
          height: 136,
          backgroundColor: '#2A334B',
          paddingHorizontal: 13,
          borderRadius: 10,
          paddingVertical: 15
        } }
        onTouchStart={ e => console.log(e) } onLongPress={ () => doneHabit(item.id) } delayLongPress={ 500 } activeOpacity={ 1 }>
        <View style={ {
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap'
        } }>
          <View style={ {width: '70%', justifyContent: 'space-between', height: '100%'} }>
            <Text style={ {
              fontFamily: 'MontserratSemiBold',
              fontSize: 18,
              lineHeight: 22,
              color: '#fff'
            } }>
              { item.name.length > 25 ? item.name.slice(0, 22) + '...' : item.name }
            </Text>
            <Text style={ {fontFamily: 'MontserratRegular', fontSize: 47, lineHeight: 57, color: '#fff'} }>
              { item.count ? 'x' + item.count : 'x0' }
            </Text>
            <Text
              style={ {
                fontWeight: '300',
                fontSize: 12,
                lineHeight: 14,
                marginTop: 6.34,
                color: '#fff',
                opacity: .7
              } }>
              { !item.date[`${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`] ? 'Сегодня не было выполнено!' : 'На сегодня выполнено!' }
            </Text>
          </View>
          <View style={ {height: '100%'} }>
            <Icon style={ {width: 30, height: 30,} }
                  fill={ checkMode(item.date) ? '#F7D000' : 'rgba(255, 255, 255, 0.4)' } name="flash-outline"/>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeItem>
  )
}