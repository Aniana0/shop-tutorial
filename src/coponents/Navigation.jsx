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
        <Link to="/products">
          모든 상품
        </Link>
      </nav>

      <div className="userWrap">
        <button className='loginBtn'>Login</button>
        <button className='logoutBtn'>Logout</button>
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display : flex;
  align-items : center;
  padding : 12px;
  gap : 24px;
  a{
    text-decoration : none;
    color: #333;
    h1{
      font-size: 30px
    }
  }
  nav{
    display: flex;
    align-items: center;
    margin-left: 50px;
    gap: 12px;
  }
  .userWrap{
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 12px;
    button{
      width: 80px;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
    }
    .loginBtn{
      background: lightblue;
    }
    .logoutBtn{
      background: lightgrey;
    }
  }
`

export default Navigation
