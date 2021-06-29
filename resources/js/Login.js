import React from "react";
import {Button, FormLabel, Grid, TextField, Typography, withStyles} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import * as yup from 'yup';
import {useFormik} from "formik";
import {ADMIN_LOGIN_API} from "./utils/ApiRoutes";
import {AppContext} from "./context/AppContextProvider";
import {LOGIN, MESSAGE} from "./utils/Action";
import {Alert} from "@material-ui/lab";

const styles = theme => ({
    title: {
        fontSize: 30,
        fontWeight: 200
    },
    subtitle: {
        fontSize: 36,
        margin: 30,
        textAlign: 'center',
        paddingRight:20
    },
    input: {
        helperText: {
            margin: 0
        }
    },
    caption: {
        marginTop: 16,
        marginBottom: 8
    },
    footerText: {
        marginTop: 50
    },
    button: {
        width: 140,
        selfAlign: 'center'
    },
    panel: {
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        minWidth:400,
        // boxShadow: '0 3px 7px 0 rgba(0,0,0,0.1)'
    }
})
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please Enter an valid Email")
        .required("Email is Required."),
    password: yup
        .string()
        .required("Password is Required.")
})


const Login = ({classes, submit}) => {
    const [state,dispatch] = React.useContext(AppContext);
    const history = useHistory();
    const {handleSubmit, handleChange, handleBlur, touched, values, errors} = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: loginSchema,

        onSubmit(values, e) {
            axios.post(ADMIN_LOGIN_API,values)
                .then(res=>{
                    dispatch({
                        type: LOGIN,
                        payload:res.data.data
                    })
                    history.push("/admin")

                })
                .catch(err=>{
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

    const handleForgotPassword = e => {
        history.push('/forgot-password');
    }

    React.useEffect(()=>{
        console.log('state ',state)
        console.log('dispatch ',dispatch)
    },[])
    return (

            <Grid style={{height:'100vh'}} container={true} justify={"center"} alignContent={"center"} alignItems={"center"}>
                <Grid className={classes.panel}  item={true} md={3} xs={12}>
                    <form style={{marginTop: 60,marginBottom:60}} onSubmit={handleSubmit}>
                        <Grid spacing={2} direction={"column"} container={true} alignItems={'center'} justify={"center"}>
                            <Grid item={true}>
                                <Typography className={classes.title} variant={"h6"}>Login to</Typography>
                            </Grid>
                            <Grid item={true}>
                                <Typography className={classes.subtitle} variant={"h3"}>Mizoram Computer Zirna </Typography>
                            </Grid>
                            <Grid container={true} direction={"column"} style={{width: 350}} spacing={2}>

                                <Grid item={true}>
                                    {Boolean(state?.message) && <Alert severity={state?.message_type}>{state?.message}</Alert>}
                                </Grid>

                                <Grid item={true}>
                                    <FormLabel>Email</FormLabel>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        name={'email'}
                                        type={"email"}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={classes.input}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        size={"small"}
                                        placeholder={'Email'}
                                        error={errors.email && touched.email}
                                        helperText={touched.email ? errors.email : ''}
                                    />
                                </Grid>
                                <Grid item={true}>
                                    <FormLabel>Password</FormLabel>
                                </Grid>
                                <Grid item={true}>
                                    <TextField
                                        name={'password'}
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        type={'password'}
                                        className={classes.input}
                                        fullWidth={true}
                                        variant={"outlined"}
                                        size={"small"}
                                        placeholder={'password'}
                                        error={errors.password && touched.password}
                                        helperText={touched.password ? errors.password : ''}
                                    />
                                </Grid>
                                <Grid container={true} justify={"flex-end"} item={true}>
                                    <Button onClick={handleForgotPassword} style={{selfAlign: "flex-end"}} variant={"text"}
                                            color={"primary"}>Forgot password</Button>
                                </Grid>
                                <Grid container={true} justify={"center"} item={true}>
                                    <Button
                                        type={"submit"}
                                        onClick={handleSubmit}
                                        disabled={submit}
                                        className={classes.button}
                                        variant={"contained"}
                                        color={"primary"}>Login</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>

    );
}

export default withStyles(styles)(Login);
