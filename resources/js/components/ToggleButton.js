import React, {useReducer} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {Icon, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {useHistory} from "react-router-dom";

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
const ToggleButton = ({classes,icon, primaryText,secondaryText,route, ...rest}) => {
    const [checked, setChecked] = React.useState(false);
    const history = useHistory();
    const handleClick=e=>{
        history.push(route);
    }
    return (
        <ListItem onClick={handleClick} button={true} classes={classes}>
            <ListItemIcon><Icon>{icon}</Icon></ListItemIcon>
            <ListItemText primary={primaryText} secondary={secondaryText}/>
        </ListItem>
    )
}

export default withStyles(styles)(ToggleButton);
