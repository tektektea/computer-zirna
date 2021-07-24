import React from "react";
import Button from "@material-ui/core/Button";
import {
    FormControl,
    FormControlLabel,
    Grid,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    OutlinedInput, Radio,
    RadioGroup
} from "@material-ui/core";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import {
    CREATE_MATERIAL_API,
    DELETE_MATERIAL_API,
    DOWNLOAD_MATERIAL_API,
    FETCH_MATERIAL_API,
    UPDATE_MATERIAL_API,
} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {Pagination} from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import CreateMaterial from "./CreateMaterial";
import {Form} from "formik";

const Materials = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [materials, setMaterials] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [filter, setFilter] = React.useState('');
    const [confirm, setConfirm] = React.useState(false);

    const handleDelete = (id) => {
        axios.delete(DELETE_MATERIAL_API(id))
            .then(res => {
                setMaterials(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res.data.message
                    }
                })
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

    const handleCreate = values => {
        let formData = new FormData();
        formData.append('title', values?.title);
        formData.append('description', values?.description);
        formData.append('file', values?.file);
        formData.append('category', values?.category);
        axios.post(CREATE_MATERIAL_API, formData)
            .then(res => {
                setMaterials(res.data.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'success',
                        message: res.data.message
                    }
                })
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

    React.useEffect(() => {
        fetchMaterials(1);
    }, [])

    const handleSearch = e => {
        if (e.which === 13) {
            fetchMaterials(1, e.target.value);
        }
    }

    const handleDownload=item=>{
        axios.get(DOWNLOAD_MATERIAL_API(item?.id), {
            responseType: 'arraybuffer'
        })
            .then(response => {
                let blob = new Blob([response.data], {type: item.mime})
                let href = window.URL.createObjectURL(blob)
                let a = window.document.createElement('a');
                a.href = href;
                a.target = '_blank';
                a.click();
            }).catch(err => {
            dispatch({
                type: MESSAGE,
                payload: {
                    message_type: 'error',
                    message: "Oops Something wrong"
                }
            })
            }
        )
    }
    const fetchMaterials = (page = 1, search) => {
        // load(true)
        axios.get(FETCH_MATERIAL_API, {params: {page, search}})
            .then(res => {
                setMaterials(res.data.data)
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    }
    const handlePagination = (event, page) => {
        setMaterials(prevState => ({...prevState, page}))
    };
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Materials</h1>
            <Grid container={true} direction={"row"} spacing={2}>
                <Grid item={true} xs={12}>
                    <div className={'my-card'}>
                        <Grid container justify={'space-between'}>
                            <Button onClick={event => setOpen(true)}
                                    color={"primary"}
                                    variant={"outlined"}>New material</Button>
                            {/*<OutlinedInput onKeyPress={handleSearch}*/}
                            {/*               margin={"dense"}*/}
                            {/*               placeholder={"Search"}/>*/}
                            <RadioGroup aria-label="category"
                                        name="category"
                                        row={true}
                                        value={filter}
                                        onChange={((event, value) => {
                                            setFilter(value)
                                            fetchMaterials(1,value)
                                        })}>
                                <FormControlLabel value="" control={<Radio color={"primary"}/>} label="All"/>
                                <FormControlLabel value="study material" control={<Radio color={"primary"}/>} label="Study material"/>
                                <FormControlLabel value="practical assignment" control={<Radio color={"primary"}/>} label="Practical Assignment"/>

                            </RadioGroup>

                        </Grid>


                    </div>
                </Grid>
                <Grid item={true} className={'my-card'}>
                    <List>
                        {Boolean(materials?.data)
                            ?
                            materials?.data.map((item, i) => <ListItem divider={true} key={i}>
                                <ListItemText primary={item?.title} secondary={item?.description}/>
                                <ListItemSecondaryAction>
                                    <IconButton onClick={event => handleDownload(item)}
                                                color={"primary"}><Icon>cloud_download</Icon></IconButton>
                                    <IconButton onClick={event => handleDelete(item.id)}
                                                color={"secondary"}><Icon>delete</Icon></IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>)
                            :
                            <p>Not found materials</p>
                        }
                    </List>
                </Grid>


                <Grid xs={12} item={true}>
                    <Pagination count={Math.ceil(materials?.total / materials?.per_page)} onChange={handlePagination}/>
                </Grid>

                {open && <CreateMaterial open={open}
                                         onClose={() => setOpen(false)}
                                         create={handleCreate}/>}
            </Grid>
        </div>
    )
}
export default Materials;
