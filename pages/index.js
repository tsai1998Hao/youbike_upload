import React from 'react'
import styles from "@/styles/homepage.module.css";
import Image from 'next/image';
import { useState,useEffect } from 'react';

// import CityDropdown from '/components/cityDropdown.js';

//站點列表滾輪
import { FixedSizeList } from 'react-window';
//站點列表滾輪


import { FaTimes } from 'react-icons/fa'; //搜尋欄位的一鍵清除icon
import { FaMagnifyingGlass } from "react-icons/fa6"; //搜尋欄位的搜尋icon


export default function Answer5() {

//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  const[butSearch, setButSearch]=useState('');

  const[showWrong, setShowWrong]=useState(false);



  useEffect(() => {
    fetch('https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json')
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


  const buttomSearchTermChangeTwo = (e)=>{
    setButSearch(e.target.value)
  }


const [filtered, setFiltered]=useState('');


  const buttomSearchTermChange = (e) => {
    // console.log(butSearch);  
    const filtered= videos.filter(video =>
      video.sna.toLowerCase().includes(butSearch)
    );
    setFilteredVideos(filtered);
    setShowWrong(filtered.length === 0);   
  };




//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染//文字搜尋渲染




//搜尋欄位的一鍵清除
  const clearInput = () => {
    setButSearch(''); //要用到前面的設定!!
  };
//搜尋欄位的一鍵清除




// 站點資料詳細清單收合
const [isOpen2, setIsOpen2] = useState(true);
const toggleList2 = () => {
  setIsOpen2(!isOpen2);
};
// 站點資料詳細清單收合






return (
<div>
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
      {/*<CityDropdown searchTerm={searchTerm}/> */}
      <input type="text" placeholder="搜尋站點" value={butSearch} onChange={buttomSearchTermChangeTwo} className={styles.typeArea}/>
      {/*搜索輸入框 */}

      {butSearch && (<button className={styles.clearButton} onClick={clearInput}><FaTimes /></button>)}
      {/*一鍵清除按鈕 */}

      <button className={styles.searchBut} onClick={buttomSearchTermChange}><FaMagnifyingGlass /></button> 
      {/*搜索送出*/}
    </div>
    
  </div>
{/* 搜尋與篩選*/}




{/* 站點資訊清單*/}
  <div className={styles.ulOldata} >
    <div className={styles.ulDiv}>
{/* 展開、關閉清單 */}
      <button onClick={toggleList2} className={styles.openButton}>{isOpen2 ? '隱藏站點' : '展開清單'}</button>
{/* 展開、關閉清單 */}
      <ul className={styles.ulItems}>
        <li className={styles.ulCity}>縣市</li>
        <li className={styles.ulArea}>區域</li>
        <li className={styles.ulSite}>站點名稱</li>
        <li className={styles.ulBike}>可借車輛</li>
        <li className={styles.ulSpace}>可還空位</li>
      </ul>
    </div>

    {showWrong ? <div className={styles.showNo}>查無此筆資料</div> : (isOpen2 &&( <FixedSizeList className={styles.oldivList}
      height={300} // 列表可見區域的高度
      itemSize={50} // 每個項目的高度
      itemCount={filteredVideos.length} // 項目的總數
    >
      {({ index, style }) => (
        <div key={filteredVideos[index].video_id} style={style} className={styles.olDiv}>
          <ol className={styles.olItems}>
            <li className={styles.olCity}>台北市</li>
            <li className={styles.olArea}>{filteredVideos[index].sarea}</li>
            <li className={styles.olSite}>{filteredVideos[index].sna.replace(/YouBike2.0_/, '')}</li>
            <li className={styles.olBike}>{filteredVideos[index].available_rent_bikes}</li>
            <li className={styles.olSpace}>{filteredVideos[index].available_return_bikes}</li>
          </ol>
        </div>
      )}
    </FixedSizeList>))}
  </div>
{/* 站點資訊清單*/}

</div>
  )
}
