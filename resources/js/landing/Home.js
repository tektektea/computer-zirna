import React from "react";
import Header from "./Header";
import {Container} from "@material-ui/core";
import Content from "../layout/Content";
import {Route} from "react-router-dom";
import Privacy from "./Privacy";
import Toc from "./Toc";
import Login from "../Login";
import {AppContext} from "../context/AppContextProvider";
import {getPublicData} from "../utils/Action";

const Home=props=>{
    const [state, dispatch] = React.useContext(AppContext);
    React.useEffect(()=>{
        getPublicData(dispatch)
    },[])
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
