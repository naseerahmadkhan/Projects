import { Constants } from "../constants";
export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
  const yyyy = today.getFullYear();

  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentDate2 = () => {
  const today = new Date();
  const day = today.getDate();
  const year = today.getFullYear();

  // Array of month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthName = monthNames[today.getMonth()];

  return `${monthName} ${day}, ${year}`;
};

export const getPrevailingWeatherDataPakpattan = async() =>{
  try {
    const response = await fetch(Constants.API.CURRENT);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    alert(JSON.stringify(error));
  }
}

export const get1DayForecastDataPakpattan = async() =>{
  try {
    const response = await fetch(Constants.API.FORECAST);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    alert(JSON.stringify(error));
  }
}

export const getHourlyForecastDataPakpattan = async() =>{
  try {
    const response = await fetch(Constants.API.HOURLYFORECAST);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    alert(JSON.stringify(error));
  }
}

export const getLast24HoursWeaterDataPakpattan = async() =>{
 try {
    const response = await fetch(Constants.API.LAST24Hours);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    alert(JSON.stringify(error));
  }
}

export const getLast24HoursWeaterDataArifWala = async() =>{
 try {
    const response = await fetch(Constants.API.ARIFWALALAST24HOURS);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data
  } catch (error) {
    alert(JSON.stringify(error));
  }
}



export const prevailingWeatherMsg = async()=>{
  const data = await getPrevailingWeatherDataPakpattan()
  const forecast= await get1DayForecastDataPakpattan()
  const dated = getCurrentDate()
  const temp = Math.round(data[0].Temperature.Metric.Value)
  const humidity = data[0].RelativeHumidity
  const wind = data[0].Wind.Speed.Metric.Value
  const windGust = data[0].WindGust.Speed.Metric.Value
  const skies = data[0].WeatherText
  const dayRainProbability = forecast.DailyForecasts[0].Day.RainProbability
  const nightRainProbability = forecast.DailyForecasts[0].Night.RainProbability
  const MaxProb = Math.max(dayRainProbability,nightRainProbability)
  const MinProb = Math.min(dayRainProbability,nightRainProbability)
  const msg = `*PREVAILING WEATHER                                                                                                                                                                                                                                               CONDITIONS IN DISTRICT                                                                                                                                                                                                                                        PAKPATTAN*
 Dated: ${dated}

Temp: ${temp} °C
Humidity: ${humidity}%
Wind: ${wind} km/h, gusts upto ${windGust} km/h
Skies: ${skies}
Rain probability: ${MinProb}-${MaxProb}% (Source: Accuweather)

*Riaz Ahmad, PAO/DDA (Ext) Pakpattan*`

return msg
}


export const last24HourWeatherMsg = async() =>{
  const dated = getCurrentDate()
  let last24data = await getLast24HoursWeaterDataPakpattan()

  let maximum = null
  let minimum = null
  let rainAvg = last24data[0].PrecipitationSummary.Past24Hours.Metric.Value

  let minWindSpeed = null
  let maxWindSpeed = null
  let humidity = last24data[0].RelativeHumidity
  let skies = last24data[0].WeatherText

  let temp = []
  let windSpeed = []
  let humidityTemp = []
 for(let i=0; i<=23; i++){
  temp.push(last24data[i].TemperatureSummary.Past24HourRange.Minimum.Metric.Value)
  windSpeed.push(last24data[i].Wind.Speed.Metric.Value)
  humidityTemp.push(last24data[i].RelativeHumidity)
 }
 maximum = Math.max(...temp)
 minimum = Math.min(...temp)

 minWindSpeed= Math.min(...windSpeed)
 maxWindSpeed = Math.max(...windSpeed)

 const humiditySum = humidityTemp.reduce((a, b) => a + b, 0);
 humidity = humiditySum / 24;

  const msg = `*Last 24 hour Weather Report in District Pakpattan Dated ${dated} upto 8.00 am*

    •  Temperature:
           - Maximum: ${maximum}°C 
           - Minimum:  ${minimum}°C 
    •  Precipitation: rain 
Pakpattan Average: ${rainAvg} mm 
Arifwala: Nill 
Dist. Average: ${rainAvg /2} mm
    •  Wind Speed: ${minWindSpeed}kph - ${maxWindSpeed}kph
    •  Humidity: ${Math.trunc(humidity)}%
    •  Skies: ${skies}

  *Riaz Ahmed, Deputy Director Agriculture Extension Pakpattan*`
  return msg;
}



