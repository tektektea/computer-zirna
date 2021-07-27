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
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email()
        .required('Email is required'),
    password: Yup
        .string()
        .required("Password is Required."),
    phone_no: Yup
        .string()
        .required("Phone no is Required."),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),

});
const CreateUser = ({ create, open, onClose, ...rest}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const {handleChange, setValues, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone_no: '',
            address: '',
            password: '',
            password_confirmation: '',
        },
        validationSchema,
        onSubmit(values) {
            create(values);
            onClose();
        }
    });

    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <CardHeader style={{padding: 0}} title={"New user"}
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
                                       placeholder={""}
                                       required={true}
                                       name={'name'}
                                       onChange={handleChange}
                                       error={touched?.name && errors?.name}
                                       helperText={touched?.name ? errors?.name:''}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Email"}
                                       placeholder={""}
                                       required={true}
                                       name={'email'}
                                       onChange={handleChange}
                                       error={touched?.email && errors?.email}
                                       helperText={touched?.email && errors?.email}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Phone"}
                                       placeholder={""}
                                       required={true}
                                       name={'phone_no'}
                                       onChange={handleChange}
                                       error={touched?.phone_no && errors?.phone_no}
                                       helperText={touched?.phone_no ? errors?.phone_no:''}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       type={'password'}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Password"}
                                       placeholder={""}
                                       required={true}
                                       name={'password'}
                                       onChange={handleChange}
                                       error={touched?.password && errors?.password}
                                       helperText={touched?.password ? errors?.password:''}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       type={'password'}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Password confirmation"}
                                       placeholder={""}
                                       required={true}
                                       name={'password_confirmation'}
                                       onChange={handleChange}
                                       error={touched?.password_confirmation && errors?.password_confirmation}
                                       helperText={touched?.password_confirmation ? errors?.password_confirmation:''}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Father's name"}
                                       placeholder={""}
                                       required={true}
                                       name={'father_name'}
                                       onChange={handleChange}
                                       error={touched?.father_name && errors?.father_name}
                                       helperText={touched?.father_name ? errors?.father_name:''}
                            />
                        </Grid>

                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       multiline={true}
                                       rows={4}
                                       label={"Address"}
                                       placeholder={"Address"}
                                       name={'address'}
                                       onChange={handleChange}
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

export default CreateUser;
