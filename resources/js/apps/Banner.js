import React from 'react';
import {AppContext} from "../context/AppContextProvider";

const Banner=(props)=>{
    const [state, dispatch] = React.useContext(AppContext);
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Banner setting</h1>
            <div className={'my-card'}>
                content
            </div>
        </div>
    )
}
export default Banner
