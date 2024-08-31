import { Router } from "express";
import { getWeatherWeekdata, getWeatherdaydata } from "./weather-api.js";
import client from "./redis.js";

const router = new Router();
router.get("/weekdata/:city", async (req, res) => {
  const { city } = req.params;
  let weekdata;
  try {
    console.log("requestmade");
    weekdata = await getWeatherWeekdata(city);
    console.log("weekdatafetched!");
    res.json(weekdata); // Respond with the fetched data
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message || "Internal Server Error" }); // Respond with error message
  }
});

router.get("/alldataofday/:city/:date", async (req, res) => {
  const { city, date } = req.params;
  let alldataofday;
  try {
    console.log("requestmade");
    alldataofday = await getWeatherdaydata(city, date);
    console.log("daydatafetched!");
    res.json(alldataofday); // Respond with the fetched data
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message || "Internal Server Error" }); // Respond with error message
  }
});

export default router;
