import React from "react";
import {AppContext} from "../context/AppContextProvider";

const Subscription=props=>{
    const[state,dispatch]=React.useContext(AppContext)
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Subscriptions</h1>
        </div>
    )
}
export default Subscription;
