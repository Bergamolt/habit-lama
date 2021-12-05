import React from 'react'
import { Text, TextInput, TouchableOpacity, View, Modal} from 'react-native';

export function MyModal({modalShow, setModalShow, setValue, setIsEdit, isEdit, editHabit, addNewHabit, editId, setEditId, value}) {
  const inputRef = React.useRef(null)

  return (
    <Modal
      animationType="slide"
      transparent={ true }
      visible={ modalShow }
      onRequestClose={ () => {
        setModalShow(!modalShow)
      } }
    >
      <View style={ {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 28
      } }
      >
        <View style={ {
          paddingBottom: 40,
          paddingTop: 35,
          paddingHorizontal: 29,
          backgroundColor: '#2A334B',
          borderColor: '#2A334B',
          borderRadius: 10,
          width: '100%'
        } }>
          <TextInput
            ref={ inputRef }
            placeholder="Например: Учить английский"
            placeholderTextColor="rgba(255, 255, 255, 0.3)"
            value={ value }
            style={ {
              borderBottomWidth: 1,
              borderStyle: 'solid',
              borderColor: 'rgba(255, 255, 255, 0.5)',
              color: '#fff',
              height: 47,
              fontSize: 14,
              lineHeight: 16
            } }
            onChangeText={ nextValue => setValue(nextValue) }
          />
          <View style={ {
            width: '100%',
            flexDirection: 'row',
            marginTop: 70,
            justifyContent: 'space-between',
            paddingHorizontal: 10
          } }>
            <TouchableOpacity activeOpacity={ 0.9 } style={ {
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 16,
              width: 137,
              height: 47,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderColor: 'rgba(255, 255, 255, 0.5)'
            } } onPress={ () => {
              if (!!isEdit) {
                editHabit(editId)
              } else {
                addNewHabit(value)
              }

              setModalShow(false)
            } }>
              <Text style={ {
                fontSize: 18,
                color: '#2A334B',
                lineHeight: 22,
                fontFamily: 'MontserratMedium'
              } }>{isEdit ? 'Сохранить' : 'Добавить'}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={ 0.9 } onPress={ () => {
              setValue('')
              setIsEdit(false)
              setEditId('')
              setModalShow(false)
            } } style={ {
              width: 137,
              height: 47,
              paddingHorizontal: 16,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: 'rgba(0, 0, 0, 0)'
            } }>
              <Text
                style={ {
                  fontSize: 16,
                  color: '#fff',
                  lineHeight: 20,
                  fontFamily: 'MontserratRegular'
                } }>Отмена</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}