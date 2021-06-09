import React from 'react';
import ReactDOM from 'react-dom';
import {MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter, Route,Switch} from "react-router-dom";
import theme from "./theme";
import Main from "./layout/Main";
import Login from "./Login";
import {AppContextProvider} from "./context/AppContextProvider";
import './index.css';

function MainApp() {
    return (
        <AppContextProvider>
            <MuiThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path={'/admin'} component={Main}/>
                        <Route path={'/'} component={Login}/>
                    </Switch>
                </BrowserRouter>
            </MuiThemeProvider>
        </AppContextProvider>

    );
}

export default MainApp;

ReactDOM.render(<MainApp/>, document.getElementById('app'));
