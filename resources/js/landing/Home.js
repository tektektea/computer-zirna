import React from "react";
import Header from "./Header";
import {AppBar, Container} from "@material-ui/core";
import Content from "../layout/Content";
import {Route} from "react-router-dom";
import Privacy from "./Privacy";
import Toc from "./Toc";
import Login from "../Login";
import {AppContext} from "../context/AppContextProvider";
import {getPublicData} from "../utils/Action";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";

const Home=props=>{
    const [state, dispatch] = React.useContext(AppContext);
    React.useEffect(()=>{
        getPublicData(dispatch)
    },[])
    return(
        <main style={{backgroundColor:'#f6f6f6'}}>
            <Header/>
            <Container maxWidth={"lg"}>
                <Route exact path={'/privacy'} component={Privacy}/>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/toc'} component={Toc}/>
                <Route exact path={'/'} component={Content}/>
            </Container>
            <Grid container={true} item={true}>
                <Footer/>
            </Grid>
        </main>
    )
}
export default Home;
