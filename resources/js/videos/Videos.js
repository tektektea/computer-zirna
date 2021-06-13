import React from "react";
import Button from "@material-ui/core/Button";
import {Grid, OutlinedInput} from "@material-ui/core";
import CourseCard from "../courses/CourseCard";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import {FETCH_VIDEO_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import CreateDialog from "./CreateDialog";
import {Pagination} from "@material-ui/lab";

const Videos = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [videos, setVideos] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

    React.useEffect(() => {
        fetchUsers(1);
    }, [])

    const handleNew = e => {
        setOpen(true);
    }
    const handleSearch = e => {
    }
    const handleCardClick = e => {
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
                {Boolean(videos.data)
                    ?
                    videos.data.map((item, i) => <Grid key={i} item={true} xs={12} md={3}>
                        <CourseCard onClick={handleCardClick}
                                    title={item?.title}
                                    description={item?.description} data={item}/>
                    </Grid>)
                    :
                    <p>Not found application</p>
                }
                <Grid xs={12} item={true}>
                    <Pagination count={Math.floor(videos?.total / videos?.per_page)} onChange={handlePagination}/>
                </Grid>

                {open &&
                <CreateDialog data={document} open={open} onClose={() => setOpen(!open)}/>}
            </Grid>
        </div>
    )
}
export default Videos;
