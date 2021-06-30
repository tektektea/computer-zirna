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
import {GET_MATERIAL_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";

const SelectMaterial = ({open, onClose, onSelects, defaultVideos = []}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [materials, setMaterials] = React.useState([]);
    const [selected, setSelected] = React.useState(defaultVideos);

    const handleSelect = (material, check) => {
        if (check) {
            let temp = selected;
            temp.push(material)
            setSelected(temp)
        } else {
            let temp = selected.filter(item => item.id !== material.id);
            setSelected(prevState => temp);
        }
    }
    React.useEffect(() => {
        axios.get(GET_MATERIAL_API)
            .then(res => {
                setMaterials(res?.data?.data)
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
            <CardHeader title={"Select Material"}
                        action={<IconButton onClick={onClose}><Icon>close</Icon></IconButton>}/>
            <Divider light={true}/>
            <DialogContent>
                <List>
                    {materials && materials.map((v, i) =>
                        <ListItem key={i}
                                  divider={true}
                                  onClick={e => handleSelect(v)}>
                            <ListItemText primary={v.title}
                                          secondary={v.description}/>
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
export default SelectMaterial;
