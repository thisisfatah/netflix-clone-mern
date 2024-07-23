import express from "express";
import cookieParser from "cookie-parser";
// import path from "path";

import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import tvRoute from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";

import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const PORT = ENV_VARS.PORT;
const app = express();

app.use(express.json()); // for parsing application/json
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/movie", protectRoute, movieRoute);
app.use("/api/v1/tv", protectRoute, tvRoute);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
  connectDB();
});
