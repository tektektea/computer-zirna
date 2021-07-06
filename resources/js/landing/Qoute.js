import React from "react";
import Grid from "@material-ui/core/Grid";
import {Avatar} from "@material-ui/core";

const Qoute=({sentence,avatar})=>{
    return(
        <Grid spacing={4} container={true} direction={"column"} alignItems={"center"}>
                <q className={"qoute"}>{sentence}</q>
                <img className={'avatar-img'} src={avatar}/>
        </Grid>
    )
}

export default Qoute;
