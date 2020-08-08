import express from "express";

import GradeController from "./controllers/GradeController.js";

const routes = express.Router();

routes.post("/grade", GradeController.store);
routes.put("/grade/:id", GradeController.update);
routes.delete("/grade/:id", GradeController.delete);
routes.get("/grade/:id", GradeController.show);
routes.get("/grades/totalgrade", GradeController.showNotaTotal);
routes.get("/grades/totalaverage", GradeController.showNotaAverage);
routes.get("/grades/showTopGrades", GradeController.showTopGrades);
routes.get("/grade", GradeController.index);

export default routes;
