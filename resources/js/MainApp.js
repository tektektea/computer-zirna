import React from 'react';
import ReactDOM from 'react-dom';
import {CircularProgress, Grid, MuiThemeProvider} from "@material-ui/core";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import theme from "./theme";
import {AppContextProvider} from "./context/AppContextProvider";
import './index.css';
import {BASE_URL} from "./utils/ApiRoutes";
import AdminRoute from "./context/AdminRoutes";

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = BASE_URL;

const token = localStorage.getItem('token');

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Authorization'] = `Bearer ${token}`;
axios.interceptors.response.use((response) => {
    console.log("response resolver ", response)
    if (response?.status === 401) {
        localStorage.removeItem('token');
    }
    return response;
}, (error) => {

    if (error?.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.replace('/')
    }

    return Promise.reject(error);
});
axios.interceptors.request.use(
    function (successfulReq) {
        return successfulReq;
    },
    function (error) {
        return Promise.reject(error);
    }
);
const Main = React.lazy(() => import('./layout/Main'));
const Home = React.lazy(() => import('./landing/Home'));

function MainApp() {
    return (
        <AppContextProvider>
            <MuiThemeProvider theme={theme}>

                <BrowserRouter>
                    <React.Suspense fallback={
                        <Grid style={{flex: 1}} container={true}>
                            <Grid item={true}>
                                <CircularProgress color={"primary"} variant={"indeterminate"}/>
                            </Grid>
                        </Grid>
                    }>
                        <Switch>
                            <AdminRoute path={'/admin'} component={Main}/>
                            <Route path={'/'} component={Home}/>
                        </Switch>

                    </React.Suspense>

                </BrowserRouter>
            </MuiThemeProvider>
        </AppContextProvider>

    );
}

export default MainApp;

ReactDOM.render(<MainApp/>, document.getElementById('app'));
