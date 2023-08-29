import React, { useState, useEffect } from 'react'
import DashboardLayout from 'hoc/DashboardLayout';
import Loader from 'utils/loader';

import { useDispatch, useSelector } from 'react-redux';
import { getProdectsFromCart, deleteProdectsFromCart, clearCart } from "store/actions/user.actions"

import { Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';


import CartDetail from './CartDetail';

export default function Cart(props) {
    const [loading, setLoading] = useState(false);
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProdectsFromCart(props.users.data.cart))
    }, [dispatch, props.users.data.cart])


    const removeProductByID = (id) => {
        dispatch(deleteProdectsFromCart(id))
    }

    const goToShop = () => {
        navigate("/shop")
    }

    const calculateTotal = () => {
        let total = 0;
        props.users.cart.forEach(element => {
            total += parseInt(element.price, 10)
        });
        return total
    }

    const checkOut = (cart) => {

        dispatch(clearCart(cart))

    }

    return (
        <DashboardLayout title="Cart">
            {props.users.data.cart && props.users.data.cart.length > 0
                ?
                <>
                    <CartDetail
                        products={props.users.cart}
                        removeItem={(id) => removeProductByID(id)} />

                    <div className='user_cart_sum' >
                        <div className='total_amount'>
                            Total amount: ${calculateTotal()}
                        </div >
                        <div
                            className='checkout_button_container'
                            onClick={() => checkOut(props.users.data.cart)}
                        ><Button >Check out</Button></div>
                    </div>



                </>
                :
                <>
                    <div>Your cart is empty</div>
                    <Button onClick={() => goToShop()}>Go to shop</Button>
                </>
            }
        </DashboardLayout >
    )
}
