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

const Subscriptions = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [users, setUsers] = React.useState({});

    const handleEdit = user => {

    }
    const handleDelete = user => {

    }
    const handlePagination = (event, page) => {
        setUsers(prevState => ({...prevState, page}))
    };
    const fetchUser = (page = 1) => {
        axios.get(FETCH_SUBSCRIPTION_API)
            .then(res => setUsers(res.data.data))
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
        fetchUser(1);
    }, [])
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Subscriptions</h1>
            <Grid container={true} spacing={2}>
                <Grid className={'my-card'} item={true} xs={12}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Boolean(users?.data) && users?.data.map((user, index) => <TableRow key={index}>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.phone_no}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.created_at}</TableCell>
                                <TableCell>
                                    <IconButton onClick={e => handleEdit(user)}
                                                color={"primary"}><Icon>edit</Icon></IconButton>
                                    <IconButton onClick={e => handleDelete(user)}
                                                color={"secondary"}><Icon>delete</Icon></IconButton>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid xs={12} item={true}>
                    <Pagination count={Math.floor(users?.total / users?.per_page)} onChange={(handlePagination)}/>
                </Grid>
            </Grid>

        </div>
    )
}
export default Subscriptions;
