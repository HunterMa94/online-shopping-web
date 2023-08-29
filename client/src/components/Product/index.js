import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { productById } from "store/actions/products.actions"
import { clearCurrentProduct } from 'store/actions'

import Loader from 'utils/loader'
import { useParams } from "react-router-dom"

import ProdInfo from './ProdInfo'
import { renderCardImage } from 'utils/tools'

import { Modal } from "react-bootstrap";
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Product() {
    const [modal, setModal] = useState(false);
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();
    const params = useParams();

    const settings = {
        dot: false,
        Infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }

    const handleClose = () => {
        setModal(false)
    }

    const handleCarrousel = () => {
        if (products.byId.images.length > 0) {
            setModal(true);
        }
    }

    useEffect(() => {
        dispatch(productById(params.id))
    }, [dispatch, params.id])

    useEffect(() => {
        return () => {
            dispatch(clearCurrentProduct())
        }
    }, [dispatch])

    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    Product detail
                </div>
            </div>
            <div className='container'>
                {products && products.byId ?
                    <div className='product_detail_wrapper'>
                        <div className='left'>
                            <div>
                                <img
                                    alt="some alt"
                                    src={renderCardImage(products.byId.images)}
                                    onClick={() => handleCarrousel()}></img>
                            </div>
                        </div>
                        <div className='right'>
                            <ProdInfo
                                detail={products.byId}
                            />
                        </div>
                    </div>
                    : <Loader />}

                <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <Slider {...settings}>
                            {products.byId && products.byId.images ?
                                products.byId.images.map((item, index) => (
                                    <div key={index} style={{ margin: "0 auto" }}>
                                        <div className='img-block'
                                            style={{
                                                background: `url(${item}) no-repeat`
                                            }}
                                        >

                                        </div>
                                    </div>
                                ))
                                : null}
                        </Slider>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
