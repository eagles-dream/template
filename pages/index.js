import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Home() {
const date = new Date()

  return (
    <div className={styles.container}>날짜
      <div>
        <span>{date.getFullYear()}년 </span>
        <span>{date.getMonth()+1}월 </span> 
        <span>{date.getDate()}일 </span> 
        <span>{date.getHours()}시 </span> 
        <span>{date.getMinutes()}분 </span> 
        <span>{date.getSeconds()}초</span>
      </div>
    </div>
  )
}
