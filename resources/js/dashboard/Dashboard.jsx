import React from "react";
import Grid from "@material-ui/core/Grid";
import InfoTile from "../components/InfoTile";

const Dashboard=props=>{
    const [count,setCount]=React.useState({
        count_video:0,
        count_course:0,
        count_subject:0,
        count_user:0
    })
    React.useEffect(()=>{
        axios.get('dashboard')
            .then(res=>{
                const {count_video, count_course, count_subject, count_user} = res?.data?.data;
                setCount(prevState => ({...prevState,count_user,count_course,count_subject,count_video}))
            })
            .catch(err=>console.log(err))
    },[])
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Dashboard</h1>
            <div className={'my-card'}>
                <Grid container={true} spacing={4}>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile title={"No of users"} caption={"total no of users"}>
                            <div style={{fontSize:32,color:'#369'}}>{count?.count_user}</div>
                        </InfoTile>
                    </Grid>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile title={"Total course added"} caption={"total no of courses"}>
                            <div style={{fontSize:32,color:'#369'}}>{count?.count_course}</div>
                        </InfoTile>
                    </Grid>
                    <Grid item={true} md={4} xs={12}>
                        <InfoTile  title={"Total subject"} caption={"total no of subjects"}>
                            <div style={{fontSize:32,color:'#369'}}>{count?.count_subject}</div>
                        </InfoTile>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
export default Dashboard;
