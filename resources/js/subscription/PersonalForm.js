import React from "react";
import Grid from "@material-ui/core/Grid";
import {Divider, FormLabel, OutlinedInput, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const PersonalForm=({formik,handleBack,handleNext})=>{
    return (
        <Grid container={true} spacing={2}>
            <Grid item={true} xs={4}>
                <FormLabel required={true}>Name</FormLabel>
            </Grid>
            <Grid item={true} xs={8}>
                <OutlinedInput fullWidth={true}
                               margin={"dense"}
                               required={true}
                               name={'name'}
                               value={formik?.values?.name}
                               onChange={formik.handleChange}
                               error={formik?.touched?.name && formik?.errors?.name}
                               helperText={formik?.touched?.name && formik?.errors?.name}
                />
            </Grid>

            <Grid item={true} xs={4}>
                <FormLabel required={true}>Phone no</FormLabel>
            </Grid>
            <Grid item={true} xs={8}>
                <OutlinedInput fullWidth={true}
                               margin={"dense"}
                               required={true}
                               name={'phone_no'}
                               value={formik?.values?.phone_no}
                               onChange={formik.handleChange}
                               error={formik?.touched?.phone_no && formik?.errors?.phone_no}
                               helperText={formik?.touched?.phone_no && formik?.errors?.phone_no}
                />
            </Grid>

            <Grid item={true} xs={4}>
                <FormLabel required={true}>Father's Name</FormLabel>
            </Grid>
            <Grid item={true} xs={8}>
                <OutlinedInput fullWidth={true}
                               margin={"dense"}
                               required={true}
                               name={'father_name'}
                               value={formik?.values?.father_name}
                               onChange={formik.handleChange}
                               error={formik?.touched?.father_name && formik?.errors?.father_name}
                               helperText={formik?.touched?.father_name && formik?.errors?.father_name}
                />
            </Grid>

            <Grid item={true} xs={4}>
                <FormLabel required={true}>Address</FormLabel>
            </Grid>
            <Grid item={true} xs={8}>
                <OutlinedInput fullWidth={true}
                               margin={"dense"}
                               required={true}
                               name={'address'}
                               value={formik?.values?.address}
                               onChange={formik.handleChange}
                               error={formik?.touched?.address && formik?.errors?.address}
                               helperText={formik?.touched?.address && formik?.errors?.address}
                />
            </Grid>
            <Grid item={true} xs={12}>
                <Divider light={true}/>
            </Grid>
            <Grid container={true} spacing={2} item={true} xs={12}>
                <Button color={"secondary"}  onClick={handleBack}>Back</Button>
                <Button color={"primary"} variant={"outlined"} onClick={formik.handleSubmit}>Submit</Button>
            </Grid>
        </Grid>
    );
}
export default PersonalForm;
