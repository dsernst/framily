import { Contact } from 'expo-contacts'
import { View, Text, TouchableOpacity, SectionList } from 'react-native'
import { useStorage } from '../useStorage'
import { Selected } from './ContactsScreen'
import { Set } from '../utils'
import { daysToString } from '../durations'

export const List = ({
  contacts,
  setSelected,
}: {
  contacts: Contact[]
  setSelected: Set<Selected>
}) => {
  const {
    state: { frequencies },
  } = useStorage()

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
  const sections = Object.keys(contactsGroupedByFirstLetter).map((letter) => ({
    letter,
    data: contactsGroupedByFirstLetter[letter],
  }))

  return (
    <SectionList
      sections={sections}
      style={{ height: '100%' }}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => {
        const { id, firstName, lastName } = item
        return (
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
            onPress={() => setSelected(item)}
          >
            <Text style={{ fontSize: 18 }}>
              {firstName} <Text style={{ fontWeight: '600' }}>{lastName}</Text>
            </Text>

            {frequencies[id] && (
              <Text style={{ opacity: 0.4 }}>
                {daysToString(frequencies[id])}
              </Text>
            )}
          </TouchableOpacity>
        )
      }}
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
  )
}
