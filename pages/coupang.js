import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../styles/Home.module.css'

export default function Coupang({coupangData1, coupangData2, coupangData3, coupangData4}) {
  const start1 = coupangData1.indexOf("[")
  const end1 = coupangData1.indexOf("]", start1)
  const item1 = coupangData1.substring(start1+1, end1-1)  
  const list1 = item1.split("},")
  const lists1 = list1.map((a)=>{return a.concat("}")})
  const lists1End = lists1.slice(0, 10)
  //console.log(lists1End)

  const start2 = coupangData2.indexOf("[")
  const end2 = coupangData2.indexOf("]", start2)
  const item2 = coupangData2.substring(start2+1, end2-1)  
  const list2 = item2.split("},")
  const lists2 = list2.map((a)=>{return a.concat("}")})
  const lists2End = lists2.slice(0, 10)
  //console.log(lists2End)

  const start3 = coupangData3.indexOf("[")
  const end3 = coupangData3.indexOf("]", start3)
  const item3 = coupangData3.substring(start3+1, end3-1)  
  const list3 = item3.split("},")
  const lists3 = list3.map((a)=>{return a.concat("}")})
  const lists3End = lists3.slice(0, 10)
  //console.log(lists3End)

  const start4 = coupangData4.indexOf("[")
  const end4 = coupangData4.indexOf("]", start4)
  const item4 = coupangData4.substring(start4+1, end4-1)  
  const list4 = item4.split("},")
  const lists4 = list4.map((a)=>{return a.concat("}")})
  const lists4End = lists4.slice(0, 10)
  //console.log(lists4End)

  const listsFinal = [...lists1End, ...lists2End, ...lists3End, ...lists4End]
  //console.log(listsFinal[0])

  const shuffledListsFinal = listsFinal
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  
  const final = shuffledListsFinal.map((a)=>{return JSON.parse(a)})
  console.log(final)

  return (
    <div className={styles.container}>
      <div className={styles.title}>인기쇼핑 TOP10</div>
      <div className={styles.list}>
        <div className={styles.left}>
        {
          final.slice(0,5).map((item, i)=>{ 
            return (
              <a href={item.landingUrl} key={i} target="_blank" rel="noreferrer">
                <div className={styles.news}>
                  <img className={styles.img} width={70} height={70} alt="news" src={`https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/${item.imagePath}`} />
                  <div className={styles.order}>
                    <span className={styles.number}>인기 {i+1}위</span>
                    <span className={styles.text}>{item.name}</span>
                    <div className={styles.rate}>할인률 {item.discountRate}%</div>
                  </div>
                </div>
              </a>
          )})
        }
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {  
  const [coupangRes1, coupangRes2, coupangRes3, coupangRes4 ] = await Promise.all([
    axios('https://ads-partners.coupang.com/widgets.html?id=548595&template=carousel&trackingCode=AF6264577&subId=&width=680&height=70'),
    axios('https://ads-partners.coupang.com/widgets.html?id=546675&template=carousel&trackingCode=AF6264577&subId=&width=680&height=70'),
    axios('https://ads-partners.coupang.com/widgets.html?id=548626&template=carousel&trackingCode=AF6264577&subId=&width=680&height=70'),
    axios('https://ads-partners.coupang.com/widgets.html?id=548627&template=carousel&trackingCode=AF6264577&subId=&width=680&height=70'),
  ])
  const [coupangData1, coupangData2, coupangData3, coupangData4] = await Promise.all([
    coupangRes1.data,
    coupangRes2.data,
    coupangRes3.data,
    coupangRes4.data,
  ])

  return { props: { coupangData1, coupangData2, coupangData3, coupangData4 } };
}