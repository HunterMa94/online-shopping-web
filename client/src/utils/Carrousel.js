import React from 'react'
import Slider from "react-slick"
import { WavesButton } from './tools';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carrousel(props) {
    const settings = {
        dot: false,
        Infinity: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    }

    const generateSliders = () => {
        if (props.items) {
            return (
                props.items.map((item, index) => (
                    <div key={index}>
                        <div className='featured_image'
                            style={{
                                background: `url(${item.img})`,
                                height: `${window.innerHeight}px`
                            }}
                        >
                            <div className='featured_action'>
                                <div className='tag title'>{item.lineOne}</div>
                                <div className='tag title'>{item.lineTwo}</div>
                                <div>
                                    <WavesButton
                                        type="default"
                                        title={item.linkTitle}
                                        linkTo={item.linkTo}
                                        style={{
                                            margin: "10px 0 0 0"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )
        } else {
            return null
        }
    }


    return (
        <Slider {...settings}>
            {generateSliders()}
        </Slider>
    )
}
