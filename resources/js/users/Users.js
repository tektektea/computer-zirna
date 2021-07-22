import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Pagination} from "@material-ui/lab";
import {AppContext} from "../context/AppContextProvider";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {CREATE_ADMIN_API, DELETE_ADMIN_API, FETCH_ADMIN_API, FETCH_IMAGES_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import CreateUser from "./CreateUser";

const Users=props=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [users,setUsers]=React.useState({});
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleDelete=user=>{
        axios.get(DELETE_ADMIN_API(user.id))
            .then(res=>setUsers(res.data.data))
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
    }
    const handleCreate=user=>{
        axios.post(CREATE_ADMIN_API,user)
            .then(res=>setUsers(res.data.data))
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
    }
    const handlePagination = (event, page) => {
        setUsers(prevState => ({...prevState, page}))
    };
    const fetchUser=(page=1)=>{
        axios.get(FETCH_ADMIN_API)
            .then(res=>setUsers(res.data.data))
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
    }
    React.useEffect(()=>{
        fetchUser(1);
    },[])
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Admins</h1>
            <Grid container={true} spacing={2}>
                <div className={'my-card'}>
                    <Button onClick={event => setOpenCreate(true)} color={"primary"} variant={"contained"}>New admin</Button>
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
                            {Boolean(users?.data) && users?.data.map((user,index)=><TableRow key={index}>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.phone_no}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.created_at}</TableCell>
                                <TableCell>
                                    <IconButton onClick={e=>handleDelete(user)} color={"secondary"}><Icon>delete</Icon></IconButton>
                                </TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </Grid>
                <Grid xs={12} item={true}>
                    <Pagination count={Math.floor(users?.total / users?.per_page)} onChange={(handlePagination)}/>
                </Grid>
            </Grid>
            {openCreate && <CreateUser open={openCreate}
                                       create={handleCreate}
                                       onClose={e=>setOpenCreate(false)}/>}
        </div>
    )
}
export default Users;
