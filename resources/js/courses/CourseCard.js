import React from "react";
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import withStyles from '@material-ui/core/styles/withStyles'
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";


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
            <CardActionArea onClick={event => onClick(course)}>
                <span className={classes.chip}>{course?.title}</span>
                <CardMedia
                    component="img"
                    alt={course?.title}
                    height="190"
                    image={course?.url}
                    title={course?.title}
                />

                <CardContent>
                    <Typography variant={"body2"}>{course?.description}</Typography>
                    <div>
                        <IconButton onClick={handleEdit}><Icon>edit</Icon></IconButton>
                        <IconButton onClick={handleDelete}><Icon>trash</Icon></IconButton>
                    </div>

                </CardContent>

            </CardActionArea>

        </Card>
    )
}

export default withStyles(styles)(CourseCard);
