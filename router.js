import {Router} from "express"
import {allDataOfDay,weekData} from "./weather-api.js"
const router =new Router();
router.get("/weekdata",async(req,res)=>{
    const weekdata= await weekData();
res.json(weekdata);
});
router.get("/alldataofday",async(req,res)=>{
    const alldataofday= await allDataOfDay();
    res.json(alldataofday)
});



export default router;
