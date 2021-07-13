import React from 'react';
import './App.css';
import './sun.svg';
import './rain.svg';
import './cloudy.svg';
import './cloud.svg';
import './storm.svg';

const url = 'https://api.openweathermap.org/data/2.5/weather?id=542420&lang=ru&appid=f244a34161f4e475edb307cbc293b72c';

class App extends React.Component {
  state = {
    celsius: true,
    error: false
  }

  componentDidMount = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      this.setState({
        sity: data.name,
        description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1).toLowerCase(),
        wind: data.wind.speed,
        deg: data.wind.deg,
        wet: data.main.humidity,
        rain: data.clouds.all,
        icon: data.weather[0].id,
        temp: (Math.round(data.main.temp/10)),
        press: data.main.pressure
      });
      }).catch(error => {
          this.setState({
            error: true,
            textError: 'Данные недоступны.'
          })
        });
  }

  render() {
    let direction = this.state.deg;
    let iconImg = this.state.icon;

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

    getWindDirection();
    getIconImg();

    return (
      <div className="App">
        <header>
          <div>
            <h1 className="title">{this.state.sity}</h1>
            <span className="sityLink">Сменить город</span>
            <span className="locationLink">Мое местоположение</span>
          </div>
          <div className="buttonGroup">°
            <button className="buttonActive">C</button>
            <button>F</button>
          </div>
          </header>
          <section>
            <img className="icon" src={iconImg} alt="icon"/>
            <h1 className="temp">{this.state.temp}°</h1>
            <p className="description">{this.state.description}</p>
            <div className="bottom">
              <div className="bottomItem">Ветер
                <p>{this.state.wind} м/с{direction}</p>
              </div>
              <div className="bottomItem">Давление
                <p>{this.state.press} мм рт. ст.</p>
              </div>
              <div className="bottomItem">Влажность
                <p>{this.state.wet}%</p>
              </div>
              <div className="bottomItem">Вероятность дождя
                <p>{this.state.rain}%</p>
              </div>
            </div>
          </section>
        </div>
      );

      // const button1 = document.querySelectorAll('button')[0];
      // const button2 = document.querySelectorAll('button')[1];
      //
      // document.querySelector('.buttonGroup').onclick = () => {
      //   console.log(1);
      //   if (!this.state.celsius) {
      //     button1.classList.add('buttonActive');
      //     button2.classList.remove('buttonActive');
      //     this.setState({
      //       celsius: true
      //     });
      //   } else {
      //     button2.classList.add('buttonActive');
      //     button1.classList.remove('buttonActive');
      //     this.setState({
      //       celsius: false
      //     });
      //   }
      // }
    }
  }

export default App;
