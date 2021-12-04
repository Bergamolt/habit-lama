import React from 'react'
import { useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  InteractionManager,
  Text,
  TouchableOpacity, Vibration,
  View
} from 'react-native';
import { Icon, Layout, List } from '@ui-kitten/components';
import AppLoading from 'expo-app-loading';
import Styles from '../../style';
import Card from '../../components/card';
import Modal from '../../components/modal'
//
export function HomeScreen() {
  const [ value, setValue ] = React.useState('')

  const [ habits, setHabits ] = React.useState([{
    id: Date.now(),
    name: 'sdgfsd',
    count: 0,
    date: {['sdgdsgsdg']: false}
  },])

  const [ modalShow, setModalShow ] = React.useState(false)

  const [ isEdit, setIsEdit ] = React.useState(false)

  const [editId, setEditId] = React.useState('')

  let [ fontsLoaded ] = useFonts({
    MontserratBold: require('../../../assets/fonts/Montserrat/Montserrat-Bold.ttf'),
    MontserratSemiBold: require('../../../assets/fonts/Montserrat/Montserrat-SemiBold.ttf'),
    MontserratRegular: require('../../../assets/fonts/Montserrat/Montserrat-Regular.ttf'),
    MontserratMedium: require('../../../assets/fonts/Montserrat/Montserrat-Medium.ttf'),
  })

  const storeData = async (data) => {
    try {
      const jsonData = JSON.stringify(data)

      await AsyncStorage.setItem('@storage_Key', jsonData)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('@storage_Key')

      return jsonData !== null ? JSON.parse(jsonData) : null;
    } catch (e) {
      console.log(e)
    }
  }

  const editHabit = (id) => {
    const copyHabits = JSON.parse(JSON.stringify(habits))
    const habit = copyHabits.find(h => h.id === id)

    habit.name = value

    setHabits(copyHabits)
    storeData(copyHabits)
    setValue('')
    setIsEdit(false)
    setEditId('')
  }

  const addNewHabit = (value) => {
    if (!!value.trim()) {
      const currentDay = `${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`

      setHabits([
        {
          id: Date.now(),
          name: value,
          count: 0,
          date: {[currentDay]: false}
        },
        ...habits,
      ])

      setValue('')
      storeData(habits)
    }
  }

  const checkMode = (date) => {
    let value = 0
    let prevDate = false
    Object.keys(date).forEach(item => {
      if (date[item]) {
        value += 1
        prevDate = true
      } else {
        value = prevDate ? value : 0
        prevDate = !!value
      }
    })
    return value
  }

  const deleteHabit = (id) => {
    const copyHabits = JSON.parse(JSON.stringify(habits))

    const habit = copyHabits.findIndex(h => h.id === id)

    copyHabits.splice(habit, 1)

    setHabits(copyHabits)
    storeData(copyHabits)
  }

  React.useEffect(async () => {

    const data = await getData()

    if (data.length) {
      const newData = data.map(item => {
        const currentDay = `${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`
        if (!item.date[currentDay]) {
          item.date[currentDay] = false
        }

        return item
      })
      setHabits(newData)
    }
  }, [])

  if (!fontsLoaded) {
    return <AppLoading/>
  }

  const doneHabit = (id) => {
    const copyHabits = JSON.parse(JSON.stringify(habits))
    const habit = copyHabits.find(h => h.id === id)

    const currentDay = `${ (new Date().getMonth()) + 1 }${ (new Date().getDate()) }${ new Date().getFullYear() }`

    habit.date[currentDay] = !habit.date[currentDay]
    habit.count = habit.date[currentDay] ? habit.count + 1 : habit.count - 1

    setHabits(copyHabits)
    storeData(copyHabits)
    Vibration.vibrate(10)
  }

  // const renderHabit = ({item}) => (<Card checkMode={checkMode} item={item} deleteHabit={deleteHabit} doneHabit={doneHabit} />)

  return (
    <Layout style={ {flex: 1, paddingTop: 50, backgroundColor: '#FFFFFF', paddingHorizontal: 12,} }>
      <View style={ {
        width: '100%',
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      } }>
        <Text style={ {fontFamily: 'MontserratBold', fontSize: 21, lineHeight: 26, color: '#2A334B'} }>
          Мои привычки
        </Text>
        <TouchableOpacity
          activeOpacity={ 0.9 }
          style={ Styles.navbarBtn }
          onPress={() => setModalShow(!modalShow)}
        >
          <Icon style={ {width: 25, height: 25} } fill="#eaeaea" name="plus-outline"/>
        </TouchableOpacity>
      </View>
      {/*<View style={ {flex: 1, justifyContent: 'center', alignItems: 'center'} }>*/}
      {/*  {*/}
      {/*    habits.length ? (<List*/}
      {/*      style={ {backgroundColor: 'rgba(0, 0, 0, 0)', width: '100%', height: '100%', borderRadius: 10} }*/}
      {/*      data={ habits }*/}
      {/*      renderItem={ renderHabit }*/}
      {/*    />) : (*/}
      {/*      <Text style={ {fontFamily: 'MontserratRegular', fontSize: 16, color: '#2A334B'} }>Нет запланированых*/}
      {/*        привычек</Text>)*/}
      {/*  }*/}
      {/*</View>*/}
      <Modal
        modalShow={modalShow}
        setModalShow={setModalShow}
        setValue={setValue}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        editHabit={editHabit}
        addNewHabit={addNewHabit}
        editId={editId}
        value={value}
      />
    </Layout>
  )
}