import express, { Express } from "express";
import cors from "cors";
import { envConfig, connectMongoDB, logger } from "./config";
import imageRoutes from "./routes/imageRoutes";

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.setup();
    connectMongoDB();
  }

  private setup(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req, _, next) => {
      logger.info(`${req.method} ${req.url}`);
      next();
    });

    const apiVersion = envConfig.API_VERSION;
    this.app.use(`/api/${apiVersion}/images`, imageRoutes);
  }

  public start(): void {
    const PORT = envConfig.PORT;
    this.app.listen(PORT, () => {
      logger.info(`Server is running on port localhost:${PORT}`);
    });
  }
}

const app = new App();
app.start();
