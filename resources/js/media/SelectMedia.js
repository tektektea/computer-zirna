import React from "react";
import {
    Card,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    GridList,
    GridListTile, GridListTileBar,
    ListSubheader
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import CardMedia from "@material-ui/core/CardMedia";
import {AppContext} from "../context/AppContextProvider";
import InfoIcon from '@material-ui/icons/Info';

const SelectMedia=({open,onClose,onSelects})=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [selected, setSelected] = React.useState(state?.corousel);

    const handleSelect=(index,checked)=>{
        if (checked) {
            selected[index] = state?.images[index];
        }else {
            let temp=selected?.filter(item => item !== state?.images[index]);
            setSelected(prevState => temp);
        }
    }
    return(
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={"md"}>\
            <DialogContent>

                <GridList cellHeight={120}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Select an images</ListSubheader>
                    </GridListTile>
                    {Boolean(state?.images) && state?.images?.map((item,i)=>
                            <GridListTile key={i}>
                                <img src={item} alt={"none"} />
                                <GridListTileBar
                                    title={"action"}
                                    actionIcon={
                                        <Checkbox
                                            onChange={(e,checked)=>handleSelect(i,checked)}
                                            value={selected?.find(s=>s===item)}/>
                                    }
                                />
                            </GridListTile>)}
                </GridList>

            </DialogContent>
            <DialogActions>
                <Button onClick={e=>onSelects(selected)} variant={"contained"} color={"primary"}>Confirm</Button>
                <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
export default SelectMedia;
