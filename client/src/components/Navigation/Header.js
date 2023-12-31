import React from 'react'
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header({ users, signOutUser }) {
    return (
        <header className='bck_b_light'>
            <div className='container'>
                <div className='left'>
                    <div className='logo'>
                        ACASTLE
                    </div>
                </div>
                <div className='right'>
                    <div className='top'>
                        {users.auth
                            ? <>
                                <div className='cart_link'>
                                    <span>{users.data.cart.length}</span>
                                    <Link to="/dashboard/user/user_cart">
                                        My cart
                                    </Link>
                                </div>
                                <Link to="/dashboard">
                                    My account
                                </Link>
                                <span
                                    onClick={() => signOutUser()}
                                >Log out</span>
                            </>
                            : <>
                                <Link to="/sign_in">
                                    Log in
                                </Link>
                            </>}

                    </div>
                    <div className='bottom'>
                        <Link to="/">Home</Link>
                        <Link to="/shop">Shop</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
