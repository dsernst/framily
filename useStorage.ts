import { usePersistStorage } from 'react-native-use-persist-storage'

export type Frequencies = Record<string, string | undefined>
type State = {
  frequencies: Frequencies
}
const initialState: State = { frequencies: {} }

export const useStorage = () => {
  const [state, setState, loaded] = usePersistStorage(
    'storageKey',
    initialState
  )

  const update = (diff: Record<string, any>) => setState({ ...state, ...diff })

  return { state, update, loaded }
}
