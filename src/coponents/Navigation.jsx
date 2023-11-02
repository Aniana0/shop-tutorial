import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

function Navigation() {
  return (
    <HeaderContainer>
      <Link to="/">
        <h1>shop</h1>
      </Link>

      <nav>
        <Link to="/products/new">
          신상품
        </Link>
        <Link to="products">
          모든 상품
        </Link>
      </nav>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  
`

export default Navigation
