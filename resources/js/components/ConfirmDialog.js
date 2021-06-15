import React, {useReducer} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Dialog, DialogActions, DialogContent, Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    root:{
        width:'auto',
        margin:16,
        borderRadius: 4,
        backgroundColor: theme.palette.grey['300'],
    },
    selected:{
        backgroundColor: theme.palette.primary.light,
        borderRight: `3px solid ${theme.palette.primary.light} !important`,
    }
})
const ConfirmDialog = ({data,open,confirmDelete,onClose}) => {

    return (
        <Dialog fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                <Typography variant={"h6"}>Do you want to delete?</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={event => {
                    onClose()
                    confirmDelete(data)
                }}
                        color={"primary"}
                        variant={"contained"}>Yes</Button>
                <Button color={"secondary"}
                        onClick={onClose}
                        variant={"outlined"}>No</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog;
