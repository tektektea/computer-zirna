import React from "react";
import {Grid} from "@material-ui/core";
import CreateDialog from "./CreateDialog";
import CourseCard from "./CourseCard";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {DELETE_COURSE_API, FETCH_COURSE_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {useHistory} from "react-router-dom";
import ConfirmDialog from "../components/ConfirmDialog";

const Courses = (props) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [courses, setCourses] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [confirm, setConfirm] = React.useState(false);
    const history = useHistory();

    const handleEdit = (id) => history.push(`/admin/courses/${id}/edit`)

    React.useEffect(() => {
        axios.get(FETCH_COURSE_API)
            .then(res => {
                setCourses(res?.data?.data);
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
    }, [])

    const handleNew = e => {
        history.push('/admin/courses/create')
    }

    const handleClick=id=>{
        history.push(`/admin/courses/${id}/edit`)
    }
    const handleDelete=id=>{
        axios.delete(DELETE_COURSE_API(id))
            .then(res => {
                setCourses(res?.data?.data);
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
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Courses</h1>
            <div className={'my-card'}>
                <Button onClick={handleNew} variant={"contained"} color={"primary"}>New course</Button>
            </div>
            <br/>
            <Grid container={true} direction={"row"} spacing={2}>
                {Boolean(courses)
                    ?
                    courses.map((item, i) => <Grid key={i} item={true} xs={12} md={4}>
                        <CourseCard onClick={() => handleClick(item.id)}
                                    course={item}
                                    handleEdit={e=>handleEdit(item?.id)}
                                    handleDelete={e=>{
                                        setSelected(item?.id)
                                        setConfirm(true)
                                    }}
                        />
                    </Grid>)
                    :
                    <p>Not found data</p>
                }

            </Grid>

            {confirm && <ConfirmDialog open={confirm}
                                       onClose={()=>setConfirm(false)}
                                       data={selected}
                                       confirmDelete={handleDelete}/>}
        </div>
    )
}

export default (Courses);
