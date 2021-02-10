import cors from "cors";
import express from "express";
import "./config";
import { router } from "./router";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = express();

const apiVersion = "/api/v1";
const whitelist = [
  "https://kyrrefarm.netlify.app",
  "https://kyrrefarm.herokuapp.com",
  "http://localhost:3000",
];

// custom CORS validation
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("CORS origin:", origin);
      // allow undefined origin (non-browser)
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        // callback(new Error("Not allowed by CORS"));
        console.error(`Denied origin: ${origin}`);
        callback(null);
      }
    },
  })
);

app.use(express.json());
app.use(apiVersion, router);

const PORT: number = Number(process.env.PORT) || 4000;
app.listen(PORT, () => {
  console.log(`kyrrefarm server running at port ${PORT}`);
});
