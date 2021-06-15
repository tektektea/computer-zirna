import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {CREATE_COURSE_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {AppContext} from "../context/AppContextProvider";
import Grid from "@material-ui/core/Grid";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {Alert} from "@material-ui/lab";
import {DialogActions, List, ListItem, ListItemSecondaryAction, ListItemText, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SelectVideo from "../videos/SelectVideo";

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    price: Yup.number()
        .required('Price is required'),
    intro_url: Yup.string()
        .required('Video url is required'),
    videos: Yup.array()
        .required('Videos is required')
});

const Create = ({course}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [open, setOpen] = React.useState(false);

    const {handleChange,setFieldValue, errors, handleReset, values, touched, handleSubmit} = useFormik({
        initialValues: {
            name: course?.name,
            description: course?.description,
            price: 0,
            intro_url: course?.intro_url,
            videos:Boolean(course?.videos)?course.videos:[]
        },
        validationSchema,
        onSubmit(values,e) {
            console.log(values)
            const {videos} = values;
            const temp=videos.map(v => v.id);
            values['videos'] = temp;
            axios.post(CREATE_COURSE_API, values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: res.data.message
                        }
                    })
                    handleReset(e)
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

    const handleSelectVideos=v=>{
        setOpen(false)
        setFieldValue('videos', v);

    }
    const handleRemove=index=>{
        let temp = values.videos.splice(index, 1);
        setFieldValue('videos', temp);
    }

    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>New Course</h1>
            <form onSubmit={handleSubmit}>

                <div className={'my-card'}>
                    <Grid container={true} spacing={1}>
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
                </div>
                <div className={'my-card'}>
                    <span><Button onClick={event => setOpen(true)} variant={"contained"} color={"primary"}>Add videos</Button> Click here to add video content</span>
                </div>
                <div className={'my-card'}>
                    <List>
                        {Array.isArray(values?.videos) && values?.videos.map((v,i)=>
                            <ListItem divider={true} key={i}>
                                <ListItemText primary={v.title} secondary={v.description}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={event => handleRemove(i)} color={"secondary"}>
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )}
                    </List>

                </div>
                <div className={'my-card'}>
                    <DialogActions>
                        <Button onClick={handleSubmit} variant={"contained"} color={"primary"}>Save</Button>
                        <Button onClick={handleReset} variant={"outlined"} color={"secondary"}>Cancel</Button>
                    </DialogActions>
                </div>
            </form>
            {open && <SelectVideo open={open}
                                  onClose={()=>setOpen(false)}
                                  defaultVideos={values?.videos}
                                  onSelects={handleSelectVideos}/>  }
        </div>
    )
}
export default Create;
