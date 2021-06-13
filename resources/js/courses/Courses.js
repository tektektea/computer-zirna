import React from "react";
import {Grid} from "@material-ui/core";
import CreateDialog from "./CreateDialog";
import CourseCard from "./CourseCard";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import Button from "@material-ui/core/Button";
import {FETCH_COURSE_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";

const Courses = (props) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [courses, setCourses] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleEdit = () => {

    }
    const handleDelete = () => {

    }

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
        setOpen(true);
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
                    courses.map((item, i) => <Grid key={i} item={true} xs={12} md={3}>
                        <CourseCard onClick={() => console.log("d")}
                                    data={item}
                                    title={item?.price}
                                    description={item?.name}
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                        />
                    </Grid>)
                    :
                    <p>Not found application</p>
                }

                {open &&
                <CreateDialog open={open} onClose={() => setOpen(!open)}/>}
            </Grid>

        </div>
    )
}

export default (Courses);
