import React from 'react';
import Grid from "@material-ui/core/Grid";
import {
    DialogActions,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {AppContext} from "../context/AppContextProvider";
import {useHistory, useParams} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import SelectVideo from "../videos/SelectVideo";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import {MESSAGE} from "../utils/Action";
import {CREATE_SUBJECTS_API, SHOW_SUBJECTS_API, UPDATE_SUBJECTS_API} from "../utils/ApiRoutes";
import CreateDialog from "../videos/CreateDialog";


const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    videos: Yup.array()
        .required('Videos is required')
});

const EditSubject = ({defaultValue}) => {
    const history = useHistory();
    const params = useParams();
    const [state, dispatch] = React.useContext(AppContext);
    const formik = useFormik({
        initialValues: {
            id:null,
            title: '',
            description: '',
            videos: []
        },
        validationSchema,
        onSubmit(values) {
            axios.put(UPDATE_SUBJECTS_API(values?.id), values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message: res?.data.message,
                            message_type: 'success'
                        }
                    })
                   setTimeout(()=>{
                       history.goBack();
                   },2000)
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
    })
    const [openVideo, setOpenVideo] = React.useState(false);
    const fetchData = (page = 1, filter) => {
        axios.get(SHOW_SUBJECTS_API(params.id))
            .then(res => {
                const {data} = res.data;
                formik.setValues({
                    id:data?.id,
                    title:data?.title,
                    description:data?.description,
                    videos: data?.videos
                })
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

    const handleCreateVideo=video=>{
        const videos = formik.values?.videos;
        videos.push(video);
        formik.setFieldValue('videos',videos);
    }

    const handleDelete = subject => {
        formik.setFieldValue('videos', formik.values?.videos?.filter(s => s.id != subject.id));
    }

    React.useEffect(() => {
        fetchData();
    }, [params.id])
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Edit subject</h1>
            <form onSubmit={formik.handleSubmit}>

                <div className={'my-card'}>
                    <Grid container={true} spacing={2} alignItems={"center"} justify={"space-between"}>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       required={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Title"}
                                       name={'title'}
                                       onChange={formik.handleChange}
                                       value={formik.values?.title}
                                       error={formik.touched?.title && formik.errors?.title}
                                       helperText={formik.touched?.title && formik.errors?.title}

                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Description"}
                                       name={'description'}
                                       multiline={true}
                                       rows={4}
                                       onChange={formik.handleChange}
                                       value={formik.values?.description}
                                       error={formik.touched?.description && formik.errors?.description}
                                       helperText={formik.touched?.description && formik.errors?.description}

                            />
                        </Grid>
                    </Grid>
                </div>
                <br/>
                <div className={'my-card'}>
                    <Button onClick={event => setOpenVideo(true)} variant={"outlined"} color={'primary'}>Add
                        video</Button>{"  "}
                    <Typography variant={"caption"}>Click here to add videos</Typography>
                </div>
                <br/>
                <div className={'my-card'}>
                    <List>
                        {formik.values?.videos?.map((video, i) =>
                            <ListItem divider={true} key={i}>
                                <ListItemAvatar>
                                    <ReactPlayer
                                        className='react-player'
                                        url={video?.video_url}
                                        width='80'
                                        height='60'
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={video?.title} secondary={video?.description}/>
                                <ListItemSecondaryAction>
                                    <Button onClick={event => handleDelete(video)} color={"secondary"}>Remove</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>
                </div>
                <br/>
                <div className={'my-card'}>
                    <DialogActions>
                        <Button onClick={formik.handleSubmit} variant={"contained"} color={"primary"}>Update</Button>
                        <Button onClick={formik.handleReset} variant={"outlined"} color={"secondary"}>Cancel</Button>
                    </DialogActions>
                </div>
            </form>
            {openVideo && <CreateDialog open={openVideo}
                                        createVideo={handleCreateVideo}
                                        onClose={e=>setOpenVideo(false)}/>}
        </div>
    );
}

export default EditSubject;
