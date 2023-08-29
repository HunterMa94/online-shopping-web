import React, { useEffect } from 'react'
import Featured from './Featured'
import SlimPromotion from '../../utils/promotions/slim.block'
import CardBlock from '../../utils/products/card.blocks'
import Loader from '../../utils/loader'

import { useDispatch, useSelector } from "react-redux"
import { productsBySort } from "../../store/actions/products.actions"

const slimPromotion = {
    img: "/images/featured/featured_home_3.jpg",
    lineOne: "Up to 40% off",
    lineTwo: "In second hand guitar",
    linkTitle: "Show Now",
    linkTo: '/shop'
}

export default function Home() {
    const dispatch = useDispatch();
    // const products = useSelector(state => state.products);
    const { bySold, byDate } = useSelector(state => state.products);
    // console.log(bySold);

    useEffect(() => {
        dispatch(productsBySort({
            limit: 4, sortBy: "itemSold", order: "desc", where: "bySold"
        }));

        dispatch(productsBySort({
            limit: 4, sortBy: "date", order: "desc", where: "byDate"
        }));
    }, [dispatch])

    return (
        <div>
            <Featured />
            {bySold
                ? <CardBlock items={bySold} title="Best selling guitars" />
                : <Loader />}
            <SlimPromotion items={slimPromotion} />
            {byDate
                ? <CardBlock items={byDate} title="Latests guitars on the shop" />
                : <Loader />}
        </div>
    )
}
