import { User } from "../models/user.model.js";
import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function searchPerson(req, res) {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`;
    const response = await fetchFromTMDB(url);

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const item = req.user.searchHistory.find((item) => {
      return item.id === response.results[0].id;
    });
    if (!item) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].profile_path,
            title: response.results[0].name,
            searchType: "person",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.log("Error in searchPerson controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function searchMovie(req, res) {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const response = await fetchFromTMDB(url);

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const item = req.user.searchHistory.find((item) => {
      return item.id === response.results[0].id;
    });
    if (!item) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].title,
            searchType: "movie",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.log("Error in searchMovie controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function searchTv(req, res) {
  const { query } = req.params;
  try {
    const url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`;
    const response = await fetchFromTMDB(url);

    if (response.results.length === 0) {
      return res.status(404).send(null);
    }

    const item = req.user.searchHistory.find((item) => {
      return item.id === response.results[0].id;
    });
    if (!item) {
      await User.findByIdAndUpdate(req.user._id, {
        $push: {
          searchHistory: {
            id: response.results[0].id,
            image: response.results[0].poster_path,
            title: response.results[0].name,
            searchType: "tv",
            createdAt: new Date(),
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      results: response.results,
    });
  } catch (error) {
    console.log("Error in searchTv controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function getSearchHistory(req, res) {
  try {
    res.status(200).json({
      success: true,
      content: req.user.searchHistory,
    });
  } catch (error) {
    console.log("Error in getSearchHistory controller:", error.message);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}

export async function removeItemFromSearchHistory(req, res) {
  let { id } = req.params;
  id = parseInt(id);
  try {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    res.status(200).json({ success: true, msg: "Item removed successfully" });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller:",
      error.message
    );
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
}
