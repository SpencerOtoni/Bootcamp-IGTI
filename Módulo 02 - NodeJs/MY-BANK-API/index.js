import express from "express";
import accoutsRoutes from "./routes/accounts.js";
import { promises as fs } from "fs";

const { writeFile, readFile } = fs;

global.FileNameArchive = "accounts.json"

const app = express();

app.use(express.json());

app.use("/account", accoutsRoutes);

app.listen(3000, async () => {
  try {
    await readFile(global.FileNameArchive);
    console.log("Servidor online.");
  } catch (error) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    writeFile(global.FileNameArchive, JSON.stringify(initialJson))
      .then(() => {
        console.log("Servidor online and File Created!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
