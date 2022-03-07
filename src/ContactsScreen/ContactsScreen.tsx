import React, { useState } from 'react'
import { View } from 'react-native'
import { ModalPicker } from './ModalPicker'
import { ScreenProps } from '../App'
import { TopBar } from './TopBar'
import { List } from './List'

export function ContactsScreen({ switchScreen, contacts }: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

  return (
    <View>
      <TopBar {...{ switchScreen }} />

      <ModalPicker {...{ setSelectedContactId, selectedContactId }} />
      <List {...{ contacts, setSelectedContactId }} />
    </View>
  )
}
