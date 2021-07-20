import React from "react";
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import {DialogActions, FormControl, FormControlLabel, Radio, RadioGroup, TextField} from "@material-ui/core";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {AppContext} from "../context/AppContextProvider";
import {Alert} from "@material-ui/lab";
import FormLabel from "@material-ui/core/FormLabel";

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('Title is required'),
    category: Yup.number()
        .required('Category is required'),
    file: Yup.mixed()
        .required('File is required'),
});
const CreateMaterial = ({create, open, onClose, ...rest}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const {handleChange, setFieldValue, errors, values, touched, handleSubmit} = useFormik({
        initialValues: {
            title: '',
            description: '',
            category: 1,
            file: undefined
        },
        validationSchema,
        onSubmit(values) {
            create(values);
            onClose();
        }
    });
    const handleFile = file => {
        if (file) {
            setFieldValue('file', file[0])
        }
    }
    React.useEffect(() => {
        console.log(state);
    }, [])
    return (
        <Dialog {...rest} fullWidth={true} maxWidth={"sm"} open={open} onClose={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit}>

                    <Grid container={true} spacing={1}>
                        <Grid item={true} xs={12}>
                            <CardHeader style={{padding: 0}} title={'New Material'}
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
                                       label={"Description"}
                                       rows={3}
                                       multiline={true}
                                       placeholder={""}
                                       required={true}
                                       name={'description'}
                                       onChange={handleChange}
                                       error={touched?.description && errors?.description}
                                       helperText={touched?.description && errors?.description}
                            />
                        </Grid>

                        <Grid item={true} xs={12}>
                            <FormControl fullWidth={true} component="fieldset">
                                <FormLabel component="legend">Category</FormLabel>
                                <RadioGroup aria-label="category"
                                            name="category"
                                            value={values?.category}
                                            onChange={((event, value) => {
                                                console.log(value)
                                                setFieldValue('category',value)
                                            })}>
                                    {state?.categories?.map((item) =>
                                        <FormControlLabel key={item.id}
                                                          style={{minWidth: 400}}
                                                          value={item.id}
                                                          control={<Radio color={"primary"}/>}
                                                          label={item?.name}/>
                                    )}
                                </RadioGroup>
                            </FormControl>
                            {/*<FormControl fullWidth={true}>*/}
                            {/*    <InputLabel id={'category'}>Category</InputLabel>*/}
                            {/*    <Select*/}
                            {/*        variant={"outlined"}*/}
                            {/*        margin={"dense"}*/}
                            {/*        labelId="category"*/}
                            {/*        id="category"*/}
                            {/*        value={values?.category}*/}
                            {/*        onChange={handleChange}*/}
                            {/*        multiple={true}*/}
                            {/*        input={<Input/>}*/}
                            {/*        renderValue={selected=>(*/}
                            {/*            <div>*/}
                            {/*                {selected.map((value) => (*/}
                            {/*                    <Chip key={value.id} label={value.name}/>*/}
                            {/*                ))}*/}
                            {/*            </div>*/}
                            {/*        )}*/}
                            {/*    >*/}
                            {/*        {state?.categories?.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}*/}
                            {/*    </Select>*/}
                            {/*</FormControl>*/}
                        </Grid>

                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       type={'file'}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"File"}
                                       InputLabelProps={{shrink: true}}
                                       required={true}
                                       name={'file'}
                                       onChange={event => handleFile(event.target.files)}
                                       error={touched?.file && errors?.file}
                                       helperText={touched?.file && errors?.file}
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

export default CreateMaterial;
