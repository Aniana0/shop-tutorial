import React from 'react'
import { styled } from 'styled-components'

export default function UserData({ user : {photoURL, displayName} }) {
  return ( 
    <UserItem>
        <img src={photoURL} alt={displayName} />
        <span className='hidden'>{displayName}</span>
    </UserItem>     
  )
}


const UserItem = styled.div`
    display: flex;
    align-items: center;
    color: #0c871f;
    img{
        width: 36px;
        border-radius: 50%;
        margin-right: 6px
    }
`