import React from 'react';
import {AppContext} from "../context/AppContextProvider";
import Button from "@material-ui/core/Button";
import {CardActions, Grid, List, ListItem, ListItemText} from "@material-ui/core";
import {MESSAGE} from "../utils/Action";
import CourseCard from "../courses/CourseCard";
import ConfirmDialog from "../components/ConfirmDialog";
import LinkDialog from "./LinkDialog";
import ReactPlayer from "react-player";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

const Banner=(props)=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [links, setLinks] = React.useState([]);
    const [confirm, setConfirm] = React.useState(false);
    const [selected, setSelected] = React.useState(null);
    const [openCreate, setOpenCreate] = React.useState(false);

    const handleDelete=()=>{
        axios.delete(`banner/${selected.id}`)
            .then(res=>{
                setLinks(res?.data?.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res?.data?.message
                    }
                })
            })
            .catch(err=>{
                const errMsg = !!err.response ? err.response?.data?.error : err.toString();
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
    const handleLinkAdd=link=>{
        setOpenCreate(false);
        axios.post(`banner/create`,{url:link})
            .then(res=>{
                setLinks(res?.data?.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res?.data?.message
                    }
                })
            })
            .catch(err=>{
                const errMsg = !!err.response ? err.response?.data?.error : err.toString();
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
    React.useEffect(()=>{
        axios.get('banner/all')
            .then(res=>{
                setLinks(res?.data?.data)
            })
            .catch(err=>{
                const errMsg = !!err.response ? err.response?.data?.error : err.toString();
                console.log('error', errMsg)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    },[]);
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Banner setting</h1>
            <div className={'my-card'}>
                <Button onClick={event => setOpenCreate(true)} variant={"outlined"} color={"primary"}>Add link</Button>
            </div>
            <br/>
            <div className={'my-card'}>
                <Grid container={true} direction={"row"} spacing={2}>
                    {Boolean(links)
                        ?
                        links.map((item, i) => <Grid key={i} item={true} xs={12} md={4}>

                            <Card>
                                <ReactPlayer
                                    className='react-player'
                                    url={item?.url}
                                    width='120'
                                    height='120'
                                />

                                <CardActions style={{padding:4}}>
                                    <Button color={"secondary"} onClick={e=>{
                                        setSelected(item)
                                        setConfirm(true);
                                    }}>delete</Button>
                                </CardActions>

                            </Card>
                        </Grid>)
                        :
                        <p>Not found data</p>
                    }

                </Grid>
                {openCreate && <LinkDialog onClose={()=>setOpenCreate(false)} open={openCreate} handleAdd={handleLinkAdd}/>}

                {confirm && <ConfirmDialog open={confirm}
                                           onClose={()=>setConfirm(false)}
                                           data={selected}
                                           confirmDelete={handleDelete}/>}
            </div>
        </div>
    )
}
export default Banner
