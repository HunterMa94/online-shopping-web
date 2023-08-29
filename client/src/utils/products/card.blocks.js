import React from 'react'
import Card from './card'

export default function CardBlock({ items, title, shop, grid }) {
    const renderCard = () => {
        if (items) {
            return (
                items.map((item, index) => (
                    <Card
                        key={index}
                        item={item}
                        grid={grid}
                    />
                ))
            )
        } else return null
    }
    return (
        <div className={shop ? "card_block_shop" : "card_block"}>
            <div className={shop ? "" : "container"}>
                {
                    title ?
                        <div className='title'>{title}</div>
                        : null
                }
                <div style={{
                    display: "flex",
                    flexWrap: "wrap"
                }}>{renderCard()}</div>
            </div>
        </div>
    )
}
