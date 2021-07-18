import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    container:{
        border: '1px solid rgba(0, 0, 0, 0.25)',
        borderRadius:16,
        padding:16,

    },
    title: {
        fontSize: 16,
        fontWeight: 500
    },

    caption: {
        fontFamily: '#333',
        fontWeight: 300,
        fontSize: 14,
        color:theme.palette.primary.main
    }
})
const InfoTile = ({classes, title, caption,onClick, children}) => {
    return (
        <Grid className={classes.container} container={true} direction={"column"}>
            <Grid item={true}>
                <p className={classes.title}>{title}</p>
            </Grid>
            <Grid item={true}>
                {children}
            </Grid>
            <Grid  item={true}>
                <p onClick={onClick} className={classes.caption}>{caption}</p>
            </Grid>
        </Grid>
    )
}
export default withStyles(styles)(InfoTile);
