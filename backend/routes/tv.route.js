import express from "express";
import {
  getSimilarTv,
  getTrendingTv,
  getTvByCategory,
  getTvDetails,
  getTvTrailers,
} from "../controllers/tv.controller.js";

const route = express.Router();

route.get("/trending", getTrendingTv);
route.get("/:id/trailers", getTvTrailers);
route.get("/:id/details", getTvDetails);
route.get("/:id/similar", getSimilarTv);
route.get("/:category", getTvByCategory);

export default route;
