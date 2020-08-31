import express from "express";
import cors from "cors";
import routes from "./routes.js";
import connection from "./database/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000, () => {
  console.log("API em execucao");
});
