import React from "react";
import {
    Card,
    CardHeader,
    Hidden,
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
import ContextMenu from "./ContextMenu";
import ConfirmDialog from "../components/ConfirmDialog";
import {
    BLOCK_SUBSCRIPTION_API,
    DELETE_SUBSCRIPTION_API,
    RENEW_SUBSCRIPTION_API,
    UNBLOCK_SUBSCRIPTION_API
} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {AppContext} from "../context/AppContextProvider";
import RenewDialog from "./RenewDialog";

const SubscriptionDetail = ({item, refetch}) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [confirmData, setConfirmData] = React.useState({
        open: false,
        mode: 'delete',
        title: null
    });
    const [openRenew, setOpenRenew] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [subscriptions, setSubscriptions] = React.useState(item?.subscriptions);
    const [state, dispatch] = React.useContext(AppContext);

    React.useEffect(() => {
        setSubscriptions(item?.subscriptions)
    }, [item || refetch])

    const handleConfirm = mode => {
        setConfirmData(prevState => ({...prevState,open:false}))
        switch (mode) {
            case 'delete':
                deleteSub()
                break;
            case 'unblock':
                unblockSub();
                break;
            case 'block':
                blockSub()
            default:
                break;
        }
    }
    const handleMenuItem = menuItem => {
        switch (menuItem) {
            case 'renew':
                setOpenRenew(true);
                break;
            case 'block':
                axios.post(BLOCK_SUBSCRIPTION_API(selectedItem?.id))
                    .then(res => {
                        handleToast(res.data?.message, 'success');
                        !!refetch && refetch();
                    })
                    .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
                break;
            case 'unblock':
                axios.post(UNBLOCK_SUBSCRIPTION_API(selectedItem?.id))
                    .then(res => {
                        handleToast(res.data?.message, 'success');
                        !!refetch && refetch();
                    })
                    .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
                break;
            case 'delete':
                setConfirmData(prevState => ({...prevState, open: true}));
                break;
        }
    }

    const handleToast = (msg, type) => {
        dispatch({
            type: MESSAGE,
            payload: {
                message_type: type,
                message: msg
            }
        })
    }
    const blockSub = () => {
        axios.post(BLOCK_SUBSCRIPTION_API(selectedItem.id))
            .then(res => {
                handleToast(res.data.message, 'success');
                refetch();
            })
            .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
    }
    const unblockSub = () => {
        axios.post(UNBLOCK_SUBSCRIPTION_API(selectedItem.id))
            .then(res => {
                handleToast(res.data.message, 'success');
                refetch();
            })
            .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
    }
    const renewSub = dateTime => {
        axios.post(RENEW_SUBSCRIPTION_API(selectedItem.id), {expired_at: dateTime})
            .then(res => {
                handleToast(res.data.message, 'success');
            })
            .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
            .finally(()=>setOpenRenew(false))
    }
    const deleteSub = () => {
        axios.delete(DELETE_SUBSCRIPTION_API(selectedItem.id))
            .then(res => {
                setSubscriptions(prevState => prevState.filter(i => i.id !== selectedItem.id));
                handleToast(res.data.message, 'success');

            })
            .catch(err => handleToast(!!err?.response ? err?.response?.data.error : err.toString(), 'error'))
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
                                        <TableCell>Validity</TableCell>
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
                                            <TableCell>{sub?.expired_at}</TableCell>
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

                    <ContextMenu open={menuOpen}
                                 anchorEl={anchorEl}
                                 onClose={() => setMenuOpen(false)}
                                 onMenuItemClick={handleMenuItem}
                    />
                    {confirmData?.open && <ConfirmDialog open={confirmData.open}
                                                         confirmDelete={handleConfirm}
                                                         title={confirmData?.message}
                                                         mode={confirmData?.mode}
                                                         onClose={() => setConfirmData(prevState => ({
                                                             ...prevState,
                                                             open: true
                                                         }))}/>}
                    {openRenew && <RenewDialog open={openRenew}
                                               defaultDate={selectedItem?.update}
                                               onRenew={date => renewSub(date)}
                                               onClose={() => setOpenRenew(false)}/>}

                </Card> :
                <Typography variant={"caption"}>Select subscriber from the list and see course
                    subscriptions</Typography>}
        </>
    )
}
export default SubscriptionDetail;
