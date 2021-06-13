import {AppContext} from "../context/AppContextProvider";
import {FETCH_PUBLICDATA_API} from "./ApiRoutes";

export const LOGIN = `LOGIN`;
export const LOGOUT = 'LOGOUT';
export const LOADING = 'loading';
export const MESSAGE = 'message';
export const GET_PUBLIC_DATA = 'public data';


export const getPublicData= (dispatch)=>{

    axios.get(FETCH_PUBLICDATA_API)
        .then(res=>{
            const {data}=res.data
            dispatch({
                type: GET_PUBLIC_DATA,
                payload:{
                    courses:data?.courses
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
