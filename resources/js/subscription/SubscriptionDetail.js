import React from "react";
import {
    Card,
    CardActions,
    CardHeader, Hidden,
    Icon,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ContextMenu from "./ContextMenu";
import ConfirmDialog from "../components/ConfirmDialog";
import {CREATE_SUBSCRIBER_API, DELETE_SUBSCRIPTION_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {AppContext} from "../context/AppContextProvider";

const SubscriptionDetail = ({item}) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [subscriptions, setSubscriptions] = React.useState(item?.subscriptions);
    const [state, dispatch] = React.useContext(AppContext);

    React.useEffect(()=>{
        setSubscriptions(item?.subscriptions)
    },[item])
    const handleMenuItem = menuItem => {
        switch (menuItem) {
            case 'renew':
                break;
            case 'cancel':
                break;
            case 'delete':
                setOpenConfirm(true);
                break;
        }
    }
    const deleteSub=()=>{
        axios.delete(DELETE_SUBSCRIPTION_API(selectedItem.id))
            .then(res=>{
                setSubscriptions(prevState=>prevState.filter(i=>i.id!==selectedItem.id))
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res?.data?.message
                    }
                })
            })
            .catch(err=>{
                const errMsg = !!err?.response ? err?.response?.data.error : err.toString();
                console.log('error', errMsg)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    }

    return (
        <>
            {Boolean(subscriptions) ? <Card elevation={0}>
                    <CardHeader title={"Course subscriptions"}/>
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <Hidden mdDown={true}>
                                            <TableCell>Payment id</TableCell>
                                        </Hidden>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subscriptions && subscriptions.map(sub =>
                                        <TableRow key={sub?.id}>
                                            <Hidden mdDown={true}>
                                                <TableCell>{sub?.receipt}</TableCell>
                                            </Hidden>
                                            <TableCell>{sub?.course_name}</TableCell>
                                            <TableCell>{sub?.status}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={event => {
                                                    setSelectedItem(sub);
                                                    setMenuOpen(true)
                                                    setAnchorEl(event.currentTarget)
                                                }}>
                                                    <Icon>more_vert</Icon>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </CardContent>
                    <CardActions>
                        <Button color={"primary"} variant={'outlined'}>action</Button>
                    </CardActions>
                    <ContextMenu open={menuOpen}
                                 anchorEl={anchorEl}
                                 onClose={() => setMenuOpen(false)}
                                 onMenuItemClick={handleMenuItem}
                    />
                    {openConfirm && <ConfirmDialog open={openConfirm}
                                                   confirmDelete={data => deleteSub()}
                                                   onClose={() => setOpenConfirm(false)}/>}

                </Card> :
                <Typography variant={"caption"}>Select subscriber from the list and see course subscriptions</Typography>}
        </>
    )
}
export default SubscriptionDetail;
