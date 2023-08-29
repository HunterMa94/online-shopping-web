import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import ProductsTable from './ProductsTable';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { errorHelper } from 'utils/tools';
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

import DashboardLayout from 'hoc/DashboardLayout';
import { productsByPaginate, productRemove } from 'store/actions/products.actions';

const defaultValues = {
    keywords: "",
    brand: [],
    min: 0,
    max: 5000,
    frets: [],
    page: 1
}

export default function AdminProduct(proprs) {

    const [removeModal, setRemoveModal] = useState(false);
    const [toRemove, setToRemove] = useState(null);

    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        defaultValues
    );

    const formik = useFormik({
        initialValues: { keywords: "" },
        validationSchema: Yup.object({
            keywords: Yup.string()
                .min(2, "You nedd more than 3")
                .max(200, "Your search is too long")
        }),
        onSubmit: (values, { resetForm }) => {
            setSearchValues({ keywords: values.keywords, page: 1 });
            resetForm();
        }
    });

    const resetSearch = () => {
        setSearchValues(defaultValues)
    }

    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_product/${id}`)
    }

    const gotoPage = (page) => {
        setSearchValues({ page: page });
    }

    const handleClose = () => {
        setRemoveModal(false)
    }

    const handleModal = (id) => {
        setToRemove(id)
        setRemoveModal(true)
    }

    const handleRemove = () => {
        // alert(`id:${toRemove}`)
        dispatch(productRemove(toRemove));
    }

    useEffect(() => {
        dispatch(productsByPaginate(searchValues))
    }, [dispatch, searchValues])

    useEffect(() => {
        handleClose();
        setRemoveModal(null);
        if (notifications && notifications.removeArticle) {
            dispatch(productsByPaginate(searchValues))
        }
    }, [dispatch, notifications, searchValues])

    return (
        <DashboardLayout title="Products">
            <div className='products_table'>
                <div>
                    <form className='mt-3' onSubmit={formik.handleSubmit}>
                        <TextField
                            style={{ width: "100%" }}
                            name="keywords"
                            label="Enter your search"
                            id="outlined-required"
                            {...formik.getFieldProps("keywords")}
                            {...errorHelper(formik, "keywords")}
                        />
                    </form>
                    <Button
                        onClick={() => resetSearch()}
                    >
                        Reset search
                    </Button>

                </div>
                <ProductsTable
                    removeModal={removeModal}
                    prods={products.byPaginate}
                    prev={page => gotoPage(page)}
                    next={page => gotoPage(page)}
                    goToEdit={(id) => goToEdit(id)}
                    handleClose={() => handleClose()}
                    handleModal={(id) => handleModal(id)}
                    handleRemove={(id) => handleRemove()}
                />
            </div>
        </DashboardLayout>
    )
}
