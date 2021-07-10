import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import axios from "axios";

const styles=theme=>({
    root:{
        padding: 24
    },
    title:{
        fontSize:24,
        fontWeight:500,
        marginLeft:16,
        marginBottom:16
    },subtitle:{
        fontSize:20,
        fontWeight:500,
    },
    card:{
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 12px 0 rgba(0,0,0,0.1)',
        padding:24
    }
})

const Profile=({classes})=>{
    const [user,setUser]=React.useState({})
    const history = useHistory();
    const handleEdit=e=>{
            history.push(`profile/${user.id}`)
    }
    React.useEffect(() => {
        axios.get('profile/me')
            .then(res => {
                setUser(res.data.data)
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data?.error : err.toString();
                alert(errMsg)
            })
    }, []);
    return(
        <div className={classes.root}>
            <Typography className={classes.title}>Profile</Typography>
            <div className={classes.card}>
                <Grid item={true} container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <Typography className={classes.subtitle}>Profile details</Typography>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormLabel>Username</FormLabel>
                    </Grid>
                    <Grid item={true} xs={8}>
                        <OutlinedInput value={user?.full_name} margin={"dense"} disabled={true}/>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormLabel>Email</FormLabel>
                    </Grid>
                    <Grid item={true} xs={8}>
                        <OutlinedInput value={user?.email} margin={"dense"} disabled={true}/>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <FormLabel>Phone</FormLabel>
                    </Grid>
                    <Grid item={true} xs={8}>
                        <OutlinedInput value={user?.phone_no} margin={"dense"} disabled={true}/>
                    </Grid>
                    <Grid item={true} xs={12}>
                        <Button onClick={handleEdit} color={"primary"} variant={"outlined"}>Edit profile</Button>
                    </Grid>
                </Grid>

            </div>
        </div>
    )
}


export default (withStyles(styles)(Profile));
