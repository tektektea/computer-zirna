import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Dropzone from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const UploadImageDialog = ({open, onClose, uploadImages}) => {
    const [images, setImages] = React.useState([]);

    const handleUpload = files => {
        setImages(prevState => prevState.concat(files))
    }

    const removeItem = i => {
        let temp = images
        delete temp[i];
        setImages(prevState => temp);
    }

    return (
        <Dialog fullWidth={true} maxWidth={"md"} open={open} onClose={onClose}>
            <DialogTitle>
                Upload image
            </DialogTitle>
            <DialogContent>
                <Grid container={true} spacing={2}>
                    <Grid item={true} xs={12}>
                        <Dropzone onDrop={handleUpload} accept={'image/*'}>
                            {({getRootProps, getInputProps}) => (
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    height: 200,
                                    background: '#f4f4f4'
                                }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                </div>
                            )}
                        </Dropzone>
                    </Grid>
                    <Grid container={true} spacing={2} item={true} xs={12}>
                        {Boolean(images) ? images.map((image, index) =>
                                <div style={{position:'relative'}} key={index}>
                                    <IconButton color={"secondary"}
                                                style={{position:'absolute',top:0,right:0}}
                                                onClick={event => removeItem(index)}>
                                        <Icon>close</Icon>
                                    </IconButton>
                                    <img src={URL.createObjectURL(image)} width={100} height={100}/>
                                </div>) :
                            <div style={{background: '#f4f4f4', width: 100, height: 100}}/>}
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button onClick={event => uploadImages(images)}
                        color={"primary"}
                        variant={'contained'}>
                    Upload
                </Button>
                <Button onClick={event => {
                    setImages([]);
                    onClose()
                }} color={"secondary"} variant={'outlined'}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UploadImageDialog;
