import React, { useState } from 'react'
import { View } from 'react-native'
import { OurModal } from './Modal'
import { ScreenProps } from '../App'
import { TopBar } from './TopBar'
import { List } from './List'

export function ContactsScreen({ switchScreen, contacts }: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

  return (
    <View>
      <OurModal {...{ setSelectedContactId, selectedContactId }} />
      <TopBar {...{ switchScreen }} />

      <List {...{ contacts, setSelectedContactId }} />
    </View>
  )
}
