import React, { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import { useDispatch } from 'react-redux';
import Loader from 'utils/loader';
import { userVerify } from "store/actions/user.actions"
import { useNavigate } from 'react-router-dom';

export default function Verification() {
    const [search, setSearch] = useSearchParams();
    const token = search.get("t");
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log(auth);

    useEffect(() => {
        dispatch(userVerify(token))
        setLoading(false)
        navigate("/sign_in")
    }, [dispatch])

    return (
        <>
            {loading
                ?
                <Loader />
                :
                <div style={{ textAlign: "center" }}>Welcome</div>}
        </>
    )
}
