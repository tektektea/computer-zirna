import React from "react";
import Grid from "@material-ui/core/Grid";
import {
    Checkbox, DialogContent, Divider,
    FormLabel,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    OutlinedInput,
    TextField
} from "@material-ui/core";
import {AppContext} from "../context/AppContextProvider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const SubscriptionForm=({formik,handleNext})=>{
    const [state, dispatch] = React.useContext(AppContext);

    const handleSelect = (c, check) => {
        if (check) {
            let temp = formik.values?.courses;
            temp.push(c)
            formik.setFieldValue('courses',temp)
        } else {
            let temp = formik?.values?.courses?.filter(item => item.id !== c.id);
            formik.setFieldValue('courses',temp)
        }
    }
    return(
        <Grid style={{flex:1}} spacing={2} container={true}>
            <Grid item={true} xs={12}>
                <List subheader={<Typography variant={"h6"}>Course subscription</Typography> }>
                    {state?.courses && state?.courses.map((v, i) =>
                        <ListItem key={i}
                                  divider={true}
                                  onClick={e => handleSelect(v)}>
                            <ListItemText primary={v.name}
                                          secondary={v.description}/>
                            <ListItemSecondaryAction>
                                <Checkbox defaultChecked={formik?.values?.courses?.some(item => item.id === v.id)}
                                          onChange={(event, checked) => handleSelect(v,checked)} color={"primary"}/>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </Grid>

            <Grid item={true} xs={4}>
                <FormLabel required={true}>Expiration date</FormLabel>
            </Grid>
            <Grid item={true} xs={8}>
                <OutlinedInput fullWidth={true}
                               margin={"dense"}
                               required={true}
                               type={'date'}
                               name={'expired_at'}
                               value={formik?.values?.expired_at}
                               onChange={formik.handleChange}
                               error={formik?.touched?.expired_at && formik?.errors?.expired_at}
                               helperText={formik?.touched?.expired_at && formik?.errors?.expired_at}
                />
            </Grid>
            <Grid item={true} xs={12}>
                <Divider light={true}/>
            </Grid>
            <Grid container={true} spacing={2} item={true} xs={12}>
                <Button color={"primary"} variant={"outlined"} onClick={handleNext}>Next</Button>
            </Grid>
        </Grid>
    )
}
export default SubscriptionForm;
