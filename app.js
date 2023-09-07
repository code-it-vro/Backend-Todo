import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
    path: "./data/config.env",
});


// USING MIDDLEWARES
app.use(express.json());
app.use(cookieParser());


// USING ROUTES
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods: ["GET" , "POST", "PUT" , "DELETE"],
    credentials:true,  // if this will be false no cookie or headers will be recieved by the app
}));


app.get("/", (req, res) => {
    res.send("<h1>noice</h1>");
})

// using error middleware
app.use(errorMiddleware);


