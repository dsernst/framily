import React, { Dispatch, SetStateAction } from "react"
import { Modal, Text, View, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Frequencies } from "./App"

export const OurModal = ({
  selectedContactId,
  setSelectedContactId,
  setFrequencies,
  frequencies,
}: {
  selectedContactId: string | false
  setSelectedContactId: Dispatch<SetStateAction<string | false>>
  setFrequencies: Dispatch<SetStateAction<Frequencies>>
  frequencies: Frequencies
}) => {
  if (!selectedContactId) return null
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!!selectedContactId}
      onRequestClose={() => {
        setSelectedContactId(false)
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 10,
            padding: 35,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <Text style={{ fontSize: 18 }}>Minimum time till catchup?</Text>
          <Picker
            itemStyle={{ color: "grey" }}
            style={{ width: 300 }}
            selectedValue={frequencies[selectedContactId]}
            onValueChange={(itemValue) =>
              setFrequencies({
                ...frequencies,
                [selectedContactId]:
                  itemValue !== "Not set" ? itemValue : undefined,
              })
            }
          >
            {[
              "Not set",
              "1 week",
              "2 weeks",
              "1 month",
              "3 months",
              "6 months",
              "1 year",
            ].map((val) => (
              <Picker.Item key={val} label={val} value={val} />
            ))}
          </Picker>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              paddingVertical: 10,
              width: 280,
              elevation: 2,
              backgroundColor: "#2196F3",
            }}
            activeOpacity={0.7}
            onPress={() => setSelectedContactId(false)}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
