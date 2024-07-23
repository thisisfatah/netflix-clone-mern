import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingTv(req, res) {
  try {
    const url = "https://api.themoviedb.org/3/trending/tv/day?language=en-US";
    const data = await fetchFromTMDB(url);
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({
      success: true,
      content: randomMovie,
    });
  } catch (error) {
    console.log("Error in getTrendingMovie controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function getTvTrailers(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.status(404).send(null);
    }
    console.log("Error in getMovieTrailers controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function getTvDetails(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({
      success: true,
      details: data,
    });
  } catch (error) {
    if (error.message.includes(404)) {
      return res.status(404).send(null);
    }
    console.log("Error in getMovieDetails controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function getSimilarTv(req, res) {
  try {
    const { id } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({
      success: true,
      similar: data.results,
    });
  } catch (error) {
    console.log("Error in gerSimilarMovies controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function getTvByCategory(req, res) {
  try {
    const { category } = req.params;
    const url = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
    const data = await fetchFromTMDB(url);
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    console.log("Error in getMoviesByCategory controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}
