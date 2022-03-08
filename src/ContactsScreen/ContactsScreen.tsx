import React, { useState } from 'react'
import { View } from 'react-native'
import { ModalPicker } from './ModalPicker'
import { ScreenProps } from '../App'
import { TopBar } from './TopBar'
import { List } from './List'
import { SearchBar, useSearch } from './SearchBar'
import { Contact } from 'expo-contacts'

export type Selected = Contact | false
export function ContactsScreen({ switchScreen, contacts }: ScreenProps) {
  const [selected, setSelected] = useState<Selected>(false)

  const { filtered, search, setSearch } = useSearch(contacts)

  return (
    <View>
      <TopBar {...{ switchScreen }} />

      <SearchBar {...{ search, setSearch }} />
      <List {...{ contacts: filtered, setSelected }} />

      <ModalPicker {...{ setSelected, selected }} />
    </View>
  )
}
