import express from "express";
import "./config";
import { router } from "./router";

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = express();

app.use(express.json());
app.use(router);

const port: number = Number(process.env.PORT) || 3000;
app.listen(port);
console.log(`kyrrefarm server running at port ${port}`);
