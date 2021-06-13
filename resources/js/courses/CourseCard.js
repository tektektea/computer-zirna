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

const CourseCard = ({classes, data,title,description,caption,url, handleDelete, handleEdit, onClick}) => {

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={event => onClick(data)}>
                <span className={classes.chip}>{title}</span>
                <CardMedia
                    component="img"
                    alt={data?.name}
                    height="190"
                    image={url}
                    title={title}
                />

                <CardContent>
                    <Typography style={{fontSize:18}}>{title}</Typography>
                    <Typography style={{fontSize:16}}>{description}</Typography>
                    <Typography style={{fontSize:14}}>{caption}</Typography>
                    <div style={{float:'right',marginBottom:8}}>
                        <IconButton onClick={handleEdit}><Icon>edit</Icon></IconButton>
                        <IconButton color={"secondary"} onClick={handleDelete}><Icon>delete</Icon></IconButton>
                    </div>

                </CardContent>

            </CardActionArea>

        </Card>
    )
}

export default withStyles(styles)(CourseCard);
