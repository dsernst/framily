import React, { useEffect, useState } from 'react'
import { ContactsScreen } from './ContactsScreen'
import { UpNextScreen } from './UpNextScreen'
import * as Contacts from 'expo-contacts'
import { SafeAreaView } from 'react-native'
import { StorageProvider } from './useStorage'

export interface ScreenProps {
  switchScreen: () => void
  contacts: Contacts.Contact[]
}

export default function App() {
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])

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
      <StorageProvider>
        {isOnContactsScreen ? (
          <ContactsScreen {...{ switchScreen, contacts }} />
        ) : (
          <UpNextScreen {...{ switchScreen, contacts }} />
        )}
      </StorageProvider>
    </SafeAreaView>
  )
}
