import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function PreventSignInRoute(props) {
    const users = useSelector(state => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (users.auth) {
            navigate("/dashboard");
        }
    }, [users.auth, navigate]);

    return (
        <div>
            {props.children}
        </div>
    );
}


