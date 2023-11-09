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
      setProduct({
        title : '',
        price : '',
        option : '',
        category : '',
        description: ''
      });
      setFile(null);
    }catch(err){
      console.error(err);
      setSuccess('업로드 실패');
    }finally{
      setIsLoading(false);
    }
    setTimeout(() => {
      setSuccess(null)
    }, 3000);
  }
  return (
    <div className="container">
      <FormContainer>
        {success && <p className="resultText">{success}</p>}
        <div className="container1">
          <div className="imgWrap">
            {file && (
              <img src={URL.createObjectURL(file)} alt={product.title} />
            )}
          </div>

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
            {/* 설명 */}
            <input type="text" name="description" placeholder='제품 설명' value={product.description} onChange={onChange} />

            <button disabled={isLoading}>
              {isLoading ? '업로드 중' : '등록하기'}
            </button>
          </form>
        </div>
      </FormContainer>
    </div>
  )
}
const FormContainer = styled.div`
  max-width: 1200px;
  padding: 30px 0px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
  box-sizing: border-box;
  .resultText{
    width: 100%;
    background-color: #FFFFFF;
    text-align: center;
    padding: 20px;
    border-radius: 4px;
    color: #0c871f;
    box-sizing: border-box;
  }
  .container1{
    display: flex;
    width: 100%;
    .imgWrap{
      max-width: 500px;
      height: 500px;
      overflow: hidden;
      img{
        display: block;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      &:has(img){
        margin-right: 40px;
      }
    }
    form{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      input{
        width: 100%;
        box-sizing: border-box;
        height: 40px;
        border-radius: 4px;
        border: none;
        padding-left: 10px;
        &[type=file]{
          padding: 20px;
          background-color: #cfbb97;
          height: auto;
          cursor: pointer;
        }
      }
      button{
        margin-top: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #2fb843;
        border: none;
        color: white;
        &:hover{
          background-color: #0c871f;
          cursor: pointer;
        }
        &:disabled,
        &:disabled:hover{
          background-color: #c9c9c9;
          color: black;
          cursor: default;
        }
      }
    }
  }
`;