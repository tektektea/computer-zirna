import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Grid from "@material-ui/core/Grid";
import {FETCH_ADMIN_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";

const Contacts=props=>{
    const [contacts,setContacts]=React.useState({
        data:[]
    })

    const handleView=contact=>{

    }
    const handlePagination = (event, page) => {
        setContacts(prevState => ({...prevState, page}))
    };
    const fetchContacts=(page=1)=>{
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
        fetchContacts(1);
    },[])
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Contact requests</h1>
            <div className={'my-card'}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Requester</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Boolean(contacts?.data) && contacts?.data.map((user,index)=><TableRow key={index}>
                            <TableCell>{user?.name}</TableCell>
                            <TableCell>{user?.phone_no}</TableCell>
                            <TableCell>{user?.email}</TableCell>
                            <TableCell>{user?.message}</TableCell>
                            <TableCell>
                                <IconButton onClick={e=>handleView(user)} color={"primary"}><Icon>eye</Icon></IconButton>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Contacts;
