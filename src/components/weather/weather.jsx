import axios from 'axios';
import { useState } from 'react';

import styles from "./weather.module.css";

function Weather() {
    const [cityValue, setCityValue] = useState('');

    const [info, setInfo] = useState(null);

    const [error, setError] = useState(false);

    const [loader, setLoader] = useState(false);

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&units=metric&appid=3395b03a48f3165d07f407163b71bf16`;

    let changeCityValue = (e) => {
        setCityValue(e.target.value);
        if(error) setError(false);

        if(info && e.target.value.length === 0) {
            setInfo(null);
        }
    };

    let searchInfo = (e) => {
        e.preventDefault();
        setLoader(true);
        axios.get(apiUrl).then((resp) => {
            const data = resp.data;
            setInfo(data);
            // console.log(data);
        })
        .catch(function () {
            setError(true);
            if(info) setInfo(null);
          })
          .finally(function () {
            setLoader(false);
          });
    }
        

    return(
        <div className={styles.wrapper}>
            <h1 className={styles.head}>Weather</h1>
            <h2 className={styles.text}>Find out the weather in {cityValue ? cityValue : "your city"} </h2>
            <form>
                <input className={styles.input} type="text" placeholder="Название города" value={cityValue} onChange={changeCityValue}/>
                {error ? <p className={styles.error}>City with this name does not exist. Try again! </p> : ''}
                {cityValue ? 
                <button className={styles.button} type="submit" onClick={searchInfo}>Получить</button> 
                : ''}
            </form>
            {loader ? 
            <p className={styles.loading}>Loading...</p> 
            : ''}
            {info ? 
            <div> 
                <div className={styles.inner}>Temperature: <span>{info.main.temp}</span></div>
                <div className={styles.inner}>Feels like: <span>{info.main.feels_like}</span></div>
                <div className={styles.inner}>Humidity: <span>{info.main.humidity}</span></div>
                <div className={styles.inner}>Description: <span>{info.weather[0].description}</span></div>
            </div>
              : ''}
        </div>
    )
}

export default Weather;