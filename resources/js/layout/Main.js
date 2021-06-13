import React from "react";
import {Container, CssBaseline, Drawer, Grid, Hidden, Snackbar, withStyles} from "@material-ui/core";
import Header from "./Header";
import {Route} from "react-router-dom";
import Nav from "./Nav";
import Courses from "../courses/Courses";
import {AppContext} from "../context/AppContextProvider";
import {Alert} from "@material-ui/lab";
import {getPublicData, MESSAGE} from "../utils/Action";
import Videos from "../videos/Videos";
import Images from "../media/Images";
import Users from "../users/Users";
import Subscriptions from "../subscription/Subscriptions";
import Dashboard from "../dashboard/Dashboard";
import Corousel from "../apps/Corousel";
import Banner from "../apps/Banner";


const drawerWidth = 256;

const styles = theme => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    app: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f6f6f6'
    },
});
const Main=({classes})=>{
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [state, dispatch] = React.useContext(AppContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const handleClose=e=>{
        dispatch({
            type:MESSAGE,
            payload:{
                message: '',
                message_type:''
            }
        })
    }
    React.useEffect(()=>{
       getPublicData(dispatch)
    },[])
    return(
        <main className={classes.root}>
            <CssBaseline/>
            <div className={classes.app}>
                <Drawer anchor={"left"} open={mobileOpen} onClose={handleDrawerToggle}>
                    <Nav toggleDrawer={handleDrawerToggle} mobile={mobileOpen}/>
                </Drawer>
                <Header  handleDrawer={handleDrawerToggle}/>
                <Container maxWidth={"lg"}>
                    <Grid container={true} justify={"flex-start"} direction={"row"}>
                        <Hidden smDown={true}>
                            <Nav/>
                        </Hidden>
                        <div style={{flex:1}}>
                            <Route exact path={'/admin'} component={Dashboard}/>
                            <Route exact path={'/admin/Dashboard'} component={Dashboard}/>
                            <Route exact path={'/admin/courses'} component={Courses}/>
                            <Route exact path={'/admin/videos'} component={Videos}/>
                            <Route exact path={'/admin/media'} component={Images}/>
                            <Route exact path={'/admin/users'} component={Users}/>
                            <Route exact path={'/admin/subscriptions'} component={Subscriptions}/>
                            <Route exact path={'/admin/app/corousel'} component={Corousel}/>
                            <Route exact path={'/admin/app/banner'} component={Banner}/>
                        </div>

                    </Grid>
                </Container>
            </div>
            {Boolean(state?.message) &&
                <Snackbar open={Boolean(state?.message)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={state?.message_type}>
                    {state?.message}
                </Alert>
            </Snackbar>}
        </main>
    )
}

export default withStyles(styles)(Main)
