import React from 'react';
import {AppContext} from "../context/AppContextProvider";
import {Dialog, DialogActions, DialogContent, FormLabel, OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const LinkDialog=({open,onClose,handleAdd})=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [link, setLink] = React.useState('');
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"sm"}>
            <DialogContent>
                <FormLabel required={true}>Link</FormLabel>
                <OutlinedInput fullWidth={true}
                               required={true}
                               placeholder={"Paste url here"}
                               onChange={e => setLink(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={event => handleAdd(link)} variant={"outlined"} color={"primary"}>Save</Button>
                <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
export default LinkDialog
