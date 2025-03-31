import fs from "fs";
import dotenv from "dotenv";
import express from "express";
import {engine} from "express-handlebars";
import mongoose from "mongoose";
import {Sequelize} from "sequelize-typescript";
import env from "./infrastructure/dotenv/env";

dotenv.config();

const app = express();
const port = env.int("PORT", 3000);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../public"));

app.engine("hbs", engine({extname: ".hbs"}));
app.set("view engine", "hbs");
app.set("views", __dirname + "/infrastructure/handlebars/views");

mongoose.set("debug", env.bool("DEBUG"));
mongoose.connect(env.string("MONGODB_URL"))
  .then(() => console.log("[DB]: Connected to MongoDB!"))
  .catch(console.error);

// Register Mongoose models
const mongooseModelsFolder = __dirname + "/infrastructure/mongoose/models";
fs.readdirSync(mongooseModelsFolder)
  .forEach(filename => require(`${mongooseModelsFolder}/${filename}`));

const sequelize = new Sequelize(env.string("MYSQL_URL"), {
  models: [__dirname + "/infrastructure/sequelize/models"],
  define: {underscored: true},
});
sequelize.sync()
  .then(() => console.log("[DB]: Connected to MySQL!"))
  .catch(console.error);

// Register app routes
const routesFolder = __dirname + "/infrastructure/express/routes";
fs.readdirSync(routesFolder)
  .forEach(filename => {
    const router = require(`${routesFolder}/${filename}`).default;
    app.use(router.path, router.handler);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
