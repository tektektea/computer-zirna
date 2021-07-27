import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Pagination} from "@material-ui/lab";
import {AppContext} from "../context/AppContextProvider";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {CREATE_APP_USER_API, DELETE_APP_USER_API, FETCH_APP_USER_API, UPDATE_APP_USER_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import CreateAppUser from "./CreateAppUser";
import ConfirmDialog from "../components/ConfirmDialog";
import UpdateAppUser from "./UpdateAppUser";

const PublicUsers = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [users, setUsers] = React.useState({});
    const [selected, setSelected] = React.useState(null);
    const [confirmData, setConfirmData] = React.useState({
        open: false,
        mode: 'delete',
        title: null
    });
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    const handleDelete = user => {
        axios.delete(DELETE_APP_USER_API(selected.id))
            .then(res => {
                setUsers(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res.data?.message,
                        message_type: 'success'
                    }
                })
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
            .finally(() => setConfirmData(prevState => ({...prevState, open: false})))
    }
    const handleUpdate = user => {
        axios.put(UPDATE_APP_USER_API(selected.id), user)
            .then(res => {
                setUsers(res.data.data)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res.data?.message,
                        message_type: 'success'
                    }
                })
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
    const handleCreate = user => {
        axios.post(CREATE_APP_USER_API, user)
            .then(res => {
                setUsers(res.data.data)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res.data?.message,
                        message_type: 'success'
                    }
                })
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
    const handlePagination = (event, page) => {
        fetchUser(page);
    };
    const fetchUser = (page = 1) => {
        axios.get(FETCH_APP_USER_API)
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
            <h1 className={'title'}>App users</h1>
            <Grid container={true} spacing={2}>
                <div className={'my-card'}>
                    <Button onClick={event => setOpenCreate(true)} color={"primary"} variant={"contained"}>New
                        user</Button>
                </div>
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
                                <TableCell>
                                    {new Intl.DateTimeFormat('en-IN', {
                                        dateStyle: 'medium',
                                        timeStyle: 'medium'
                                    }).format(new Date(user?.created_at))}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={e => {
                                        setSelected(user);
                                        setOpenEdit(true);
                                    }} color={"primary"}><Icon>edit</Icon></IconButton>

                                    <IconButton onClick={e => {
                                        setSelected(user);
                                        setConfirmData(prevState => ({...prevState, open: true}))
                                    }} color={"secondary"}><Icon>delete</Icon></IconButton>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid xs={12} item={true}>
                    <Pagination count={Math.ceil(users?.total / users?.per_page)} onChange={(handlePagination)}/>
                </Grid>
            </Grid>
            {openCreate && <CreateAppUser open={openCreate}
                                          create={handleCreate}
                                          onClose={e => setOpenCreate(false)}/>}

            {openEdit && <UpdateAppUser open={openEdit}
                                        model={selected}
                                        update={handleUpdate}
                                        onClose={e => setOpenEdit(false)}/>}
            {confirmData?.open && <ConfirmDialog open={confirmData.open}
                                                 confirmDelete={handleDelete}
                                                 title={confirmData?.message}
                                                 mode={confirmData?.mode}
                                                 onClose={() => setConfirmData(prevState => ({
                                                     ...prevState,
                                                     open: false
                                                 }))}/>}
        </div>
    )
}
export default PublicUsers;
