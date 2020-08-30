import express from "express";
import winston from "winston";
import accoutsRoutes from "./routes/accounts.js";
import { promises as fs } from "fs";

const { writeFile, readFile } = fs;

const { combine, printf, label, timestamp } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "my-log.log" }),
  ],
  format: combine(label({ label: "my-back-api" }), timestamp(), myFormat),
});

global.FileNameArchive = "accounts.json";

const app = express();

app.use(express.json());
app.use("/account", accoutsRoutes);

app.listen(3000, async () => {
  try {
    await readFile(global.FileNameArchive);
    logger.info("Servidor online.");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.FileNameArchive, JSON.stringify(initialJson))
      .then(() => {
        logger.info("Servidor online and File Created!");
      })
      .catch((error) => {
        logger.error(error);
      });
  }
});
