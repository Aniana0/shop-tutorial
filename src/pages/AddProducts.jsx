import React, { useState } from 'react'
import { styled } from 'styled-components'
import { addProducts } from '../api/firebase';
import { uploadImg } from '../api/imgUpload';

export default function AddProducts() {
  const [product, setProduct] = useState({
    title : '',
    price : '',
    option : '',
    category : ''
  }); // 상품의 상태를 초기화
  const [file, setFile] = useState(null); // 업로드 파일 초기화
  const [isLoading, setIsLoading] = useState(false); // 업로드 상태 초기화
  const [success, setSuccess] = useState(null); // 업로드 완료시 완료 상태 체크

  // onchange는 매개변수 e를 꼭 넣어줘야 타겟 정보를 얻을 수 있음
  const onChange = (e)=>{
    // files는 템플릿이라 있어야함
    const {name, value, files} = e.target;

    if(name === 'file' && files && files[0]){
      setFile(files[0]);
    }else{
      setProduct((prevProduct)=>({...prevProduct, [name] : value}))
    }
  }

  const onSubmit = async(e)=>{
    // 리액트에서는 꼭 이걸 써야 기본 이벤트 방지됨, 이거 밖에 없음
    e.preventDefault();
    setIsLoading(true);

    try{
      const url = await uploadImg(file);
      await addProducts(product, url); // 파이어베이스 데이터 연동 스크립트 실행
      setSuccess('업로드가 완료되었습니다.');
    }catch(err){
      console.error(err);
      setSuccess('업로드 실패');
    }
  }
  return (
    <div className="container">
      <FormContainer>
        {/* submit을 눌렀을 때 */}
        <form onSubmit={onSubmit}>
          {/* 이미지 업로드 */}
          <input type="file" name="file" accept="image/*" onChange={onChange} />
          {/* 제목 */}
          <input type="text" name="title" placeholder='제목을 입력하세요' value={product.title} onChange={onChange} />
          {/* 가격 설정 */}
          <input type="text" name="price" placeholder='상품 가격' value={product.price} onChange={onChange} />
          {/* 카테고리 설정 */}
          <input type="text" name="category" placeholder='상품 분류' value={product.category} onChange={onChange} />
          {/* 상품 옵션 */}
          <input type="text" name="option" placeholder='선택 옵션' value={product.option} onChange={onChange} />

          <button disabled={isLoading}>
            {isLoading ? '업로드 중' : '등록하기'}
          </button>
        </form>
      </FormContainer>
    </div>
  )
}
const FormContainer = styled.div`
  
`;