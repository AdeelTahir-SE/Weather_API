import express from "express";
import router from "./router.js";
import { rateLimit } from "express-rate-limit";
import client from "./redis.js";
import cors from "cors"
const limiter = rateLimit({
  windowMs: 60 * 10 * 1000, // 10 minutes
  max: 100, // limit each IP to 5 requests per windowMs
  message: "You have made too many requests. Please try again after 15 minutes."
});

const app = express();
app.use(cors())
app.use(express.json());

client.connect().then(async() => {
  console.log("Connected to Redis");
  app.use("/api",limiter, router);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}).catch(err => {
  console.error("Failed to connect to Redis:", err);
});
