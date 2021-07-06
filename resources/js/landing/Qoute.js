import React from "react";
import Grid from "@material-ui/core/Grid";
import {Avatar} from "@material-ui/core";

const Qoute=({sentence,avatar})=>{
    return(
        <Grid style={{padding:80}} container={true} direction={"column"} alignItems={"center"}>
                <q>{sentence}</q>
            <br/>
            <br/>
                <Avatar sizes={'large'}  variant={"circle"} src={avatar}>

                </Avatar>
        </Grid>
    )
}

export default Qoute;
