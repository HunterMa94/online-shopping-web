import React from 'react'
import Carrousel from "../../utils/Carrousel"

export default function Featured() {
    const corrouselItems = [
        {
            img: "/images/featured/featured_home.jpg",
            lineOne: "Fender",
            lineTwo: "custom shop",
            linkTitle: "Show Now",
            linkTo: '/shop'
        },
        {
            img: "/images/featured/featured_home_2.jpg",
            lineOne: "B-Stock",
            lineTwo: "Awesome discounts",
            linkTitle: "View offers",
            linkTo: '/shop'
        },
    ]
    return (
        <div className='featured_container'>
            <Carrousel items={corrouselItems} />
        </div>
    )
}
