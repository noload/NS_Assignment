import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import appRoute from "./route"
import sequelize, { checkConnection } from "./config/database";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api",appRoute)

app.listen(process.env.PORT, async () => {
    // await sequelize.query(`CREATE DATABASE assignment`);
    // console.log(`Database created successfully.`);
    await checkConnection();
  console.log("Server started on PORT " + process.env.PORT);
});