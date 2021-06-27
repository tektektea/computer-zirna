import React from "react";
import Button from "@material-ui/core/Button";
import {Grid, OutlinedInput} from "@material-ui/core";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import {CREATE_VIDEO_API, DELETE_VIDEO_API, FETCH_VIDEO_API, UPDATE_VIDEO_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {Pagination} from "@material-ui/lab";
import ConfirmDialog from "../components/ConfirmDialog";

const Materials = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [videos, setVideos] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    const handleDelete = (id) => {
        axios.delete(DELETE_VIDEO_API(id))
            .then(res => {
                setVideos(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res.data.message
                    }
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
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

    const handleUpdate = values => {
        axios.put(UPDATE_VIDEO_API(values.id), values)
            .then(res => {
                setVideos(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res.data.message
                    }
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
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
    const handleCreate = values => {
        axios.post(CREATE_VIDEO_API, values)
            .then(res => {
                setVideos(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res.data.message
                    }
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
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

    React.useEffect(() => {
        fetchUsers(1);
    }, [])

    const handleSearch = e => {
    }

    const fetchUsers = (page = 1, search) => {
        // load(true)
        axios.get(FETCH_VIDEO_API, {params: {page, search}})
            .then(res => {
                setVideos(res.data.data)
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    }
    const handlePagination = (event, page) => {
        setVideos(prevState => ({...prevState, page}))
    };
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Videos</h1>
            <Grid container={true} direction={"row"} spacing={2}>
                <Grid item={true} xs={12}>
                    <div className={'my-card'}>
                        <Grid container justify={'space-between'}>
                            <Button onClick={event => setOpen(true)}
                                    color={"primary"}
                                    variant={"contained"}>New video</Button>
                            <OutlinedInput onKeyPress={handleSearch} margin={"dense"}
                                           placeholder={"Search"}/>

                        </Grid>


                    </div>
                </Grid>
                {Boolean(videos?.data)
                    ?
                    videos?.data.map((item, i) => <Grid key={i} item={true} xs={12} md={3}>

                    </Grid>)
                    :
                    <p>Not found application</p>
                }
                <Grid xs={12} item={true}>
                    <Pagination count={Math.floor(videos?.total / videos?.per_page)} onChange={handlePagination}/>
                </Grid>

                {confirm && <ConfirmDialog open={confirm}
                                           onClose={() => setConfirm(false)}
                                           data={selected}
                                           confirmDelete={handleDelete}/>}
            </Grid>
        </div>
    )
}
export default Materials;
