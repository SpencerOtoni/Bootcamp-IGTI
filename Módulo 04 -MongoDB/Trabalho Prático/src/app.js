import express from "express";
import cors from "cors";
import routes from "./routes.js";
import connection from "./database/index.js";

class App {
  constructor() {
    this.server = express();

    this.middlewares()
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());

    this.server.use((request, _response, next) => {
      const { method, url } = request;
    
      const logLabel = `[${method.toUpperCase()}] ${url}`;
    
      global.logger.info(logLabel);
      console.time(logLabel);
    
      next();
    
      console.timeEnd(logLabel);
    });
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
