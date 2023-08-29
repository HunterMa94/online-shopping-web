import React, { useState } from 'react'
import { Button } from "@mui/material"
import AuthForm from './AuthForm';
import PreventSignInRoute from 'hoc/PreventSignInRoute';

export default function Auth(props) {
    const [formType, setFortType] = useState(false);

    const toogleFormType = () => {
        setFortType(!formType)
    }

    return (
        <PreventSignInRoute>
            <div className='page_wrapper'>
                <div className="container">
                    <div className='register_login_container'>
                        <div className='left'>
                            {formType
                                ? <>
                                    <h1>New customers</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </>
                                : <>
                                    <h1>Welcome back</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </>}
                            <Button
                                variant='contained'
                                // color="primary"
                                size="small"
                                onClick={() => toogleFormType()}
                                style={{
                                    backgroundColor: "#999592"
                                }}
                            >
                                {formType ? "Already registered" : "Need to register"}
                            </Button>
                        </div>
                        <div className='right'>
                            <h2>{formType ? "Register" : "Sign in"}</h2>
                            <AuthForm
                                formType={formType}
                                {...props}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PreventSignInRoute>
    )
}
