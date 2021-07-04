import React from "react";
import {Menu, MenuItem, Popover} from "@material-ui/core";

const ContextMenu=({onClose,open,anchorEl,onMenuItemClick})=>{
    const handleMenuItem=menuItem=>{
        onMenuItemClick(menuItem);
        onClose();
    }
    return(
            <Menu open={open}
                  anchorEl={anchorEl}
                  onClose={onClose}>
                <MenuItem onClick={event => handleMenuItem('renew')}>Renew</MenuItem>
                <MenuItem onClick={event => handleMenuItem('cancel')}>Cancel</MenuItem>
                <MenuItem onClick={event => handleMenuItem('delete')}>Delete</MenuItem>
            </Menu>

    )
}
export default ContextMenu;
