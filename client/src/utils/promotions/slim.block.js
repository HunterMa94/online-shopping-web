import React from 'react'
import { WavesButton } from '../tools'

export default function SlimPromotion(props) {

    const renderPromotion = () => (
        props.items
            ? <div
                className='slim_promotion_img'
                style={{
                    background: `url(${props.items.img})`
                }}
            >
                <div className="tag title">{props.items.lineOne}</div>
                <div className="tag title">{props.items.lineTwo}</div>
                <div className='btn'>
                    <WavesButton
                        type='default'
                        title={props.items.linkTitle}
                        linkTo={props.items.linkTo}
                    />
                </div>
            </div>
            : null
    )


    return (
        <div className='slim_promotion'>
            {renderPromotion()}
        </div>
    )
}
