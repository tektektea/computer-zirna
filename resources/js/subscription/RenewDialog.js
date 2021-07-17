import React from "react";
import {Dialog, DialogActions, DialogContent, Divider, Icon, OutlinedInput} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {AppContext} from "../context/AppContextProvider";
import {MESSAGE} from "../utils/Action";

const RenewDialog=({open,onClose,onRenew,defaultDate})=>{
    const [date, setDate] = React.useState(defaultDate);
    const [time, setTime] = React.useState(defaultDate);
    const [state, dispatch] = React.useContext(AppContext);

    const handleRenew=e=>{
        if (!!date && !!time) {
            onRenew(date + ' ' + time);
            console.log(date)
            console.log(time)
        }else{
            dispatch({
                type: MESSAGE,
                payload: {
                    message_type: 'success',
                    message: "Invalid date and time"
                }
            })
        }
    }
    const handleCancel=e=>{
        setDate(null);
        setTime(null);
    }
    return(
        <Dialog open={open} fullWidth={true} maxWidth={"sm"}>
            <CardHeader title={"Set validity"} action={<IconButton onClick={onClose}>
                <Icon>close</Icon>
            </IconButton>}/>
            <Divider light={true}/>
            <DialogContent>
                <Grid container={true} spacing={4}>
                    <Grid item={true} xs={4}>
                        Date
                    </Grid>
                    <Grid item={true} xs={8}>
                        <OutlinedInput fullWidth={true}
                                       type={'date'}
                                       margin={"dense"}
                                       value={date}
                                       onChange={event => setDate(event.target.value)}
                        />
                    </Grid>
                    <Grid item={true} xs={4}>
                        Time
                    </Grid>
                    <Grid item={true} xs={8}>
                        <OutlinedInput fullWidth={true}
                                       type={'time'}
                                       margin={"dense"}
                                       value={time}
                                       onChange={event => setTime(event.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <Divider light={true}/>
            <DialogActions>
                <Button onClick={handleRenew} color={"primary"} variant={"outlined"}>Renew</Button>
                <Button onClick={handleCancel} color={"secondary"} variant={"outlined"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default RenewDialog;
