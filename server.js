import express from "express";
import router from "./router.js";
import { rateLimit } from "express-rate-limit";
import client from "./redis.js";

const limit = rateLimit({
  windowMs: 60 * 10 * 1000, // 10 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "You have made too many requests. Please try again after 15 minutes."
});

const app = express();

app.use(express.json());

// Connect to Redis once when the server starts
client.connect().then(() => {
  console.log("Connected to Redis");

  // Use the rate limiter and router
  app.use("/api", limit, router);

  // Start the server
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });

}).catch(err => {
  console.error("Failed to connect to Redis:", err);
});
