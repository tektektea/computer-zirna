import React from "react";
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import {DialogActions, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {AppContext} from "../context/AppContextProvider";
import {Alert} from "@material-ui/lab";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    video_url: Yup.string()
        .required('Video url is required'),
});
const CreateDialog = ({video, createVideo, open, onClose, ...rest}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const {handleChange, setValues, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            title: video?.name,
            description: video?.description,
            video_url: video?.video_url
        },
        validationSchema,
        onSubmit(values) {
            createVideo(values);
            onClose();
        }
    });

    React.useEffect(() => {
        setValues({...video})
    }, [video])
    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <CardHeader style={{padding: 0}} title={!!video ? "Edit video" : "New Video"}
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
