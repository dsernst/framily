import React, { useState } from 'react'
import { View } from 'react-native'
import { ModalPicker } from './ModalPicker'
import { ScreenProps } from '../App'
import { TopBar } from './TopBar'
import { List } from './List'
import { SearchBar, useSearch } from './SearchBar'

export function ContactsScreen({ switchScreen, contacts }: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

  const { filtered, search, setSearch } = useSearch(contacts)

  return (
    <View>
      <TopBar {...{ switchScreen }} />

      <SearchBar {...{ search, setSearch }} />
      <List {...{ contacts: filtered, setSelectedContactId }} />

      <ModalPicker {...{ setSelectedContactId, selectedContactId }} />
    </View>
  )
}
