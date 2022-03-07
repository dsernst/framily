import { createPersistContext } from 'react-native-use-persist-storage'
import { useContext } from 'react'

export type Frequencies = Record<string, string | undefined>
type State = {
  frequencies: Frequencies
}
const initialState: State = { frequencies: {} }

const context = createPersistContext({
  storageKey: 'storageKey',
  defaultData: initialState,
})

export const StorageProvider = context.Provider

export const useStorage = () => {
  const [state, setState, loaded] = useContext(context.Context)

  const update = (diff: Record<string, any>) => {
    setState((prev) => ({ ...prev, ...diff }))
  }

  return { state, update, loaded }
}
