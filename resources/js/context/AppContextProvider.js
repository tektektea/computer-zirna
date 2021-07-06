import React, { useReducer, createContext } from "react";
import {GET_PUBLIC_DATA, LOADING, LOGIN, LOGOUT, MESSAGE, SET_COROUSEL} from "../utils/Action";

// Create Context Object

const initState = {
    message:'',
    message_type: '',
    loading:false,
    courses:[],
    testimony: [],
    corousel:[],
    images:[],
};

export const AppContext = createContext({});

const reducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case MESSAGE:
            const {message, message_type} = action.payload;
            return {...state,message,message_type};
        case LOADING:
            return {...state,loading:action.payload}
        case LOGIN:
            localStorage.setItem('token', payload);
            axios.defaults.headers['Authorization'] = `Bearer ${payload}`;
            return {...state,token:payload}
        case LOGOUT:
            localStorage.removeItem('token');
            return {...state,token:false}
        case SET_COROUSEL:
            return {...state, corousel: payload};
        case GET_PUBLIC_DATA:
            return {...state,testimony:payload.testimony,courses: payload?.courses,corousel:payload?.corousel,images: payload?.images}
        default:
            return state;
    }
};
// Create a provider for components to consume and subscribe to changes
export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, initState);

    return <AppContext.Provider value={[state, dispatch]}>{props.children}</AppContext.Provider>;
};
