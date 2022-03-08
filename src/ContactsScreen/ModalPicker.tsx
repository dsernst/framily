import React from 'react'
import { Modal, Text, View, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useStorage } from '../useStorage'
import { Selected } from './ContactsScreen'
import { Set } from '../utils'

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
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selected}
      onRequestClose={() => {
        setSelected(false)
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 35,
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
              fontSize: 18,
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
            onValueChange={(itemValue) =>
              update({
                frequencies: {
                  ...frequencies,
                  [selected.id]:
                    itemValue !== 'Not set' ? itemValue : undefined,
                },
              })
            }
          >
            {[
              'Not set',
              '1 week',
              '2 weeks',
              '1 month',
              '3 months',
              '6 months',
              '1 year',
            ].map((val) => (
              <Picker.Item key={val} label={val} value={val} />
            ))}
          </Picker>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              paddingVertical: 10,
              width: 280,
              elevation: 2,
              backgroundColor: '#2196F3',
            }}
            activeOpacity={0.7}
            onPress={() => setSelected(false)}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
