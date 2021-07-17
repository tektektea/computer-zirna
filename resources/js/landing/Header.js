import React from "react";
import {AppBar, Container, Toolbar, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Footer from "./Footer";

const styles = (theme) => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
    },
    secondaryBar: {
        backgroundColor: theme.palette.common.white,
        minHeight: '80px',
        justifyContent: 'center',
        border: '0 none #ccc',
        borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    menuButton: {
        marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
        padding: 4,
    },
    searchBar: {
        height: 44,
        paddingLeft: 16,
        paddingRight: 16,
        width: 400,
        border: '1px solid #D5D5D5',
        borderRadius: 22,
        backgroundColor: '#FFFFFF'
    },
    loading: {
        position: 'absolute',
        top: 80,
        width: '100%',
    }

});
const Header = ({classes}) => {
    const history = useHistory();
    return (
        <AppBar variant={"elevation"}
                color={"transparent"}
                elevation={1}
                position={"sticky"}
                className={classes.secondaryBar}
        >
            <Container maxWidth={"lg"}>
                <Toolbar>
                    <Grid container={true} direction={"row"} justify={"space-between"} alignItems={"center"}>
                        <div>
                            {/*<Typography color={"primary"} variant={"button"}>Computer zirna</Typography>*/}
                            <img height={60} width={'auto'} src={'../storage/icons/city.png'}/>
                        </div>
                        <div>
                            <Button onClick={e => history.push('/')} variant={"outlined"} color={"primary"}>Get
                                start</Button>
                        </div>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default withStyles(styles)(Header);
