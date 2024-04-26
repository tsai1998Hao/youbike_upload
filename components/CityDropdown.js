import React, { useState, useEffect } from 'react';
import styles from "@/styles/CityDropdown.module.css";


const CityDropdown = ({searchTerm}) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    fetch('taiwan_whole_area.json')
      .then(response => response.json())
      .then(data => {
        const uniqueCities = Array.from(new Set(data.map(item => item.city)));
        setCities(['選擇縣市', ...uniqueCities]);
        setSelectedCity('選擇縣市');
      });
  }, []);

  useEffect(() => {
    if (selectedCity && selectedCity !== '選擇縣市') {
      fetch('taiwan_whole_area.json')
        .then(response => response.json())
        .then(data => {
          const cityAreas = data.filter(item => item.city === selectedCity).map(item => item.district);
          setAreas(cityAreas);
        });
    }
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <select id="citySelect" value={selectedCity} onChange={handleCityChange}  className={styles.selectArea}>
        {cities.map(city => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <label  className={styles.selectAll}><input type="checkbox"/>全部勾選</label>
      {selectedCity && selectedCity !== '選擇縣市' && (
        <div className={styles.siteChooses}>
          {areas.length > 0 && areas.map(area => (
            <div key={area} className={styles.siteChooseOut} style={{ marginBottom: '15px',}}>
              <input type="checkbox" id={area} name={area} value={area} className={styles.siteChoose}/>
              <label htmlFor={area} className={styles.siteChooseLabel}>{area}</label>
            </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default CityDropdown;
