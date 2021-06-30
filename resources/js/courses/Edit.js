import React from "react";
import * as Yup from "yup";
import {useFormik} from "formik";
import {CREATE_COURSE_API, SHOW_COURSE_API, UDPATE_COURSE_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {AppContext} from "../context/AppContextProvider";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {Alert} from "@material-ui/lab";
import {
    DialogActions,
    Divider,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText, Tab, Tabs,
    TextField
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SelectVideo from "../videos/SelectVideo";
import {useHistory, useParams} from "react-router-dom";
import SelectMaterial from "../materials/SelectMaterial";
import VideoList from "./VideoList";
import MaterialList from "./MaterialList";

const validationSchema = Yup.object().shape({
    id: Yup.number().required('iD is reuqired'),
    name: Yup.string()
        .required('Name is required'),
    price: Yup.number()
        .required('Price is required'),
    intro_url: Yup.string()
        .required('Video url is required'),
    videos: Yup.array()
        .required('Videos is required')
});

const Edit = ({props}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [open, setOpen] = React.useState(false);
    const [materialOpen, setMaterialOpen] = React.useState(false);
    const [activeTab, setActiveTab] = React.useState('videos');

    const {id} = useParams();
    const history = useHistory();

    const {handleChange,setValues, setFieldValue, errors, handleReset, values, touched, handleSubmit} = useFormik({
        initialValues: {
            id:null,
            name: '',
            description: '',
            price: 0,
            intro_url: '',
            thumbnail_url: '',
            videos: [],
            materials: [],
        },
        validationSchema,
        onSubmit(values, e) {
            const {videos,materials} = values;
            values['videos'] = videos.map(v => v.id);
            values['materials'] = materials.map(v => v.id);
            axios.put(UDPATE_COURSE_API(values.id), values)
                .then(res => {
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: res.data.message
                        }
                    })
                    history.go(-1);
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

    const handleSelectVideos = v => {
        setOpen(false)
        setFieldValue('videos', v);
    }
    const handleSelectMaterials = v => {
        setMaterialOpen(false)
        setFieldValue('materials', v);
    }

    React.useEffect(()=>{
        axios.get(SHOW_COURSE_API(id))
            .then(res => {
                const {data} = res.data
                setValues({
                    id:data.id,
                    name:data.name,
                    description: data.description,
                    price: data.price,
                    intro_url: data.intro_url,
                    thumbnail_url: data.thumbnail_url,
                    videos: data?.videos,
                    materials: data?.materials,
                })
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
            });
    },[])

    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Edit Course</h1>
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
                                       value={values?.name}
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
                                       value={values?.description}
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
                                       value={values?.intro_url}
                                       onChange={handleChange}
                                       error={touched?.intro_url && errors?.intro_url}
                                       helperText={touched?.intro_url && errors?.intro_url}

                            />
                        </Grid>
                        <Grid item={true} xs={12}>
                            <TextField fullWidth={true}
                                       variant={"outlined"}
                                       margin={"dense"}
                                       label={"Thumbnail url"}
                                       name={'thumbnail_url'}
                                       onChange={handleChange}
                                       error={touched?.thumbnail_url && errors?.thumbnail_url}
                                       helperText={touched?.thumbnail_url && errors?.thumbnail_url}

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
                                       value={values?.price}
                                       onChange={handleChange}
                                       error={touched?.price && errors?.price}
                                       helperText={touched?.price && errors?.price}

                            />
                        </Grid>

                    </Grid>
                </div>
                <div className={'my-card'}>
                    <span><Button onClick={event => setOpen(true)} variant={"contained"}
                                  color={"primary"}>Add videos</Button> Click here to add video content</span>
                </div>
                <div className={'my-card'}>
                    <p className={'subtitle'}>Course contents</p>
                    <Divider style={{marginTop:16,marginBottom:16}} light={true}/>
                    <Grid container={true} justify={"space-between"}>
                        <Button onClick={event => setOpen(true)} variant={"outlined"} color={"primary"}>Add
                            videos</Button>
                        <Button onClick={event => setMaterialOpen(true)} variant={"outlined"} color={"primary"}>Add
                            materials</Button>
                    </Grid>
                </div>
                <div className={'my-card'}>
                    <Tabs value={activeTab} onChange={(e,value)=>setActiveTab(value)} aria-label="content">
                        <Tab value={'videos'} label="Videos"/>
                        <Tab value={'materials'} label="Materials"/>
                    </Tabs>
                    {activeTab === 'videos' && <VideoList videos={values.videos}
                                                          remove={index=>setFieldValue('videos',values.videos.filter((val,i)=>i!==index))}/>}
                    {activeTab === 'materials' && <MaterialList materials={values.materials}
                                                                remove={index=>setFieldValue('materials',values.materials.filter((val,i)=>i!==index))}/>}

                </div>
                <div className={'my-card'}>
                    <DialogActions>
                        <Button onClick={handleSubmit} variant={"contained"} color={"primary"}>Update</Button>
                        <Button onClick={handleReset} variant={"outlined"} color={"secondary"}>Cancel</Button>
                    </DialogActions>
                </div>
            </form>
            {open && <SelectVideo open={open}
                                  onClose={() => setOpen(false)}
                                  defaultVideos={values?.videos}
                                  onSelects={handleSelectVideos}/>}

            {materialOpen && <SelectMaterial open={materialOpen}
                                             onClose={() => setMaterialOpen(false)}
                                             defaultVideos={values?.materials}
                                             onSelects={handleSelectMaterials}/>}
        </div>
    )
}
export default Edit;
