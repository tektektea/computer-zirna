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

    phone_no: Yup
        .string()
        .required("Phone no is Required."),


});
const UpdateAppUser = ({ update,model, open, onClose, ...rest}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const {handleChange, setValues, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            name: model?.name,
            email: model?.email,
            phone_no: model?.phone_no,
            address: model?.address,
        },
        validationSchema,
        onSubmit(values) {
            console.log(values)
            update(values);
            onClose();
        }
    });
    React.useEffect(()=>{
        setValues({
            name: model?.name,
            email: model?.email,
            phone_no: model?.phone_no,
            address: model?.address,
        })
    },[model])

    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <CardHeader style={{padding: 0}} title={"Edit user"}
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
                                       value={values?.name}
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
                                       name={'email'}
                                       value={values?.email}
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
                                       value={values?.phone_no}
                                       onChange={handleChange}
                                       error={touched?.phone_no && errors?.phone_no}
                                       helperText={touched?.phone_no ? errors?.phone_no:''}
                            />
                        </Grid>

                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Father's name"}
                                       placeholder={""}
                                       name={'father_name'}
                                       value={values?.father_name}
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
                                       value={values?.address}
                                       onChange={handleChange}
                            />
                        </Grid>


                    </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleSubmit} variant={"contained"} color={"primary"}>Update</Button>
                <Button onClick={onClose} variant={"outlined"} color={"secondary"}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateAppUser;
