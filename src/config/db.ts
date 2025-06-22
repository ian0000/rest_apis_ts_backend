import { Sequelize } from "sequelize-typescript";
import router from "../router";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  // logging: console.log,
  models: [__dirname + "/../model/**/*"],
  logging: false,
  define: {
    schema: "public",
  },
});

export default db;
