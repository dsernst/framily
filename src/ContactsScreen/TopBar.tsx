import { View, Text, TouchableOpacity } from 'react-native'

export const TopBar = ({ switchScreen }: { switchScreen: () => void }) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingVertical: 5,
    }}
  >
    <Text style={{ fontSize: 15, fontWeight: '500', opacity: 0.6 }}>
      Contacts
    </Text>
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: '#00a',
        borderRadius: 5,
        padding: 5,
        paddingHorizontal: 10,
        alignSelf: 'flex-end',
      }}
      onPress={switchScreen}
    >
      <Text style={{ fontWeight: '600', color: '#00a' }}>Done</Text>
    </TouchableOpacity>
  </View>
)
