import React from "react";
import Grid from "@material-ui/core/Grid";

const Contact=props=>{
    return(
        <div className={'maincontent'}>
            <p className={'title'}>Contact us</p>
            <Grid container={true}>
                <Grid item={true} xs={2}>Phone</Grid>
                <Grid item={true} xs={10}>
                    <code>
                      936263680
                    </code>
                </Grid>
                <Grid item={true} xs={2}>Email</Grid>
                <Grid item={true} xs={10}>
                    <code>
                        thatea2010@gmail.com
                    </code>
                </Grid>
                <Grid item={true} xs={2}>Address</Grid>
                <Grid item={true} xs={10}>
                    <address>Thakthing bazar, Mission veng,</address>
                    <address>Aizawl, Mizoram,</address>
                    <address>796321</address>
                </Grid>
            </Grid>
        </div>

    )
}
export default Contact;
