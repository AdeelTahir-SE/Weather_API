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
  async function weekData(city) {
    const weatherresponse = await axios({
        method: "get",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.API_KEY}`,
    });
    console.log(weatherresponse.data); // Inspect the response structure
    const weatherdata = weatherresponse.data.days.slice(0, 7);
    return weatherdata.map(element=>{return{...element,address:weatherresponse.data.resolvedAddress}});
}



async function allDataOfDay(city, date) {
    const formattedDate = date ? date : getFormattedDate();
    try {
        const weatherresponse = await axios({
            method: "get",
            url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${formattedDate}?key=${process.env.API_KEY}`,
        });

        console.log(weatherresponse.data); // Inspect the response structure

        const weatherdata = weatherresponse.data.days[0];
        weatherdata.address = weatherresponse.data.resolvedAddress;

        return weatherdata;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error; // Re-throw the error if you want to handle it elsewhere
    }
}


 async function setRedisDayData(city,date){
await client.setEx(`dayData${city}${date}`,36000,JSON.stringify(await allDataOfDay(city,date)));
}

 async function getRedisDayData(city,date){
    const data = await client.get(`dayData${city}${date}`);
    return JSON.parse(data);
}


 async function setRedisWeekData(city){
    await client.setEx(`weekdata${city}`,36000,JSON.stringify(await weekData(city)));

}

 async function getRedisWeekData(city){
    const data = await client.get(`weekdata${city}`);
    return JSON.parse(data);
}



export async function getWeatherdaydata (city,date){
const weatherdata = await getRedisDayData(city,date);
if(weatherdata){
    return weatherdata;
}

else{
    await setRedisDayData(city,date);
    return await getRedisDayData(city,date);
}
}




export async function getWeatherWeekdata (city){
const weatherdata = await getRedisWeekData(city);
if(weatherdata){
    return weatherdata;

}

else{
    await setRedisWeekData(city);
    return await getRedisWeekData(city);
}
}
