import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
  contract: null,
  maxSupply: 100,
  connectedAccount: '',
  nfts: [],
})

const setAlert = (msg, color = 'green') => {
  setGlobalState('alert', { show: true, msg, color })
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color })
    setGlobalState('loading', false)
  }, 8000)
}

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading')
  setGlobalState('loading', { ...loading, msg })
}

export {
  useGlobalState,
  setGlobalState,
  getGlobalState,
  setAlert,
  setLoadingMsg,
}