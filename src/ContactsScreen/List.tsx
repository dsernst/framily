import { Contact } from 'expo-contacts'
import { View, Text, TouchableOpacity, SectionList } from 'react-native'
import { useStorage } from '../useStorage'

export const List = ({
  contacts,
  setSelectedContactId,
}: {
  contacts: Contact[]
  setSelectedContactId: (id: string) => void
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
  const data = Object.keys(contactsGroupedByFirstLetter).map((letter) => ({
    letter,
    data: contactsGroupedByFirstLetter[letter],
  }))

  return (
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
  )
}