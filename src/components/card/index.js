import React from 'react'
import { SwipeButtonsContainer, SwipeItem } from 'react-native-swipe-item'
import { ButtonCard } from './button'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'

export default function Card({item, deleteHabit, onEdit, checkMode, doneHabit}) {
  const [prevElements, setPrevElements] = React.useState([])
  const swiperItemEl = React.useRef(null)

  const currentDay = `${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`

  const close = () => {
    console.log(swiperItemEl.current === prevEl)
    if (prevEl) {
      prevEl.close()
    }
  }

  const leftButton = (
    <SwipeButtonsContainer style={ styles.swiperContainer }>
      <ButtonCard color="green" onClick={ onEdit } item={ item } title="Изменить"/>
    </SwipeButtonsContainer>
  )

  const rightButton = (
    <SwipeButtonsContainer style={ styles.swiperContainer }>
      <ButtonCard color="red" onClick={ deleteHabit } item={ item } title="Удалить"/>
    </SwipeButtonsContainer>
  )

  return (
    <SwipeItem
      ref={swiperItemEl}
      onSwipeInitial={(e) => {
        setPrevElements([
          ...prevElements,
          e
        ])
        console.log(prevElements.length)
      }}
      style={ styles.swiper }
      swipeContainerStyle={ styles.swipeContainerStyle }
      leftButtons={ leftButton }
      rightButtons={ rightButton }>
      <TouchableOpacity
        style={ styles.card }
        onPress={() => close()}
        onLongPress={ () => doneHabit(item.id)}
        delayLongPress={ 500 }
        activeOpacity={ 1 }>
        <View style={ styles.cardRow }>
          <View style={ styles.cardCol }>
            <Text style={ styles.cardHabit }>
              { item.name.length > 22 ? item.name.slice(0, 19) + '...' : item.name }
            </Text>
            <Text style={ styles.cardInfo }>
              { item.count ? 'x' + item.count : 'x0' }
            </Text>
            <Text
              style={ styles.cardWarning }>
              { !item.date[currentDay] ? 'Сегодня не было выполнено!' : 'На сегодня выполнено!' }
            </Text>
          </View>
          <View style={ {height: '100%'} }>
            <Icon style={ styles.cardIcon } fill={ checkMode(item.date) ? '#F7D000' : 'rgba(255, 255, 255, 0.4)' } name="flash-outline"/>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeItem>
  )
}

const styles = StyleSheet.create({
  swiperContainer: {
    alignSelf: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 10,
    height: 136,
  },
  swiper: {
    marginBottom: 15,
    borderRadius: 10,
    width: '100%',
    height: 136
  },
  swipeContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: 136,
    backgroundColor: '#2A334B',
    paddingHorizontal: 13,
    borderRadius: 10,
    paddingVertical: 15
  },
  cardRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  cardCol: {
    width: '70%',
    justifyContent: 'space-between',
    height: '100%'
  },
  cardHabit: {
    fontFamily: 'MontserratSemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: '#fff'
  },
  cardInfo: {
    fontFamily: 'MontserratRegular',
    fontSize: 47,
    lineHeight: 57,
    color: '#fff'
  },
  cardWarning: {
    fontWeight: '300',
    fontSize: 12,
    lineHeight: 14,
    marginTop: 6.34,
    color: '#fff',
    opacity: .7
  },
  cardIcon: {
    width: 30,
    height: 30
  }
})