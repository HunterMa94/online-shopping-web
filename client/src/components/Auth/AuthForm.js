import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from '../../utils/loader';
import { errorHelper } from "../../utils/tools"

import { useDispatch, useSelector } from "react-redux";
import { userRegister, userSignin } from "../../store/actions/user.actions"
import { Button, TextField } from "@mui/material";

export default function AuthForm(props) {
    const notifications = useSelector(state => state.notifications);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Sorry the email is required")
                .email("This is an invalid email"),
            password: Yup.string()
                .required("Sorry the password is required")
        }),
        onSubmit: (values) => {
            setLoading(true);
            handelSubmit(values)
        }

    })

    const handelSubmit = (values) => {
        if (props.formType) {
            // register
            dispatch(userRegister(values));
        } else {
            // sign in 
            dispatch(userSignin(values))
        }
    }

    useEffect(() => {
        setLoading(false);
        if (notifications && notifications.success) {
            navigate("/dashboard")
        } else {

        }
    }, [notifications, navigate])

    return (
        <div>
            <div className='auth_container'>
                {loading
                    ? <Loader />
                    : <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <div className='form-group'>
                            <TextField
                                style={{
                                    width: "100%"
                                }}
                                name="email"
                                label="Enter your email"
                                variant='outlined'
                                {...formik.getFieldProps("email")}
                                {...errorHelper(formik, "email")}
                            ></TextField>
                        </div>
                        <div className='form-group'>
                            <TextField
                                style={{
                                    width: "100%"
                                }}
                                name="password"
                                label="Enter your password"
                                variant='outlined'
                                type="password"
                                {...formik.getFieldProps("password")}
                                {...errorHelper(formik, "password")}
                            ></TextField>
                        </div>
                        <Button
                            variant='contained'
                            color="primary"
                            type='submit'
                            size="small"
                            style={{
                                backgroundColor: "#999592"
                            }}
                        >
                            {props.formType ? "Register" : "Login"}
                        </Button>
                    </form>}
            </div>
        </div>
    )
}
