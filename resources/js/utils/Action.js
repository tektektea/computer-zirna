import {AppContext} from "../context/AppContextProvider";
import {CHANGE_COROUSEL_API, FETCH_PUBLICDATA_API} from "./ApiRoutes";

export const LOGIN = `LOGIN`;
export const LOGOUT = 'LOGOUT';
export const LOADING = 'loading';
export const MESSAGE = 'message';
export const SET_COROUSEL = 'corousel changed';
export const GET_PUBLIC_DATA = 'public data';


export const changeCorousel=(corousel,dispatch)=>{
    axios.post(CHANGE_COROUSEL_API, {corousel})
        .then(res=>{
            dispatch({
                type: SET_COROUSEL,
                payload: res?.data?.data
            })
            dispatch({
                type: MESSAGE,
                payload: {
                    message: res?.data?.message,
                    message_type: 'success'
                }
            })
        })
        .catch(err=>{
            const errMsg = !!err.response ? err.response.data.error : err.toString();
            dispatch({
                type: MESSAGE,
                payload: {
                    message: errMsg,
                    message_type: 'error'
                }
            })
        })
}

export const getPublicData= (dispatch)=>{

    axios.get(FETCH_PUBLICDATA_API)
        .then(res=>{
            const {data}=res.data
            dispatch({
                type: GET_PUBLIC_DATA,
                payload:{
                    courses:data?.courses,
                    corousel: data?.corousel,
                    images: data?.images,
                    testimony: data?.testimony
                }
            })
        })
        .catch(err=>{
            const errMsg = !!err.response ? err.response.data.error : err.toString();
            dispatch({
                type:MESSAGE,
                payload:{
                    message:errMsg,
                    message_type:'error'
                }
            })
        })
}
