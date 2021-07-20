import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormLabel from "@material-ui/core/FormLabel";
import withStyles from "@material-ui/core/styles/withStyles";
import {Button, TextField} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useFormik} from "formik";
import axios from "axios";
import * as yup from "yup";
import {MESSAGE} from "../utils/Action";

const styles = theme => ({
    root: {
        padding: 24,
        flex:1
    },
    title: {
        fontSize: 24,
        fontWeight: 500,
        marginLeft: 16,
        marginBottom: 16
    },subtitle: {
        fontSize: 20,
        fontWeight: 500,
    },

    card: {
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 12px 0 rgba(0,0,0,0.1)',
        padding: 24
    }
})
const validationSchema = yup.object().shape({
    full_name: yup
        .string()
        .required('Full name is required'),
    email: yup
        .string()
        .email("Please Enter an valid Email")
        .required("Email is Required."),
    password: yup
        .string()
        .required("Password is Required."),
    phone_no: yup
        .string()
        .required("Phone no is Required."),
    password_confirmation: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})
const ProfileEdit = ({classes, setMessage, user}) => {
    const history = useHistory();
    const formik = useFormik({
        validateOnChange: false,
        validationSchema,
        onSubmit: (values, event) => {
            axios.put('profile/update',values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: res?.data?.message
                        }
                    })
                    history.go(-1);

                })
                .catch(err => {
                    const errMsg = !!err.response ? err.response.data?.error : err.toString();
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: errMsg
                        }
                    })
                })
        }
    })

    React.useEffect(() => {
        axios.get('profile/me')
            .then(res => {
                formik.setValues({
                    ...res.data.data
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data?.error : err.toString();
            })
    }, []);
    return (
        <div className={classes.root}>
            <Typography className={classes.title}>Profile</Typography>
            <div className={classes.card}>
                <Grid container={true}>
                    <Grid item={true} container={true} xs={6} spacing={2}>
                        <Grid item={true} xs={12}>
                            <Typography className={classes.subtitle}>Profile details</Typography>
                        </Grid>
                        <Grid item={true} xs={4}>
                            <FormLabel>Username</FormLabel>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <TextField
                                id="full_name"
                                fullWidth={true}
                                size={"small"}
                                variant={"outlined"}
                                name={'full_name'}
                                value={formik.values?.full_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors?.full_name && formik.touched?.full_name}
                                helperText={formik.touched?.full_name ? formik.errors?.full_name : ''}
                            />
                        </Grid>
                        <Grid item={true} xs={4}>
                            <FormLabel>Email</FormLabel>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <TextField
                                id="email"
                                fullWidth={true}
                                size={"small"}
                                variant={"outlined"}
                                name={'email'}
                                value={formik.values?.email}
                                disabled={true}
                                // onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors?.email && formik.touched?.email}
                                helperText={formik.touched?.email ? formik.errors?.email : ''}
                            />
                        </Grid>
                        <Grid item={true} xs={4}>
                            <FormLabel>Password</FormLabel>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <TextField
                                id="password"
                                type={"password"}
                                fullWidth={true}
                                size={"small"}
                                variant={"outlined"}
                                name={'password'}
                                value={formik.values?.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors?.password && formik.touched?.password}
                                helperText={formik.touched?.password ? formik.errors?.password : ''}
                            />
                        </Grid>
                        <Grid item={true} xs={4}>
                            <FormLabel>Confirm Password</FormLabel>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <TextField
                                id="password"
                                type={"password"}
                                fullWidth={true}
                                size={"small"}
                                variant={"outlined"}
                                name={'password_confirmation'}
                                value={formik.values?.password_confirmation}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors?.password_confirmation && formik.touched?.password_confirmation}
                                helperText={formik.touched?.password_confirmation ? formik.errors?.password_confirmation : ''}
                            />
                        </Grid>

                        <Grid item={true} xs={4}>
                            <FormLabel>Phone</FormLabel>
                        </Grid>
                        <Grid item={true} xs={8}>
                            <TextField
                                id="phone_no"
                                fullWidth={true}
                                size={"small"}
                                variant={"outlined"}
                                name={'phone_no'}
                                value={formik.values?.phone_no}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.errors?.phone_no && formik.touched?.phone_no}
                                helperText={formik.touched?.phone_no ? formik.errors?.phone_no : ''}
                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <Button onClick={formik.handleSubmit} color={"primary"} variant={"outlined"}>Confirm</Button>
                        </Grid>

                    </Grid>
                </Grid>


            </div>
        </div>
    )
}


export default (withStyles(styles)(ProfileEdit));
