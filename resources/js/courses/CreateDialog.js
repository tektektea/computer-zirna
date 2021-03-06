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
import {CREATE_COURSE_API} from "../utils/ApiRoutes";
import {AppContext} from "../context/AppContextProvider";
import {Alert} from "@material-ui/lab";
import {MESSAGE} from "../utils/Action";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    price: Yup.number()
        .required('Price is required'),
    intro_url: Yup.string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Video url is required'),
});
const CreateDialog = ({course, open, onClose, ...rest}) => {
    const [state,dispatch] = React.useContext(AppContext);
    const {handleChange, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            name: course?.name,
            description: course?.description,
            price:0,
            video_url: course?.video_url
        },
        validationSchema,
        onSubmit(values) {
            axios.post(CREATE_COURSE_API, values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload:{
                            message_type: 'success',
                            message:res.data.message
                        }
                    })
                    onClose();
                })
                .catch(err => {
                    const errMsg = !!err.response ? err.response.data.error : err.toString();
                    console.log('error',errMsg)
                    dispatch({
                        type: MESSAGE,
                        payload:{
                            message_type: 'error',
                            message:errMsg
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
                            <CardHeader style={{padding: 0}} title={'New course'}
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
                                       label={"Name"}
                                       placeholder={"Name of the course (eg:DCA)"}
                                       required={true}
                                       name={'name'}
                                       onChange={handleChange}
                                       error={touched?.name && errors?.name}
                                       helperText={touched?.name && errors?.name}
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
                                       name={'intro_url'}
                                       onChange={handleChange}
                                       error={touched?.intro_url && errors?.intro_url}
                                       helperText={touched?.intro_url && errors?.intro_url}

                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Fee"}
                                       type={'number'}
                                       placeholder={"Course fee"}
                                       required={true}
                                       name={'price'}
                                       onChange={handleChange}
                                       error={touched?.price && errors?.price}
                                       helperText={touched?.price && errors?.price}

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
