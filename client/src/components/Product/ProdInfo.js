import React, { useState } from 'react'
import { WavesButton } from 'utils/tools'
import AddToCartHandler from 'utils/AddToCartHandler';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import { useDispatch, useSelector } from 'react-redux';
import { userAddToCart } from "store/actions/user.actions";




export default function ProdInfo(props) {
    const detail = props.detail;

    const user = useSelector(state => state.users)
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [errorType, setErrorType] = useState(null);

    const handleClose = () => {
        setModal(false)
    }

    const handleAddToCart = (item) => {
        if (!user.auth) {
            setModal(true);
            setErrorType("auth");
            return false;
        }

        if (!user.data.verified) {
            setModal(true);
            setErrorType("verify")
            return false;
        }
        dispatch(userAddToCart(item))
    }

    const showProdTags = (detail) => (
        <div className='product_tags'>
            <div className='tag'>
                <div><LocalShippingIcon /></div>
                <div className='tag_text'>{detail.shipping
                    ? <div>Free shipping for AU location</div>
                    : <div>Not free shipping for AU location</div>}</div>
            </div>

            {detail.available > 0
                ?
                <div className='tag'>
                    <div><DoneOutlineIcon /></div>
                    <div className='tag_text'>
                        <div><strong>{detail.available}</strong> product/s in store available</div>
                    </div>
                </div>
                :
                <div className='tag'>
                    <div><SentimentVeryDissatisfiedIcon /></div>
                    <div className='tag_text'>
                        <div>Sorry, product not Available at the moment</div>
                    </div>
                </div>}
        </div>
    )

    const showProdActions = (detail) => (
        <div className='product_actions'>
            <div className="price">${detail.price}</div>
            <div className='cart'>
                <WavesButton
                    type="add_to_cart_link"
                    runAction={() => handleAddToCart(detail)}
                />
            </div>
        </div>
    )

    const showProdSpecs = (detail) => (
        <div className='product_specifications'>
            <h2>Specs:</h2>
            <div>
                <div className='item'>
                    <strong>Frets:</strong> {detail.frets}
                </div>
                <div className='item'>
                    <strong>Wood:</strong> {detail.woodtype}
                </div>
            </div>
        </div>
    )
    return (
        <div >
            <h1>{detail.brand.name}</h1>
            <p>
                {detail.description}
            </p>
            {showProdTags(detail)}
            {showProdActions(detail)}
            {showProdSpecs(detail)}
            <AddToCartHandler
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />
        </div>
    )
}
