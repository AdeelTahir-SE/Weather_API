import dotenv from "dotenv";
import axios from "axios";
import client from "./redis.js"
dotenv.config();


function getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

 async function weekData(city,date){
    const Date=date?date:getFormattedDate();
    const weatherresponse = await axios({
        method: "get",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${Date}?key=${process.env.API_KEY} `,
    });
    const weatherdata = weatherresponse.data.days.slice(0,7);
return weatherdata;
}

 async function allDataOfDay(date){
    const Date=date?date:getFormattedDate();

    const weatherresponse = await axios({
        method: "get",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${Date}?key=${process.env.API_KEY} `,
    });
    const weatherdata = weatherresponse.data.days[0].hours;
return weatherdata;
}

 async function setRedisDayData(city,date){
await client.setEx("dayData",36000,JSON.stringify(await allDataOfDay(city)));
}

 async function getRedisDayData(){
    const data = await client.get("dayData");
    return JSON.parse(data);
}


 async function setRedisWeekData(city,date){
    await client.setEx("weekdata",36000,JSON.stringify(await weekData(city)));

}

 async function getRedisWeekData(){
    const data = await client.get("weekdata");
    return JSON.parse(data);
}



export async function getWeatherdaydata (city,date){
const weatherdata = await getRedisDayData();
if(weatherdata){
    return weatherdata;
}

else{
    await setRedisDayData(city,date);
    return await getRedisDayData();
}
}




export async function getWeatherWeekdata (city,date){
const weatherdata = await getRedisWeekData();
if(weatherdata){
    return weatherdata;

}

else{
    await setRedisWeekData(city,date);
    return await getRedisWeekData();
}
}

const weatherdata= [
    "datetime",
    "datetimeEpoch",
    "tempmax",
    "tempmin",
    "temp",
    "feelslikemax",
    "feelslikemin",
    "feelslike",
    "dew",
    "humidity",
    "precip",
    "precipprob",
    "precipcover",
    "preciptype",
    "snow",
    "snowdepth",
    "windgust",
    "windspeed",
    "winddir",
    "pressure",
    "cloudcover",
    "visibility",
    "solarradiation",
    "solarenergy",
    "uvindex",
    "severerisk",
    "sunrise",
    "sunriseEpoch",
    "sunset",
    "sunsetEpoch",
    "moonphase",
    "conditions",
    "description",
    "icon",
    "stations",
    "source"
  ]

  const weatherdatahours =[
    "datetime",
    "datetimeEpoch",
    "temp",
    "feelslike",
    "humidity",
    "dew",
    "precip",
    "precipprob",
    "snow",
    "snowdepth",
    "preciptype",
    "windgust",
    "windspeed",
    "winddir",
    "pressure",
    "visibility",
    "cloudcover",
    "solarradiation",
    "solarenergy",
    "uvindex",
    "severerisk",
    "conditions",
    "icon",
    "stations",
    "source"
  ]
  