import React, { useEffect, useState } from 'react'

export default function TopBtn() {
  const [isTopBtn, setIsTopBtn] = useState(false);
  
  const scrollEvent = ()=>{
    if(window.pageYOffset>300){
      setIsTopBtn(true);
    }else{
      setIsTopBtn(false);
    }
  }
  
  useEffect(()=>{
    window.addEventListener("scroll", scrollEvent);
    return ()=>{
      window.removeEventListener("scroll", scrollEvent)
      // 마운트 해제될때 이벤트 삭제
    }
  }, [])

  // useEffect에 이벤트 지정하는 이유:
  // 생명주기 관리에 용이 - 컴포넌트가 마운트가 되고, 마운트가 해제되는 것들을 컨트롤할 수 있다.
  // 불필요한 행동 방지
  // useEffect로 리렌더링 될때마다 새 이벤트가 추가로 발생하는거 방지
  // 성능 최적화

  const scrollTopEvent = ()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  const scrollDownEvent = ()=>{
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
  })
}

// 기준은 항상 좌측 상단
// behaivor : 이동 애니메이션(기본값은 auto 바로 이동), smooth 부드럽게

  return (
      <div style={{
        position: 'fixed',
        bottom : '50px',
        right: '50px',
        opacity : isTopBtn ? 1 : 0,
        transition: '0.5s',
        pointerEvents: isTopBtn ? 'auto' : 'none'
      }}>
        <button onClick={scrollTopEvent}>top</button>
        <button onClick={scrollDownEvent}>down</button>
      </div>
    )
}
