import React from "react";
import {List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";

const VideoList=({videos,remove})=>{
    return(
        <List>
            {videos && videos.map((item,index)=><ListItem key={index} divider={true}>
                <ListItemText primary={item?.title} secondary={item?.description}/>
                <ListItemSecondaryAction>
                    <IconButton onClick={event => remove(index)} color={"secondary"}>
                        <Icon>delete</Icon>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            )}
        </List>
    )
}
export default VideoList;