//! Combined MSG 
export const combinedWeatherMsg = async ()=>{
    const dated = getCurrentDate2()

  const data = await getPrevailingWeatherDataPakpattan()
  const forecast= await get1DayForecastDataPakpattan()
 

  const temp = data[0].Temperature.Metric.Value
  const humidity = data[0].RelativeHumidity
  const wind = data[0].Wind.Speed.Metric.Value
  const windGust = data[0].WindGust.Speed.Metric.Value
  const skies = data[0].WeatherText
  const dayRainProbability = forecast.DailyForecasts[0].Day.RainProbability
  const nightRainProbability = forecast.DailyForecasts[0].Night.RainProbability
  const MaxProb = Math.max(dayRainProbability,nightRainProbability)
  const MinProb = Math.min(dayRainProbability,nightRainProbability)
// ----------------------------------------------------------------
  const last24data = await getLast24HoursWeaterDataPakpattan()
   const last24ArifwalaData = await getLast24HoursWeaterDataArifWala()

  let maximum = last24data[0].TemperatureSummary.Past24HourRange.Maximum.Metric.Value;  //corrected
  let minimum = last24data[0].TemperatureSummary.Past24HourRange.Minimum.Metric.Value;  //corrected
  let rainPPNAvg = last24data[0].PrecipitationSummary.Past24Hours.Metric.Value;         //corrected
  let rainArifwalaAvg = last24ArifwalaData[0].PrecipitationSummary.Past24Hours.Metric.Value  //corrected

  
  let skies24 = last24data[0].WeatherText

 

 
 let windSpeeds = last24data.map(item => item.Wind.Speed.Metric.Value);

let minWind = Math.min(...windSpeeds);    //corrected
let maxWind = Math.max(...windSpeeds);    //corrected

let humidities = last24data.map(item => item.RelativeHumidity);

let minHumidity = Math.min(...humidities);
let maxHumidity = Math.max(...humidities);
let avgHumidity = (humidities.reduce((sum, h) => sum + h, 0) / humidities.length).toFixed(1);

let weatherTexts = last24data.map(item => item.WeatherText);

// Count frequency of each weather text
let freq = {};
for (let text of weatherTexts) {
  freq[text] = (freq[text] || 0) + 1;
}

// Find the most common one
let mostCommonSkies = Object.entries(freq).reduce((a, b) => (b[1] > a[1] ? b : a))[0];







  const msg=`*Prevailing Weather Conditions in District Pakpattan*
Date: ${dated}

* Temperature: ${temp}°C
* Humidity: ${humidity}%
* Wind: ${wind} km/h (gusts up to ${windGust} km/h)
* Skies: ${skies}
* Rain Probability: ${MinProb}-${MaxProb}% (Source: Accuweather)

*Last 24-hour Weather Report (up to 8:00 am)*
* Temperature:
    - Maximum: ${maximum}°C
    - Minimum: ${minimum}°C
* Precipitation:
    - Pakpattan : ${rainPPNAvg}mm
    - Arifwala: ${rainArifwalaAvg}mm
    - District Average: ${(rainPPNAvg+rainArifwalaAvg)/2} mm
* Wind Speed: ${minWind}kph - ${maxWind}kph
* Humidity: ${avgHumidity}%
* Skies: ${mostCommonSkies}

*Riaz Ahmed, Deputy Director Agriculture Extension Pakpattan*`;

return msg

}