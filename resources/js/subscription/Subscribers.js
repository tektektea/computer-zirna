import React from "react";
import {List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput} from "@material-ui/core";
import {MESSAGE} from "../utils/Action";
import Icon from "@material-ui/core/Icon";
import {Pagination} from "@material-ui/lab";


const Subscribers=({fetchData,data,onItemClick})=>{

    const handlePagination = (event, page) => {
        fetchData(page)
    };
    const handleSearch=e=>{
        if (e.key === 'Enter') {
            fetchData(1,e.target.value)
        }
        console.log(e.key)
    }

    return(
        <List>
            <OutlinedInput margin={"dense"}
                           placeholder={"search"}
                           fullWidth={true}
                           onKeyPress={handleSearch}
                           endAdornment={<Icon>search</Icon>}/>
            {data?.data && data?.data.map(item=>
                <ListItem key={item?.id} onClick={event => onItemClick(item)} button={true} divider={true}>
                <ListItemText primary={item?.name}
                              secondary={'Contact: '+item?.phone_no}/>
                              <ListItemSecondaryAction>
                                  <Icon>
                                      right_arrow
                                  </Icon>
                              </ListItemSecondaryAction>
            </ListItem>)}
            <Pagination count={Math.floor(data?.total / data?.per_page)} onChange={(handlePagination)}/>
        </List>
    )
}

export default Subscribers;
