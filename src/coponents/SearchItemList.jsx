import React from 'react'
import DetailPageEvent from './DetailPageEvent'

export default function SearchItemList({products : {id, img, title, price, option, catecory, description}}) {
    return (
        <li>
            <DetailPageEvent product={{id, img, title, price, option, catecory, description}} />
        </li>
    )
}
