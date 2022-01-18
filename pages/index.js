import axios from 'axios'
import { useReducer, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ naver, setNaver] = useState([])
  const [ search, setSearch] = useState('')
  const searchRef = useRef()

  const getKeyword = async () => {
    const res = await axios.get('api/naver')
    const data = await res.data
    //console.log(res)
    //console.log(data)
    setNaver(data)
  }

  const submitSearch = async () => {
    //console.log(search)
    const res = await axios.post('api/naver', {
      //method: 'POST',
      search,
      search,
      headers: {
        'Content-Type': 'application/json'
      }, 
    })
    const data = await res.data
    console.log(data)
  }

  return (
    <div className={styles.container}>
      <div>
      <input 
        ref={searchRef} 
        type='text' value={search} placeholder='검색어를 입력하세요' 
        onChange={(e)=>{
          return (
            setSearch(searchRef.current.value)
          )}} />
      <button onClick={submitSearch}>Submit</button>
      </div>
      <button onClick={getKeyword}>Load naver keyword</button>
      {naver.map((naver)=>{return <div key={naver.id}>{naver.keyword}{naver.count}</div>})}
    </div>
  )
}
