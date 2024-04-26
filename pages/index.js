import React from 'react'
import styles from "@/styles/homepage.module.css";
import Image from 'next/image';
import { useState,useEffect } from 'react';
import Head from 'next/head';

import CityDropdown from '/components/cityDropdown.js'; //下拉選單
import { FaTimes } from 'react-icons/fa';   //搜尋欄位的一鍵清除



export default function Home() {

  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    fetch('youbike.json')
      .then(response => response.json())
      .then(data => {
        setVideos(data);
        setFilteredVideos(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  useEffect(() => {
    const filtered = videos.filter(video =>
      video.sna.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);
  
    
    const clearInput = () => {
      setSearchTerm(''); 
    };
  
  
  const [isOpen2, setIsOpen2] = useState(true);
  
  const toggleList2 = () => {
    setIsOpen2(!isOpen2);
  };
  
  
    return (
<div>
  <Head>
    <title>YouBike微笑單車</title>
    <link rel="icon" href="/youbikeTitleLogo.ico" />
  </Head>
  
  {/* nav*/}
  <nav className={styles.nav}>
    <div className={styles.navItems}>
      <Image src="/youbike_logo.png" width={95} height={95} className={styles.navIcon}></Image>
      <a href='#' className={styles.navItem}>使用說明</a>
      <a href='#' className={styles.navItem}>收費方式</a>
      <a href='#' className={styles.navItem}>站點資訊</a>
      <a href='#' className={styles.navItem}>最新消息</a>
      <a href='#' className={styles.navItem}>活動專區</a>
    </div>
    <button className={styles.loginButton}>登入</button>
  </nav>
  {/* nav*/}
  
  
  
  {/* 搜尋與篩選*/}
  <div className={styles.srarchArea}>
    <h2 className={styles.siteTitle}>站點資訊</h2>
    <div className={styles.sitChoAndPeople}>
      <CityDropdown searchTerm={searchTerm}/>
      <input type="text" placeholder="搜尋站點" value={searchTerm} onChange={handleSearchTermChange} className={styles.typeArea}/>
      {searchTerm && ( 
      <button className={styles.clearButton} onClick={clearInput}><FaTimes /></button>   // 只有當輸入框有值時顯示清除按鈕
      )}
      <Image  className={styles.bikePeople} src="/bike_people.png" width={500} height={250}></Image>
    </div>  
  </div>
  {/* 搜尋與篩選*/}
  
  
  
  
  {/* 站點資訊清單*/}
  <div className={styles.ulOldata} >
    <div className={styles.ulDiv}>
      <button onClick={toggleList2} className={styles.openButton}>{isOpen2 ? '隱藏站點' : '展開清單'}</button>
      <ul className={styles.ulItems}>
        <li className={styles.ulCity}>縣市</li>
        <li className={styles.ulArea}>區域</li>
        <li className={styles.ulSite}>站點名稱</li>
        <li className={styles.ulBike}>可借車輛</li>
        <li className={styles.ulSpace}>可還空位</li>
      </ul>
    </div>  

    {isOpen2 && filteredVideos.map(video => (
    <div key={video.video_id}  className={styles.olDiv}>
      <ol className={styles.olItems}>
        <li>某縣市</li>
        <li>{video.sarea}</li>
        <li>{video.sna}</li>
        <li>{video.tot}</li>
        <li>{video.sbi}</li>
      </ol>
      </div>
    ))}
  </div>
  {/* 站點資訊清單*/}
</div>
    )
  }
  
