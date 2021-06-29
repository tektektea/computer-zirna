import React from "react";
import Header from "./Header";
import {Container} from "@material-ui/core";
import Content from "../layout/Content";
import {Route} from "react-router-dom";
import Privacy from "./Privacy";
import Toc from "./Toc";
import Login from "../Login";

const Home=props=>{
    return(
        <main>
            <Header/>
            <Container maxWidth={"lg"}>
                <Route exact path={'/privacy'} component={Privacy}/>
                <Route exact path={'/login'} component={Login}/>
                <Route exact path={'/toc'} component={Toc}/>
                <Route exact path={'/'} component={Content}/>
            </Container>
        </main>
    )
}
export default Home;
