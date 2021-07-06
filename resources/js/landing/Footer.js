import React from "react";
import {IconButton} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const Footer = props => {
    const history = useHistory();
    return (
        <footer className={'footer'}>
            <Grid container={true} justify={'space-between'} spacing={2}>
                <span>
                <IconButton><Icon style={{color: '#f6f6f6'}}>facebook</Icon></IconButton>
                </span>
                <span>
                <Button style={{color: '#f6f6f6'}} onClick={event => history.push('/privacy')} variant={"text"}>Privacy policy</Button>
                <Button style={{color: '#f6f6f6'}} onClick={event => history.push('/toc')} variant={"text"}>Terms and condition</Button>

                </span>
            </Grid>
        </footer>

    )
}
export default Footer;
