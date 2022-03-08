import { Contact } from 'expo-contacts'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScreenProps } from './App'
import { daysToString } from './durations'
import { useStorage } from './useStorage'

export function UpNextScreen({ contacts, switchScreen }: ScreenProps) {
  const {
    state: { frequencies },
  } = useStorage()

  const contactsById = contacts.reduce(
    (memo, contact) => ({
      ...memo,
      [contact.id]: contact,
    }),
    {} as Record<string, Contact>
  )

  return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#00a',
          borderRadius: 5,
          padding: 5,
          alignSelf: 'flex-start',
          marginBottom: 15,
        }}
        onPress={switchScreen}
      >
        <Text style={{ fontWeight: '600', color: '#00a' }}>
          Adjust Contacts
        </Text>
      </TouchableOpacity>

      <Text style={{ fontWeight: '700', fontSize: 18, marginBottom: 5 }}>
        Who to contact next?
      </Text>
      <View style={{ justifyContent: 'center' }}>
        {Object.keys(frequencies)
          .filter((id) => frequencies[id])
          .sort((a, b) => frequencies[a]! - frequencies[b]!)
          .map((id) => (
            <Text key={id}>{`${contactsById[id].firstName} ${
              contactsById[id].lastName
            }: ${daysToString(frequencies[id])}`}</Text>
          ))}
      </View>
    </View>
  )
}
