import React from "react";
import {Container, CssBaseline, Drawer, Grid, Hidden, withStyles} from "@material-ui/core";
import Header from "./Header";
import {Route} from "react-router-dom";
import Nav from "./Nav";
import Courses from "../courses/Courses";


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

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
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
                            <Route exact path={'/admin/courses'} component={Courses}/>
                            <Route exact path={'/admin/users'} component={<p>test</p>}/>
                            <Route exact path={'/admin/videos'} component={<p>test</p>}/>
                        </div>

                    </Grid>
                </Container>
            </div>
        </main>
    )
}

export default withStyles(styles)(Main)
