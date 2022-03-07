import React, { useEffect, useState } from 'react'
import { ContactsScreen } from './ContactsScreen'
import { UpNextScreen } from './UpNextScreen'
import * as Contacts from 'expo-contacts'
import { SafeAreaView } from 'react-native'
import { Frequencies, useStorage } from './useStorage'

export interface ScreenProps {
  frequencies: Frequencies
  setFrequencies: (newFrequencies: Frequencies) => void
  switchScreen: () => void
  contacts: Contacts.Contact[]
}

export default function App() {
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])
  const { state, update, loaded } = useStorage()
  const { frequencies } = state
  const setFrequencies = (newFrequencies: Frequencies) => {
    update({ frequencies: newFrequencies })
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          sort: Contacts.SortTypes.FirstName,
        })

        if (data.length > 0) setContacts(data)
      }
    })()
  }, [])
  const switchScreen = () => setIsOnContactsScreen(!isOnContactsScreen)

  return (
    <SafeAreaView>
      {isOnContactsScreen ? (
        <ContactsScreen
          {...{ switchScreen, frequencies, setFrequencies, contacts }}
        />
      ) : (
        <UpNextScreen
          {...{ switchScreen, frequencies, setFrequencies, contacts }}
        />
      )}
    </SafeAreaView>
  )
}
