import React from 'react'
import { getCategory } from '../api/firebase'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components';
import { useQuery } from '@tanstack/react-query'

export default function CategoryList() {
  const {data : categories} = useQuery(['categories'], getCategory);
  const setCategory = new Set();
  //  특정한 값을 배열로 출력해줄 때 중복요소를 걸러줌
  if(categories){
    categories.forEach(category => {
      setCategory.add(category.category);
      // add는 배열에 추가하는 매서드
    });
  }
  const setCategoryArray = [...setCategory];

  return (
    <CategoryItemList>
      {setCategoryArray && setCategoryArray.map((category, index)=>(
        <CategoryItem key={index}>
          <Link to={`products/${category}`}>
            {category} 
          </Link>
        </CategoryItem>
      ))}
    </CategoryItemList>
  )
}

const CategoryItemList = styled.ul`
  display: flex;
  gap: 12px;
`

const CategoryItem = styled.li`
  display: flex;
`
