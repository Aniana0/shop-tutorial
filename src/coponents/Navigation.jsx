import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import { login, logout, onUserState } from '../api/firebase';
import UserData from './UserData';
import { useAuthContext } from '../context/AuthContext';
import CategoryList from './CategoryList';

function Navigation() {
  // const [user, setUser] = useState();

  // useEffect(()=>{
  //   onUserState((user)=>{
  //     setUser(user);
  //   })
  // },[])
  
  // useEffect(()=>{
  //   onUserState(setUser);
  // }, [])

  // const userLogin = ()=>{
  //   login().then(setUser);
  // };
  // const userLogout = ()=>{
  //   logout().then(setUser);
  // };
  const { user, login, logout } = useAuthContext();
  return (
    <HeaderContainer>
      <Link to="/">
        <h1>shop</h1>
      </Link>

      <nav>
        <CategoryList/>
        <Link to="/products">
          모든 상품
        </Link>
      </nav>

      <div className="userWrap">
        <Link to={'/cart'}>장바구니</Link>
        {user && user.isAdmin && (
          <Link className="addNew" to='/products/add'>
            상품등록
          </Link>
        )}
        {user && <UserData user={user}/>}
        {!user && <button className='loginBtn' onClick={login}>Login</button>}
        {user && <button className='logoutBtn' onClick={logout}>Logout</button>}
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display : flex;
  align-items : center;
  padding : 24px;
  gap : 24px;
  a{
    text-decoration : none;
    color: #0c871f;
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
      cursor: pointer;
    }
    .loginBtn{
      background: #2fb843;
      color: white;
    }
    .logoutBtn{
      background: #cfc3b6;
      color: #403d39
    }
    .logoutBtn:hover{
      background: #c0ad9b;
    }
    .loginBtn:hover{
      background: #0c871f;
    }
    .addNew{
      background: #2fb843;
      color: white;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 13.3333px;
    }
    .addNew:hover{
      background: #0c871f;
    }
  }
`

export default Navigation
