import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux"
import Loader from 'utils/loader'
import { useNavigate } from "react-router-dom";



export default function AuthGuard(props) {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();
    const users = useSelector(state => state.users);
    // console.log(users);

    useEffect(() => {
        if (!users.auth) {
            navigate("/sign_in")
        } else {
            setIsAuth(true)
        }
    }, [users, navigate])

    if (!isAuth) {
        return (<Loader fill={true} />)
    } else {
        return (
            <div>
                {props.children}
            </div>
        )
    }
}

