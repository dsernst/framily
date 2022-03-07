import React, { useState } from "react"
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native"
import { OurModal } from "./Modal"
import { ScreenProps } from "./App"

export function ContactsScreen({
  frequencies,
  setFrequencies,
  switchScreen,
  contacts,
}: ScreenProps) {
  const [selectedContactId, setSelectedContactId] = useState<string | false>(
    false
  )

  function handlePress(id: string): void {
    setSelectedContactId(id)
  }

  return (
    <SafeAreaView>
      <OurModal
        {...{
          setSelectedContactId,
          selectedContactId,
          setFrequencies,
          frequencies,
        }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "row",
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderColor: "#0003",
          paddingVertical: 5,
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "800" }}>Contacts</Text>
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: "#00a",
            borderRadius: 5,
            padding: 5,
            paddingHorizontal: 10,
            alignSelf: "flex-end",
          }}
          onPress={switchScreen}
        >
          <Text style={{ fontWeight: "600", color: "#00a" }}>Done</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{ width: "100%", paddingHorizontal: 10, paddingVertical: 10 }}
      >
        {contacts.map(({ firstName, lastName, id }) => (
          <TouchableOpacity
            style={{
              marginVertical: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            key={id}
            onPress={() => handlePress(id)}
          >
            <Text style={{ fontSize: 18 }}>
              {firstName} {lastName}
            </Text>
            <Text>{frequencies[id]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
