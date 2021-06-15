import React from 'react';
import {AppContext} from "../context/AppContextProvider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import SelectMedia from "../media/SelectMedia";
import {changeCorousel, MESSAGE} from "../utils/Action";

const Corousel=(props)=>{
    const [open, setOpen] = React.useState(false);
    const [state, dispatch] = React.useContext(AppContext);

    const handleSelects=images=>{
        let result = images?.filter(Boolean);
        changeCorousel(result, dispatch);
        setOpen(false);
    }
    return(
        <div className={'maincontent'}>
            <h1 className={'title'}>Corousel setting</h1>
            <div className={'my-card'}>
                <Button color={"primary"}
                        variant={"contained"}
                        onClick={event => setOpen(true)}>
                    Set up
                </Button>
            </div>
                {state?.corousel.length > 0 &&
                <Grid container={true} spacing={2}>
                    {state.corousel.map((c, i) => <Grid key={c} item={true} md={4}>
                       <div className={'my-card'}>
                           <img src={c} width={'100%'} height={'200'}/>
                       </div>
                    </Grid>)}
                </Grid>

                }
            {open && <SelectMedia open={open} onClose={e=>setOpen(false)} onSelects={handleSelects}/>}
        </div>
    )
}
export default Corousel
