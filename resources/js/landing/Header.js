import React from "react";
import {AppBar, Container, Toolbar} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

const Header=props=>{
    return(
        <AppBar variant={"outlined"}
                color={"primary"}
                position={"sticky"}
        >
            <Container maxWidth={"lg"}>
                <Toolbar>
                    <Grid container={true} direction={"row"} justify={"space-between"} alignItems={"center"}>
                        <div>
                            <Icon>home</Icon>
                        </div>
                        <div>
                            <Button variant={"text"} color={"inherit"}>Services</Button>
                            <Button variant={"text"} color={"inherit"}>About</Button>
                            <Button variant={"text"} color={"inherit"}>Contact</Button>
                        </div>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Header;
