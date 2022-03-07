import { TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Contact } from 'expo-contacts'
import { useState } from 'react'

export const useSearch = (contacts: Contact[]) => {
  const [search, setSearch] = useState('')
  const filtered = contacts.filter(({ firstName, lastName }) =>
    [firstName, lastName].join(' ').toLowerCase().includes(search.toLowerCase())
  )

  return { search, filtered, setSearch }
}

export const SearchBar = ({
  search,
  setSearch,
}: {
  search: string
  setSearch: (s: string) => void
}) => (
  <View style={{ borderBottomWidth: 1, borderColor: '#0003' }}>
    <TextInput
      placeholder="Search"
      style={{
        marginHorizontal: 10,
        paddingVertical: 10,
        fontSize: 16,
        paddingLeft: 23,
      }}
      clearButtonMode="while-editing"
      value={search}
      onChange={({ nativeEvent }) => setSearch(nativeEvent.text)}
    />
    <Ionicons
      name="search"
      size={20}
      style={{ opacity: 0.4, position: 'absolute', top: 8, left: 8 }}
    />
  </View>
)
