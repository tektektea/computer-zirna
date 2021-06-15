import React from "react";
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from "@material-ui/core/Button";
import {CardActions} from "@material-ui/core";
import ReactPlayer from "react-player";


const styles = theme => ({

    root: {
        border: '1px solid #E0E7F4',
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 10px 12px 0 rgba(0,0,0,0.1)'
    },
    chip: {
        position: 'absolute',
        top: 16,
        left: 20,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.25)',
        padding: 4,
        color: '#fff'
    },
    unpaid: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#D23030',
        padding: 16,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 27
    },
    paid: {
        display: 'flex',
        width: '100%',
        backgroundColor: theme.palette.success.main,
        padding: 16,
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: 27
    }

})

const CourseCard = ({classes, course, handleDelete, handleEdit, onClick}) => {

    return (
        <Card className={classes.root}>
            <span className={classes.chip}>{new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
            }).format(course?.price)}</span>
            <ReactPlayer
                className='react-player'
                url={course?.intro_url}
                width='120'
                height='120'
            />

            <CardContent>
                <Typography style={{fontSize: 16}}>{new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR'
                }).format(course?.price)}</Typography>
                <Typography style={{fontSize: 14}}>{course?.name}</Typography>
                <Typography style={{fontSize: 12}}>{course?.description}</Typography>
            </CardContent>

            <CardActions style={{padding:4}}>
                    <Button onClick={handleEdit}>edit</Button>
                    <Button color={"secondary"} onClick={handleDelete}>delete</Button>
            </CardActions>

        </Card>
    )
}

export default withStyles(styles)(CourseCard);
