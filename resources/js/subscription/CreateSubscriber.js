import React from "react";
import {Dialog, DialogContent, DialogTitle, Step, StepLabel, Stepper} from "@material-ui/core";
import {AppContext} from "../context/AppContextProvider";
import * as Yup from "yup";
import {useFormik} from "formik";
import SubscriptionForm from "./SubscriptionForm";
import PersonalForm from "./PersonalForm";
import {CREATE_COURSE_API, CREATE_SUBSCRIBER_API} from "../utils/ApiRoutes";
import {MESSAGE} from "../utils/Action";
import SubmittedResult from "./SubmittedResult";

const steps = [
    {id: 1, label: 'Course subscription'},
    {id: 2, label: 'Personal info'},
    {id: 3, label: 'Finish'},
]
const validationSchema = Yup.object().shape({
    courses: Yup.array()
        .required('Courses is required'),
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string().email()
        .required('Email is required'),
    dob: Yup.string()
        .required('dob is required'),
    phone_no: Yup.string()
        .required('Phone no is required'),
    expired_date: Yup.string()
        .required('Expiration date is required'),
    expired_time: Yup.string()
        .required('Expiration time is required')

});

const CreateSubscriber = ({open, onClose, onSelects}) => {
    const [state, dispatch] = React.useContext(AppContext);
    const [activeStep, setActiveStep] = React.useState(0);
    const formik = useFormik({
        initialValues: {
            courses: [],
            name: '',
            father_name: '',
            email: '',
            dob: '',
            address: '',
            phone_no: undefined,
            expired_date: new Date().toDateString(),
            expired_time: '12:00:00'
        },
        validationSchema,
        onSubmit(values, e) {
            let temp = values;
            temp['courses'] = values?.courses?.map(item => item.id);
            axios.post(CREATE_SUBSCRIBER_API,temp)
                .then(res=>{
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'success',
                            message: res.data.message
                        }
                    })
                    setActiveStep(activeStep+1)
                })
                .catch(err=>{
                    const errMsg = !!err.response ? err.response.data.error : err.toString();
                    console.log('error', errMsg)
                    dispatch({
                        type: MESSAGE,
                        payload: {
                            message_type: 'error',
                            message: errMsg
                        }
                    })
                })
        }
    });

    return (
        <Dialog classes={{container:{backgroundColor:'red'}}}
                open={open}
                onClose={onClose}
                fullWidth={true}
                maxWidth={"sm"}>
            <DialogTitle>
                <p className={'title'}>Create subscriber</p>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((item) => (
                        <Step key={item.id}>
                            <StepLabel>{item.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </DialogTitle>
            <DialogContent style={{height:'80%'}}>

                {activeStep === 0 && <SubscriptionForm formik={formik}
                                                       handleNext={() => setActiveStep(activeStep + 1)}/>}
                {activeStep === 1 && <PersonalForm formik={formik}
                                                   handleBack={() => setActiveStep(activeStep - 1)}
                                                   handleNext={() => setActiveStep(activeStep + 1)}/>}
                {activeStep===2 && <SubmittedResult reset={()=>setActiveStep(0)}
                                                    onClose={onClose}/> }
            </DialogContent>

        </Dialog>
    )
}
export default CreateSubscriber;
