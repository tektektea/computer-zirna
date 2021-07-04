import React from "react";
import {
    Card,
    CardActions,
    CardHeader,
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

const SubscriptionDetail = ({item}) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

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
        console.log(menuItem)
    }
    const deleteSub=()=>{
        axios.delete(DELETE_SUBSCRIPTION_API(selectedItem.id))
            .then(res=>{
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
            {Boolean(item) ? <Card elevation={0}>
                    <CardHeader title={"Course subscriptions"}/>
                    <CardContent>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Payment id</TableCell>
                                        <TableCell>Course</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {item?.subscriptions && item?.subscriptions.map(sub =>
                                        <TableRow key={sub?.id}>
                                            <TableCell>{sub?.receipt}</TableCell>
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
                                                   confirmDelete={data => console.log(data)}
                                                   onClose={() => setOpenConfirm(false)}/>}

                </Card> :
                <Typography variant={"caption"}>Select user from the list and see course subscriptions</Typography>}
        </>
    )
}
export default SubscriptionDetail;
