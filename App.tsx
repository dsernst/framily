import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { ContactsScreen } from "./ContactsScreen"
import { UpNextScreen } from "./UpNextScreen"
import * as Contacts from "expo-contacts"
import { SafeAreaView } from "react-native"
export type Frequencies = Record<string, string | undefined>

export interface ScreenProps {
  frequencies: Frequencies
  setFrequencies: Dispatch<SetStateAction<Frequencies>>
  switchScreen: () => void
  contacts: Contacts.Contact[]
}

export default function App() {
  const [frequencies, setFrequencies] = useState<Frequencies>({})
  const [isOnContactsScreen, setIsOnContactsScreen] = useState(true)
  const [contacts, setContacts] = useState<Contacts.Contact[]>([])

  useEffect(() => {
    ;(async () => {
      const { status } = await Contacts.requestPermissionsAsync()
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          sort: Contacts.SortTypes.FirstName,
        })

        if (data.length > 0) setContacts(data)
      }
    })()
  }, [])
  function switchScreen() {
    setIsOnContactsScreen(!isOnContactsScreen)
  }

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
