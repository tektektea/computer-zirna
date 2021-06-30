import React from "react";
import Button from "@material-ui/core/Button";
import {Grid} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import axios from "axios";
import {DELETE_IMAGES_API, FETCH_IMAGES_API, UPLOAD_IMAGES_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import {AppContext} from "../context/AppContextProvider";
import UploadImageDialog from "./UploadImageDialog";

const Images = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [images, setImages] = React.useState({});
    const [open, setOpen] = React.useState(false);

    const fetchImages = (page = 1, search) => {
        // load(true)
        axios.get(FETCH_IMAGES_API, {params: {page, search}})
            .then(res => {
                setImages(res.data.data)
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message_type: 'error',
                        message: errMsg
                    }
                })
            })
    }
    const handlePagination = (event, page) => {
        setImages(prevState => ({...prevState, page}))
    }
    const uploadImages = (images) => {
        let formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append(`images[${i}]`, images[i])
        }
        axios.post(UPLOAD_IMAGES_API, formData)
            .then(res => {
                setOpen(false)
                setImages(res.data.data)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res?.data.message,
                        message_type: 'success'
                    }
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: errMsg,
                        message_type: 'error'
                    }
                })
            })
    }
    const deleteImage = image => {
        axios.delete(DELETE_IMAGES_API(image?.id))
            .then(res => {
                setImages(res.data.data)
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: res?.data.message,
                        message_type: 'success'
                    }
                })
            })
            .catch(err => {
                const errMsg = !!err.response ? err.response.data.error : err.toString();
                dispatch({
                    type: MESSAGE,
                    payload: {
                        message: errMsg,
                        message_type: 'error'
                    }
                })
            })
    }
    const copy = value => {
        navigator.clipboard.writeText(value?.url).then(function () {
            dispatch({
                type: MESSAGE,
                payload: {
                    message: "url copied",
                    message_type: 'success'
                }
            })
        }, function (err) {
            console.log(err)
        });
    }
    React.useEffect(() => {
        fetchImages(1);
    }, [])
    return (
        <div className={'maincontent'}>
            <h1 className={'title'}>Media</h1>
            <div className={'my-card'}>
                <Button onClick={event => setOpen(true)} color={'primary'} variant={"outlined"}>Upload</Button>
            </div>
            <Grid style={{flex: 1}} container={true} spacing={2}>
                {Boolean(images?.data)
                    ?
                    images?.data.map((image, i) => <Grid key={i} item={true} xs={12} md={3}>
                        <div className={'my-card'}>
                            <img src={image?.url} width={"100%"} height={"auto"}/>
                            <span>
                                 <Button color={"primary"} onClick={e => copy(image)}>Copy</Button>
                                <Button color={"secondary"} onClick={e => deleteImage(image)}>delete</Button>
                           </span>

                        </div>
                    </Grid>)
                    :
                    <p>Not found application</p>
                }
                <Grid xs={12} item={true}>
                    <Pagination count={Math.floor(images?.total / images?.per_page)} onChange={handlePagination}/>
                </Grid>
            </Grid>


            {open &&
            <UploadImageDialog uploadImages={uploadImages} open={open} onClose={() => setOpen(!open)}/>}

        </div>
    )
}
export default Images;
