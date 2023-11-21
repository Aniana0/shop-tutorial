import React, { useState } from 'react'
import { joinEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

export default function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [psError, setPsError] = useState('');
  const navigate = useNavigate();

  const signUpEvent = async (e)=>{
    e.preventDefault();

    if(password.length < 6){
      setPsError("비밀번호는 6글자 이상이어야 합니다");
      return
    }

    try{
      const user = await joinEmail(email, password);
      navigate('/login');
    }catch(err){
      console.error(err);
    }
  }
  return (
    <div className='container'>
      <h2>회원가입</h2>
      <form onSubmit={signUpEvent}>
        <div>
          <input type="email"
            placeholder='이메일'
            value={email}
            onChange={e=>{setEmail(e.target.value)}}
          />
          <input type="password"
            placeholder='비밀번호'
            value={password}
            onChange={e=>{
              setPassword(e.target.value);
            }}
          />
          {psError && <span>{psError}</span>}
        </div>

        <button type="submit">가입하기</button>
      </form>
    </div>
  )
}
