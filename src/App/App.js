import React from 'react';
import classnames from 'classnames';
import styles from './App.module.css';

const url = 'https://api.openweathermap.org/data/2.5/weather?id=542420&lang=ru&appid=f244a34161f4e475edb307cbc293b72c';

class App extends React.Component {
  state = {
    celsius: true,
    error: false,
    textError: 'Информация недоступна.'
  }

  componentDidMount() {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({
        sity: data.name,
        description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1).toLowerCase(),
        wind: Math.round(data.wind.speed),
        deg: data.wind.deg,
        wet: data.main.humidity,
        rain: data.clouds.all,
        icon: data.weather[0].id,
        temp: data.main.temp,
        press: data.main.pressure
      });
      }).catch(error => {
          this.setState({
            error: true
          })
        });
  }

  render() {
    let direction = this.state.deg;
    let iconImg = this.state.icon;
    let temp = this.state.temp;

    const getWindDirection = () => {
      switch (true) {
        case 337 < direction < 23:
          direction = ', северный';
        break;

        case 22 < direction < 68:
          direction = ', северо-восточный';
        break;

        case 67 < direction < 113:
          direction = ', восточный';
        break;

        case 112 < direction < 158:
          direction = ', юго-восточный';
        break;

        case 154 < direction < 203:
          direction = ', южный';
        break;

        case 202 < direction < 248:
          direction = ', юго-западный';
        break;

        case 247 < direction < 293:
          direction = ', западный';
        break;

        case 292 < direction < 338:
          direction = ', северо-западный';
        break;

        default:
          direction = ' ';
      }
    }

    const getIconImg = () => {
      switch (true) {
        case iconImg === 800:
          iconImg = './sun.svg';
        break;

        case iconImg === 801:
          iconImg = './cloudy.svg';
        break;

        case iconImg > 801:
          iconImg = './cloud.svg';
        break;

        case 300 > iconImg > 199:
          iconImg = './storm.svg';
        break;

        case 600 > iconImg > 299:
          iconImg = './rain.svg';
        break;

        default:
          iconImg = './cloud.svg';
      }
    }

    const isCelsiusTemp = () => {
      if (this.state.celsius) {
        temp = (Math.round(this.state.temp * 0.1));
      } else {
        temp = Math.round(this.state.temp * 0.18 + 32);
      }
    }

    getWindDirection();
    getIconImg();
    isCelsiusTemp();

    if (this.state.error) {
      return (<div>
        <h2 className={styles.title}>{this.state.textError}</h2>
        </div>);
      } else {
     return (
      <div className={styles.wrap}>
        <header>
          <div>
            <h1 className={styles.title}>{this.state.sity}</h1>
            <span className={styles.sityLink}>Сменить город</span>
            <span className={styles.locationLink}>Мое местоположение</span>
          </div>
          <div className={styles.buttonGroup}>°
            <button
              className={classnames({ [styles.buttonActive]: this.state.celsius })}
              onClick={() => {this.setState({ celsius: true })}}>C</button>
            <button
              className={classnames({ [styles.buttonActive]: !this.state.celsius })}
              onClick={() => {this.setState({ celsius: false })}}>F</button>
          </div>
        </header>
        <section>
          <img className={styles.icon} src={iconImg} alt='icon'/>
          <h1 className={styles.temp}>{temp}°</h1>
          <p className={styles.description}>{this.state.description}</p>
          <div className={styles.bottom}>
            <div className={styles.bottomItem}>
              <span>Ветер</span>
              <p>{this.state.wind} м/с{direction}</p>
            </div>
            <div className={styles.bottomItem}>
              <span>Давление</span>
              <p>{this.state.press} мм рт. ст.</p>
            </div>
            <div className={styles.bottomItemSlim}>
              <span>Влажность</span>
              <p>{this.state.wet}%</p>
            </div>
            <div className={styles.bottomItemSlim}>
              <span>Вероятность дождя</span>
              <p>{this.state.rain}%</p>
            </div>
          </div>
        </section>
      </div>
      );}
    }
  }

export default App;
