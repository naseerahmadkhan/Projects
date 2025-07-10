export const Constants = {
    API:{
        CURRENT: 'https://dataservice.accuweather.com/currentconditions/v1/259629?apikey=Z077l5NiumqH7c7RGKEWaDT2cA1Lzqkc%20&details=true',
        FORECAST: 'https://dataservice.accuweather.com/forecasts/v1/daily/1day/259629?apikey=%20%09Z077l5NiumqH7c7RGKEWaDT2cA1Lzqkc%20&details=true&metric=true',
        LAST24Hours:'https://dataservice.accuweather.com/currentconditions/v1/259629/historical/24?apikey=%20%09Z077l5NiumqH7c7RGKEWaDT2cA1Lzqkc%20&details=true',
        ARIFWALALAST24HOURS:'https://dataservice.accuweather.com/currentconditions/v1/259614/historical/24?apikey=Z077l5NiumqH7c7RGKEWaDT2cA1Lzqkc&details=true',
        HOURLYFORECAST:'https://dataservice.accuweather.com/forecasts/v1/hourly/24hour/259629?apikey=Z077l5NiumqH7c7RGKEWaDT2cA1Lzqkc&details=true&metric=true'
    },
    WEATHER_API:{
        FORECAST: 'https://api.weatherapi.com/v1/forecast.json?key=2471a3f2fd084440b5874100240805&q=Pakpattan&days=1&aqi=no&alerts=no',
        LAST_DAY:'https://api.weatherapi.com/v1/history.json?key=2471a3f2fd084440b5874100240805&q=Pakpattan&dt=2025-07-08',
        CURRENT: 'https://api.weatherapi.com/v1/current.json?key=2471a3f2fd084440b5874100240805&q=Pakpattan&aqi=no'
    }
}