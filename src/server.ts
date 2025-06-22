import express from "express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
// conectar a base de datos

async function connectDB() {
  try {
    await db.authenticate();
    db.sync({
      //   force: true,
      //   alter: true,
    });
  } catch (error) {
    console.log(colors.red.bold("error al conectar en bd"));
  }
}

connectDB();
const server = express();
//permitir conexiones cors
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"), false);
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));
// server.use(morgan("combined"));
// server.use(morgan("common"));

server.use("/api/products", router);

// server.get("/api", (req, res) => {
//   res.json({ msg: "Desde api" });
// });

// doc

server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
