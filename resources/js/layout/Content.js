import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {AppContext} from "../context/AppContextProvider";

const Content = props => {
    const [state, dispatch] = React.useContext(AppContext);
    const [images, setImages] = React.useState([]);

    React.useEffect(()=>{
        console.log(state)
    },[])
    return (
        <Carousel autoPlay>
            {state.corousel?.map((item,key)=><div key={key}>
                <img alt={item}/>
            </div>)}
        </Carousel>
    )
}
export default Content;
