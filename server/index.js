import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./Routes/Users.js";
import QuestionRoutes from "./Routes/Questions.js";
import AnswerRoutes from "./Routes/Answers.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a Stack-Copy API From <b>Balbir Singh</b>");
});

app.use("/user", UserRoutes);
app.use("/questions", QuestionRoutes);
app.use("/answer", AnswerRoutes);

const PORT = process.env.PORT || 80;
const DATABASE_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
