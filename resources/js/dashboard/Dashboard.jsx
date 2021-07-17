import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoTile from "../components/InfoTile";

const Dashboard=props=>{
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Dashboard</h1>
            <div className={'my-card'}>
                <Grid container={true} spacing={4}>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile title={"No of users"} caption={"click here"}>
                            <div style={{fontSize:32,color:'#369'}}>5</div>
                        </InfoTile>
                    </Grid>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile title={"Total course added"} caption={"click here"}>
                            <div style={{fontSize:32,color:'#369'}}>5</div>
                        </InfoTile>
                    </Grid>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile title={"Total subject"} caption={"click here"}>
                            <div style={{fontSize:32,color:'#369'}}>5</div>
                        </InfoTile>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default Dashboard;
