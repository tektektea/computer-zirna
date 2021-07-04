import React from "react";
import {AppContext} from "../context/AppContextProvider";
import Typography from "@material-ui/core/Typography";
import {Alert} from "@material-ui/lab";
import Button from "@material-ui/core/Button";

const SubmittedResult=({onClose,reset})=>{
    const [state, dispatch] = React.useContext(AppContext);

    return(
        <div>
            <Typography variant={"h6"}>Result</Typography>
            <Alert variant={state.message_type}>{state.message}</Alert>

            <br/>
            <Button onClick={e=>reset()} variant={"outlined"} color={"primary"}>New subscriber</Button>
            <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Close</Button>
        </div>
    )
}

export default SubmittedResult;
