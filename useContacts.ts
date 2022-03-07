import { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts'

export const useContacts = () => {
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

  return contacts
}
