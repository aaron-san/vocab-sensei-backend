import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import chalk from "chalk";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// app.use("/api/users", userRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  res.send("Hey!");
});

const blue = chalk.cyan;
const red = chalk.redBright;

app.listen(PORT, () =>
  console.log(blue("App listening on port ") + red("http://localhost:" + PORT))
);
