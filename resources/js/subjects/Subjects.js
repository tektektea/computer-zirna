import React from 'react';
import Grid from "@material-ui/core/Grid";
import {List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {AppContext} from "../context/AppContextProvider";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import {useHistory} from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";
import axios from "axios";
import {DELETE_COURSE_API, DELETE_SUBJECT_API, FETCH_IMAGES_API, FETCH_SUBJECTS_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {Pagination} from "@material-ui/lab";

const SubjectList=props=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [selected, setSelected] = React.useState();
    const [confirm, setConfirm] = React.useState(false);
    const [subjects,setSubjects]=React.useState({
        data:[]
    })
    const history = useHistory();

    const fetchData = (page = 1, search) => {
        // load(true)
        axios.get(FETCH_SUBJECTS_API, {params: {page, search}})
            .then(res => {
                setSubjects(res.data.data)
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
    const handleEdit=subject=>{
        history.push(`/admin/subjects/${subject?.id}/edit`);
    }
    const handleDelete=subject=>{
        setSelected(subject)
        setConfirm(true);
    }
    const handleSearch=(e)=>{
        if (e.which===13) {
            fetchData(1,e.target.value)
        }
    }
    const handlePagination = (event, page) => {
        setSubjects(prevState => ({...prevState, page}))
    }
    const confirmDelete=()=>{

        axios.delete(DELETE_SUBJECT_API(selected?.id))
            .then(res => {
                setSubjects(res?.data?.data);
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res?.data?.message,
                        message_type: 'success'
                    }
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
            })
    }

    React.useEffect(()=>{
        fetchData();
    },[])
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Subjects</h1>
            <div className={'my-card'}>
                <Grid container={true} alignItems={"center"} justify={"space-between"}>
                    <Grid item={true}>
                        <Button onClick={e=>history.push('/admin/subjects/create')} variant={"outlined"} color={'primary'}>New Subject</Button>
                    </Grid>
                    <Grid item={true}>
                        <OutlinedInput onKeyPress={handleSearch} margin={"dense"}
                                       placeholder={"Search"}/>
                    </Grid>
                </Grid>
            </div>
            <br/>
            <div className={'my-card'}>
                <List>
                    {!!subjects && subjects?.data?.map(subject=>
                    <ListItem divider={true} key={subject.id}>
                        <ListItemText primary={subject?.title} secondary={subject?.description}/>
                        <ListItemSecondaryAction>
                            <span>
                                <IconButton onClick={event => handleEdit(subject)} color={"primary"}><Icon>edit</Icon></IconButton>
                                <IconButton onClick={event => handleDelete(subject)} color={"secondary"}><Icon>delete</Icon></IconButton>
                            </span>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )}
                </List>
                <div>
                    <Pagination count={Math.floor(subjects?.total / subjects?.per_page)} onChange={handlePagination}/>
                </div>
            </div>
            {confirm && <ConfirmDialog open={confirm}
                                       onClose={()=>setConfirm(false)}
                                       data={selected}
                                       confirmDelete={confirmDelete}/>}
        </div>
    );
}

export default SubjectList;
