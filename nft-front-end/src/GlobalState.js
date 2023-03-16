import { createContext, useContext, useReducer } from 'react';

const initialState = {
    alert: { show: false, msg: '', color: '' },
    loading: { show: false, msg: '' },
    contract: null,
    maxSupply: 100,
    connectedAccount: '',
    nfts: [],
};

const actionTypes = {
    SET_LOADING: 'SET_LOADING',
    SET_CONNECTED_ACCOUNT: 'SET_CONNECTED_ACCOUNT',
    SET_ALERT: 'SET_ALERT',
    SET_LOADING_MSG: 'SET_LOADING_MSG',
    SET_NFTS: 'SET_NFTS',
    SET_CONTRACT: 'SET_CONTRACT',
};

const globalReducer = (state, action) => {
    if (!action) {
        console.error("Action object is undefined.");
        return state;
      }
    // console.log("Incoming state:", state); // Add this line to log the action
    // console.log("Incoming action:", action); // Add this line to log the action
    switch (action.type) {
        case actionTypes.SET_LOADING:
            return { ...state, loading: action.payload };
        case actionTypes.SET_CONNECTED_ACCOUNT:
            return { ...state, connectedAccount: action.payload };
        case actionTypes.SET_ALERT:
            return { ...state, alert: action.payload };
        case actionTypes.SET_LOADING_MSG:
            return { ...state, loading: { ...state.loading, msg: action.payload } };
        case actionTypes.SET_NFTS:
            return { ...state, nfts: action.payload };        
        case actionTypes.SET_CONTRACT:
            return { ...state, contract: action.payload };
        default:
            console.warn(`Unknown or undefined action type: ${action.type}`);
        return state;
    }
};

const GlobalStateContext = createContext();
const GlobalDispatchContext = createContext();

const GlobalStateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
    <GlobalStateContext.Provider value={state}>
        <GlobalDispatchContext.Provider value={dispatch}>
        {children}
        </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
      throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
};
  
const useGlobalDispatch = () => {
    const context = useContext(GlobalDispatchContext);
    if (context === undefined) {
      throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
    }
    return context;
};
  
export {
    GlobalStateProvider,
    GlobalStateContext,
    GlobalDispatchContext,
    actionTypes,
    useGlobalState,
    useGlobalDispatch,
};