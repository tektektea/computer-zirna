import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Pagination} from "@material-ui/lab";
import {AppContext} from "../context/AppContextProvider";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {FETCH_SUBSCRIPTION_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import Subscribers from "./Subscribers";
import SubscriptionDetail from "./SubscriptionDetail";

const Subscriptions = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [selectedItem, setSelectedItem] = React.useState();

    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Subscriptions</h1>
            <div className={'my-card'}>
                <span>
                    <Button color={"primary"}>Add subscriber</Button>
                    {" "} <p>Click here to add an existing subscriber</p>
                </span>
            </div>
           <Grid container={true} spacing={2}>
               <Grid item={true} xs={12} md={4}>
                   <div className={'my-card'}>
                       <Subscribers onItemClick={item=>setSelectedItem(item)}/>
                   </div>
               </Grid>
               <Grid item={true} xs={12} md={8}>
                   <div className={'my-card'}>
                       <SubscriptionDetail item={selectedItem}/>
                   </div>
               </Grid>

           </Grid>
        </div>
    )
}
export default Subscriptions;
