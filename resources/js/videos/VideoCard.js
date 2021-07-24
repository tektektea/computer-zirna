import React from "react";
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from "@material-ui/core/Button";
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
        left: 10,
        marginRight:10,
        borderRadius: 4,
        backgroundColor: 'rgba(0,0,0,0.25)',
        padding: 4,
        color: '#fff'
    },

})

const VideoCard = ({classes, video, handleDelete, handleEdit, onClick}) => {

    return (
        <Card className={classes.root}>
                <ReactPlayer
                    className='react-player'
                    url={`https://www.youtube.com/watch?v=${video?.video_url}`}
                    width='120'
                    height='120'
                    config={{
                        youtube: {
                            playerVars: { showinfo: 1 }
                        }
                    }}
                />

                <CardContent>
                    <Typography style={{fontSize:18}}>{video?.title}</Typography>
                    <Typography style={{fontSize:12}}>{video?.description}</Typography>
                    <div style={{float:'right',marginBottom:8}}>
                        <Button color={"primary"} onClick={e=>handleEdit(video)}>edit</Button>
                        <Button color={"secondary"} onClick={e=>handleDelete(video)}>delete</Button>
                    </div>

                </CardContent>

        </Card>
    )
}

export default withStyles(styles)(VideoCard);
