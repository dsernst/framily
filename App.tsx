import React, { useState } from 'react'
import { ContactsScreen } from './ContactsScreen'
import { UpNextScreen } from './UpNextScreen'

import { SafeAreaView } from 'react-native'
import { StorageProvider } from './useStorage'
import { useContacts } from './useContacts'

export interface ScreenProps {
  switchScreen: () => void
  contacts: ReturnType<typeof useContacts>
}

export default function App() {
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  const contacts = useContacts()

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
