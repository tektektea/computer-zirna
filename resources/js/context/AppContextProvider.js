import React, { useReducer, createContext } from "react";

// Create Context Object
export const AppContext = createContext({});

const initState = {
    message:'',
    message_type: '',
    loading:false
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_MESSAGE":
            const {message, message_type} = action.payload;
            return {...state,message,message_type};
        case "LOADING":
            return {...state,loading:action.payload}
        default:
            return state;
    }
};
// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initState);

    return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
};
