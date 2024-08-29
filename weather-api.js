import dotenv from "dotenv";
import axios from "axios";
dotenv.config();




export async function weekData(){
    const weatherresponse = await axios({
        method: "get",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Faisalabad/2020-10-19?key=${process.env.API_KEY} `,
    });
    const weatherdata = weatherresponse.data.days.slice(0,7);
return weatherdata;
}

export async function allDataOfDay(){
    const weatherresponse = await axios({
        method: "get",
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${process.env.API_KEY} `,
    });
    const weatherdata = weatherresponse.data.days[0].hours;
return weatherdata;
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
  