import React from "react";
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import {TextField} from "@material-ui/core";

const styles = {
    container: {
        padding: 24,
        flex: 1
    },
    paper: {
        flex: 1,
        padding: 24,
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 12px 0 rgba(0,0,0,0.1)'
    },
    subtitle: {
        color: '#484848',
        fontFamily: 'Roboto',
        fontSize: 16,
    }
}


const style = {
    paper: {
        padding: 24,
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 12px 0 rgba(0,0,0,0.1)'
    },
}

const CreateDialog = ({open, onClose, ...rest}) => {

    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
            <DialogContent>
                <Grid container={true} spacing={1}>
                    <Grid item={true} xs={12}>
                        <CardHeader style={{padding: 0}} title={'New course'}
                                    action={<IconButton onClick={event => onClose()}><Icon>close</Icon></IconButton>}/>
                    </Grid>

                    <Grid item={true} xs={12}>
                        <TextField label={'Name'}
                                   variant={"filled"}
                                   placeholder={"Name of the course"}
                                   required={true}
                        />
                    </Grid>
                    <Grid item={true} xs={12}>
                        <TextField label={'Description'}
                                   variant={'filled'}
                                   multiline={true}
                                   rows={3}
                                   placeholder={"Description"}/>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} color={"primary"}>Save</Button>
                <Button variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog;
