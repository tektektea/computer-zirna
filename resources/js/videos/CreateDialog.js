import React from "react";
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import {DialogActions, FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {CREATE_VIDEO_API} from "../utils/ApiRoutes";
import {AppContext} from "../context/AppContextProvider";
import {Alert} from "@material-ui/lab";
import {MESSAGE} from "../utils/Action";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    course_id: Yup.number()
        .required('Course is required'),
    video_url: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Video url is required'),
});
const CreateDialog = ({video, open, onClose, ...rest}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const {handleChange, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            title: video?.name,
            description: video?.description,
            course_id:video?.course_id,
            video_url: video?.video_url
        },
        validationSchema,
        onSubmit(values) {
            axios.post(CREATE_VIDEO_API, values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: res.data.message
                        }
                    })
                    onClose();
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
    });

    React.useEffect(() => {
        console.log(state);
    }, [])
    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <CardHeader style={{padding: 0}} title={'New video'}
                                        action={<IconButton
                                            onClick={event => onClose()}><Icon>close</Icon></IconButton>}/>
                        </Grid>
                        <Grid item={true}>
                            {Boolean(state?.message) && <Alert severity={state?.message_type}>{state?.message}</Alert>}
                        </Grid>

                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Title"}
                                       placeholder={""}
                                       required={true}
                                       name={'title'}
                                       onChange={handleChange}
                                       error={touched?.title && errors?.title}
                                       helperText={touched?.title && errors?.title}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <FormControl fullWidth={true}>
                                <InputLabel id="course">Course</InputLabel>
                                <Select
                                        fullWidth={true}
                                        variant={"outlined"}
                                        margin={"dense"}
                                        name={'course_id'}
                                        onChange={handleChange}
                                        error={touched?.course_id && errors?.course_id}
                                        helperText={touched?.course_id && errors?.course_id}>
                                    {state?.courses.map(item => <MenuItem key={item.id}
                                                                          value={item.id}>{item?.name}</MenuItem>)}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       multiline={true}
                                       rows={4}
                                       label={"Description"}
                                       placeholder={"Description of the course"}
                                       name={'description'}
                                       onChange={handleChange}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Video url"}
                                       placeholder={"https://www/youtube.com/vdfdfadf"}
                                       required={true}
                                       name={'video_url'}
                                       onChange={handleChange}
                                       error={touched?.video_url && errors?.video_url}
                                       helperText={touched?.video_url && errors?.video_url}

                            />
                        </Grid>


                    </Grid>
                </form>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit} variant={"contained"} color={"primary"}>Save</Button>
                <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateDialog;
