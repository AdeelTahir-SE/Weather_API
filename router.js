import { Router } from "express";
import { getWeatherWeekdata, getWeatherdaydata } from "./weather-api.js";
import client from "./redis.js";

const router = new Router();

router.get("/weekdata/:city", async (req, res) => {
  const { city } = req.params;
  const weekdata = await getWeatherWeekdata(city, date);
  res.json(weekdata);
});

router.get("/alldataofday/:city/:date", async (req, res) => {
  const { city, date } = req.params;
  const alldataofday = await getWeatherdaydata(city, date);
  res.json(alldataofday);
});

export default router;
