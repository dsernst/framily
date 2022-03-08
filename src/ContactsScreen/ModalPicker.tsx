import React from 'react'
import { Modal, Text, View, TouchableWithoutFeedback } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useStorage } from '../useStorage'
import { Selected } from './ContactsScreen'
import { Set } from '../utils'
import { options, daysToString } from '../durations'

export const ModalPicker = ({
  selected,
  setSelected,
}: {
  selected: Selected
  setSelected: Set<Selected>
}) => {
  const {
    state: { frequencies },
    update,
  } = useStorage()

  if (!selected) return null
  return (
    <Modal transparent visible={!!selected}>
      <TouchableWithoutFeedback onPress={() => setSelected(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000c',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableWithoutFeedback onPress={() => {}}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 35,
                paddingBottom: 0,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 20,
                  fontWeight: '600',
                  opacity: 0.8,
                }}
              >
                {selected.firstName} {selected.lastName}
              </Text>

              <Text style={{ fontSize: 14 }}>Minimum time till catchup?</Text>
              <Picker
                itemStyle={{ color: 'grey' }}
                style={{ width: 300 }}
                selectedValue={frequencies[selected.id]}
                onValueChange={(itemValue) => {
                  update({
                    frequencies: {
                      ...frequencies,
                      [selected.id]: itemValue,
                    },
                  })
                  setSelected(false)
                }}
              >
                {options.map((val) => (
                  <Picker.Item
                    key={val}
                    label={daysToString(val)}
                    value={val}
                  />
                ))}
              </Picker>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
