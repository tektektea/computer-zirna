import React, {useReducer} from "react";
import {Card, FormLabel, Grid, OutlinedInput} from "@material-ui/core";
import CreateDialog from "./CreateDialog";
import CourseCard from "./CourseCard";
import {AppContext} from "../context/AppContextProvider";
import axios from "axios";
import Button from "@material-ui/core/Button";

const Courses=(props)=>{
    const [state, dispatch] = React.useContext(AppContext);
    const [courses, setCourses] = React.useState([]);
    const [selected, setSelected] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleEdit=()=>{

    }
    const handleDelete=()=>{

    }
    const handleSearch=e=>{

    }

    React.useEffect(()=>{
        console.log(state)
       axios.get('/courses')
           .then(res=>{
               setCourses(res?.data?.data);
           })
           .catch(err=>{
               const errMsg = !!err.response ? err.response.data.error : err.toString();
               console.log(err)
               // setMessage(errMsg, 'error')
           })
    },[])
     return(
         <div className={'maincontent'}>
             <h1 className={'title'}>Courses</h1>
             <div className={'my-card'}>
                 <Button variant={"contained"} color={"primary"}>New course</Button>
             </div>
             <br/>
             <div className={'my-card'}>
                 <Grid container={true} direction={"row"} spacing={2}>
                     {Boolean(courses)
                         ?
                         courses.map((item,i) => <Grid key={i} item={true} xs={12} md={3}>
                             <CourseCard onClick={()=>console.log("d")}
                                         course={item}
                                         handleEdit={handleEdit}
                                         handleDelete={handleDelete}
                             />
                         </Grid>)
                         :
                         <p>Not found application</p>
                     }

                     {selected &&
                     <CreateDialog open={open} onClose={() => setOpen(!open)}/>}
                 </Grid>
             </div>

         </div>
    )
}

export default (Courses);
