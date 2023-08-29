import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { errorHelper } from "utils/tools"

import {
    TextField
} from "@mui/material"

export default function SearchBar(props) {

    const formik = useFormik({
        initialValues: { keywords: "" },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(3, "You need to search for more than 3 char")
                .max(300, "You need to search no more than 300 char")
        }),
        onSubmit: (values, { resetForm }) => {
            props.handleKeywords(values.keywords)
            resetForm();
        }
    })
    return (
        <div className='container'>
            <form className='mt-3' onSubmit={formik.handleSubmit}>
                <div>
                    <TextField
                        style={{ width: "100%" }}
                        placeholder="Search for something"
                        name='keywords'
                        variant='outlined'
                        {...formik.getFieldProps("keywords")}
                        {...errorHelper(formik, "keywords")}
                    />
                </div>
            </form>
        </div>
    )
}
