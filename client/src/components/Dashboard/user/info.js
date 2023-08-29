import React from 'react';
import DashboardLayout from 'hoc/DashboardLayout';
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorHelper } from 'utils/tools';
import EmailStepper from './Stepper';

import { useDispatch } from "react-redux"
import { userUpdateProfile } from "../../../store/actions/user.actions"

import { Button, TextField } from "@mui/material";



export default function Info({ users }) {
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstname: users.data.firstname,
            lastname: users.data.lastname,
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .min(2, '3 char min')
                .max(30, '30 char max')
                .required('Sorry, you need the firstname'),
            lastname: Yup.string()
                .min(2, '3 char min')
                .max(30, '30 char max')
                .required('Sorry, you need the lastname'),
        }),
        onSubmit: (values) => {
            // console.log(values);
            dispatch(userUpdateProfile(values))
        }
    });


    return (
        <DashboardLayout title="User information">
            <form
                className="mt-3 article_form"
                style={{ maxWidth: '250px' }}
                onSubmit={formik.handleSubmit}
            >
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="firstname"
                        id="outlined-required"
                        label="Enter your firstname"
                        {...formik.getFieldProps('firstname')}
                        {...errorHelper(formik, 'firstname')}
                    />
                </div>
                <div className="form-group">
                    <TextField
                        style={{ width: '100%' }}
                        name="lastname"
                        id="outlined-required"
                        label="Enter your lastname"
                        {...formik.getFieldProps('lastname')}
                        {...errorHelper(formik, 'lastname')}
                    />
                </div>
                <Button
                    className='mb-3'
                    variant='contained'
                    color='primary'
                    type="submit"
                >
                    Edit profle
                </Button>

            </form>
            <hr />
            <div>
                <EmailStepper users={users} />
            </div>
        </DashboardLayout>
    )
}
