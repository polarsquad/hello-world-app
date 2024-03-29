import express from "express";
import promBundle from "express-prom-bundle";
import { resolve } from "path";
import bodyParser from "body-parser";
import views from "./views";
import api from "./api";
import storage from "./storage";

const metricsMiddleware = promBundle({ includeMethod: true });

const app = express();
app.use(metricsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log("Time:", new Date().toISOString(), ", Url: ", req.url);
  next();
});

app.use("/api", api(storage, GIT_COMMIT));
app.use("/", views(storage));

app.use("/assets", express.static(resolve(__dirname, "assets")));

app.close = () => {};

export default app;
