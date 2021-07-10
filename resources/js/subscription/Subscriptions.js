import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {AppContext} from "../context/AppContextProvider";
import Subscribers from "./Subscribers";
import SubscriptionDetail from "./SubscriptionDetail";
import CreateSubscriber from "./CreateSubscriber";
import {MESSAGE} from "../utils/Action";

const Subscriptions = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [selectedItem, setSelectedItem] = React.useState();
    const [data, setData] = React.useState({});
    const [open, setOpen] = React.useState();

    const fetchData = (page = 1, search = '') => {
        axios.get('subscription/subscribers', {params: {search, page}})
            .then(res => {
                setData(res.data.data);
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: errMsg,
                        message_type: 'error'
                    }
                })
            })
    }
    React.useEffect(() => {
        fetchData('')
    }, [])
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Subscriptions</h1>
            <div className={'my-card'}>
                <Grid container={true} alignItems={"flex-end"} justify={"space-between"}>
                    <span>
                    <Button onClick={event => setOpen(true)} color={"primary"}>Add subscriber</Button>
                        {" "} <p>Click here to add an existing subscriber</p>
                    </span>
                    <Button onClick={event => fetchData(1)} variant={"outlined"} color={"primary"}>Refresh</Button>
                </Grid>
            </div>
            <Grid container={true} spacing={2}>
                <Grid item={true} xs={12} md={4}>
                    <div className={'my-card'}>
                        <Subscribers data={data} fetchData={fetchData} onItemClick={item => setSelectedItem(item)}/>
                    </div>
                </Grid>
                <Grid item={true} xs={12} md={8}>
                    <div className={'my-card'}>
                        {!!selectedItem && <SubscriptionDetail item={selectedItem}/>}
                    </div>
                </Grid>

            </Grid>
            {open && <CreateSubscriber open={open} onClose={() => setOpen(!open)}/>}
        </div>
    )
}
export default Subscriptions;
