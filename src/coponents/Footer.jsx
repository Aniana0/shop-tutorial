import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'

export default function Footer() {
  return (
    <FooterWrapper>
      <div className="container">
        <div>
          <p className="footerText">010-1234-5678</p>
          <p className="footerText">OPEN 08:00-18:00</p>
          <p className="footerText">기업은행 : 1234-5678-91011</p>
        </div>
        <div>
          <Link to="/" className="footerText">HOME</Link>
          <Link to="/" className="footerText">ABOUT</Link>
          <Link to="/" className="footerText">SHOP</Link>
          <Link to="/" className="footerText">COMMUNITY</Link>
          <Link to="/" className="footerText">CONTACT</Link>
        </div>
        <div>
          <p className="footerText">회사 : 그냥 마켓</p>
          <p className="footerText">소유자 : 홍길동</p>
          <p className="footerText">주소 : 서울특별시 강남대로 1-1 101호</p>
          <p className="footerText">사업자 등록 번호 : 1234-56789-1011</p>
        </div>
      </div>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.div`
background-color: white;
width: 100%;
.container{
  display: flex;
  justify-content: space-between;
  div{
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
}
`