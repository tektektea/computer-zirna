import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {AppContext} from "../context/AppContextProvider";
import Subscribers from "./Subscribers";
import SubscriptionDetail from "./SubscriptionDetail";
import CreateSubscriber from "./CreateSubscriber";

const Subscriptions = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [selectedItem, setSelectedItem] = React.useState();
    const [open, setOpen] = React.useState();

    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Subscriptions</h1>
            <div className={'my-card'}>
                <span>
                    <Button onClick={event => setOpen(true)} color={"primary"}>Add subscriber</Button>
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
                       {!!selectedItem && <SubscriptionDetail item={selectedItem}/>}
                   </div>
               </Grid>

           </Grid>
            {open && <CreateSubscriber open={open} onClose={()=>setOpen(!open)}/>}
        </div>
    )
}
export default Subscriptions;
