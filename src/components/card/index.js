import React from 'react'
import { SwipeButtonsContainer, SwipeItem } from 'react-native-swipe-item'
import { ButtonCard } from './button'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Icon } from '@ui-kitten/components'

const swiperItems = {}
let prevOpenItem

const closeSwiperItem = (id) => {
  if (prevOpenItem && prevOpenItem !== swiperItems[id]) {
    prevOpenItem.close()
  }
  prevOpenItem = swiperItems[id]
}

export default function Card({item, deleteHabit, onEdit, checkMode, doneHabit}) {
  const currentDay = `${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`

  const onClick = (id, callback) => {
    closeSwiperItem(id)
    return callback
  }

  const leftButton = (
    <SwipeButtonsContainer style={ styles.swiperContainer }>
      <ButtonCard icon="edit-outline" color="#31CF2E" onClick={ onClick(item.id, onEdit) } item={ item }/>
    </SwipeButtonsContainer>
  )

  const rightButton = (
    <SwipeButtonsContainer style={ styles.swiperContainer }>
      <ButtonCard icon="trash-outline" color="#EF1919" onClick={ deleteHabit } item={ item }/>
    </SwipeButtonsContainer>
  )

  return (
    <SwipeItem
      ref={ ref => swiperItems[item.id] = ref }
      onSwipeInitial={ () => closeSwiperItem(item.id) }
      style={ styles.swiper }
      swipeContainerStyle={ styles.swipeContainerStyle }
      leftButtons={ leftButton }
      rightButtons={ rightButton }
    >
      <TouchableOpacity
        onPress={ () => closeSwiperItem(item.id) }
        style={ styles.card }
        onLongPress={ () => doneHabit(item.id) }
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
            <Icon style={ styles.cardIcon } fill={ checkMode(item.date) ? '#F7D000' : 'rgba(255, 255, 255, 0.4)' }
                  name="flash-outline"/>
          </View>
        </View>
      </TouchableOpacity>
    </SwipeItem>
  )
}

const styles = StyleSheet.create({
  swiperContainer: {
    width: '20%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    flexDirection: 'column',
    padding: 5,
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