import React, { useEffect, useState } from 'react'
import { searchProduct } from '../api/firebase';
import SearchItemList from './SearchItemList';

export default function SearchItem() {
    const [query, setQuery] = useState('');
    const [ result, setResult ] = useState([]);

    // query가 빈문자열이어도 검색 결과가 나옴
    // useEffect(()=>{
    //     if(query.trim() === ""){
    //         setResult([]);
    //     }else{
    //         searchProduct(query).then(text=>{
    //             setResult(text)
    //         }).catch(error=>console.error(error))
    //     }
    // }, [query]);

    const inputEvent = e=>{
        setQuery(e.target.value);
    }
    const searchEvent = ()=>{
        if(query.trim() === ""){
            setResult([])
        }else{
            searchProduct(query).then((text)=>{
                setResult(text);
            }).catch((err)=>{
                console.error(err);
            })
        }
    }

    return (
        <div className="container">
            <input type="text" name="" id="" value={query} onChange={inputEvent} className='searchForm' />
            <button onClick={searchEvent}>검색</button>
            <ul className='searchResultList'>
                {result && result.map(product=>(
                    <SearchItemList key={product.id} products={product} />
                ))}
            </ul>
        </div>
    )
}