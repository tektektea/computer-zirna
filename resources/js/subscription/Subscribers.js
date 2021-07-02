import React from "react";
import {List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput} from "@material-ui/core";
import {MESSAGE} from "../utils/Action";
import Icon from "@material-ui/core/Icon";
import {Pagination} from "@material-ui/lab";
import {AppContext} from "../context/AppContextProvider";

const Subscribers=({onItemClick})=>{
    const [data, setData] = React.useState([]);
    const [state, dispatch] = React.useContext(AppContext);

    const handlePagination = (event, page) => {
        setData(prevState => ({...prevState, page}))
    };
    React.useEffect(()=>{
        axios.get('subscription/subscribers')
            .then(res=>{
                setData(res.data.data);
            })
            .catch(err=>{
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: errMsg,
                        message_type: 'error'
                    }
                })
            })
    },[])
    return(
        <List>
            <OutlinedInput margin={"dense"} placeholder={"search"} fullWidth={true} endAdornment={<Icon>search</Icon>}/>
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
