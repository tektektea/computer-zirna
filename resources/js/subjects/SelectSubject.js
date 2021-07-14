import React from "react";
import {
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {AppContext} from "../context/AppContextProvider";
import {GET_SUBJECTS_API, GET_VIDEO_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";

const SelectSubject = ({open, onClose, defaultVideos=[], onSelects}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [selected, setSelected] = React.useState(defaultVideos);
    const [subjects, setSubjects] = React.useState([]);

    const handleSelect = (v, check) => {
        if (check) {
            let temp = selected;
            temp.push(v)
            setSelected(temp)
        } else {
            let temp = selected.filter(item => item.id !== v.id);
            setSelected(prevState => temp);
        }
    }
    React.useEffect(() => {
        axios.get(GET_SUBJECTS_API)
            .then(res => {
                setSubjects(res?.data?.data)
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                console.log('error', errMsg)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    }, [])
    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>\
            <CardHeader title={"Select subject"} action={<IconButton onClick={onClose}><Icon>close</Icon></IconButton>}/>
            <Divider light={true}/>
            <DialogContent>
                <List>
                    {subjects && subjects.map((v, i) =>
                        <ListItem key={i} divider={true} button={true} onClick={e => handleSelect(v)}>
                            <ListItemText primary={v.title} secondary={v.description}/>
                            <ListItemSecondaryAction>
                                <Checkbox defaultChecked={selected.some(item => item.id === v.id)}
                                          onChange={(event, checked) => handleSelect(v,checked)} color={"primary"}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </DialogContent>
            <Divider light={true}/>
            <DialogActions>
                <Button onClick={e => onSelects(selected)} variant={"contained"} color={"primary"}>Confirm</Button>
                <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
export default SelectSubject;
