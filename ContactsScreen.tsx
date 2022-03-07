import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SectionList } from 'react-native'
import { OurModal } from './Modal'
import { ScreenProps } from './App'

export function ContactsScreen({
  frequencies,
  setFrequencies,
  switchScreen,
  contacts,
}: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

  // Group contacts by first letter of last name
  const contactsGroupedByFirstLetter = contacts.reduce((memo, contact) => {
    const name = contact.lastName || contact.firstName || ' '
    const firstLetter = name[0]
    if (!memo[firstLetter]) {
      memo[firstLetter] = []
    }
    memo[firstLetter].push(contact)
    return memo
  }, {} as Record<string, typeof contacts>)
  const data = Object.keys(contactsGroupedByFirstLetter).map((letter) => ({
    letter,
    data: contactsGroupedByFirstLetter[letter],
  }))

  return (
    <View>
      <OurModal
        {...{
          setSelectedContactId,
          selectedContactId,
          setFrequencies,
          frequencies,
        }}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: '#0003',
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: '800', opacity: 0.6 }}>
          Contacts
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#00a',
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 10,
            alignSelf: 'flex-end',
          }}
          onPress={switchScreen}
        >
          <Text style={{ fontWeight: '600', color: '#00a' }}>Done</Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={data}
        style={{ height: '100%' }}
        keyExtractor={({ id }) => id}
        renderItem={({ item: { id, firstName, lastName } }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 12,
              borderBottomWidth: 1,
              borderColor: '#0001',
            }}
            key={id}
            onPress={() => setSelectedContactId(id)}
          >
            <Text style={{ fontSize: 18 }}>
              {firstName} <Text style={{ fontWeight: '600' }}>{lastName}</Text>
            </Text>
            <Text style={{ opacity: 0.4 }}>{frequencies[id]}</Text>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { letter } }) => (
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: '#0001',
              backgroundColor: '#f3f3f3',
              paddingHorizontal: 10,
              paddingVertical: 2,
            }}
          >
            <Text style={{ color: '#0006', fontSize: 16, fontWeight: '600' }}>
              {letter}
            </Text>
          </View>
        )}
      />
    </View>
  )
}
