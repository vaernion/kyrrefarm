import cors from "cors";
import express from "express";
import "./config";
import { router } from "./router";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`kyrrefarm server running at port ${PORT}`);
});
