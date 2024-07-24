import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

function formatDate(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const response = await axios.get(
          `https://netflix-clone-api-six.vercel.app/api/v1/search/history`
        );
        setSearchHistory(response.data.content);
      } catch (error) {
        setSearchHistory([]);
      }
    };

    getSearchHistory();
  }, []);

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `https://netflix-clone-api-six.vercel.app/api/v1/search/history/${item.id}`
      );
      setSearchHistory(searchHistory.filter((item) => item.id !== item.id));
    } catch (error) {
      toast.error(error.response.data.msg || "An error occurred");
    }
  };

  if (searchHistory.length === 0)
    return (
      <div className="bg-black text-white h-screen">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="text-center mx-auto px-4 py-8 h-full mt-40">
            <h2 className="text-xl text-balance">No search history found</h2>
          </div>
        </div>
      </div>
    );

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {searchHistory.map((item) => {
            if (item.image === null) return null;

            return (
              <div
                className="bg-gray-800 p-4 rounded flex items-start"
                key={item.id}
              >
                <img
                  src={SMALL_IMG_BASE_URL + item.image}
                  alt="History Image"
                  className="size-16 rounded-full object-cover mr-4"
                />
                <div className="flex flex-col *:">
                  <span className="text-white text-lg">{item.title}</span>
                  <span className="text-gray-400 text-sm">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <span
                  className={`py-1 px-3 min-w-20 text-center rounded-full text-sm ml-auto ${
                    item.searchType === "movie"
                      ? "bg-red-600"
                      : item.searchType === "tv"
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {item.searchType[0].toUpperCase() + item.searchType.slice(1)}
                </span>
                <Trash
                  className="size-5 ml-4 cursor-pointer hover:fill-red-600 hover:text-red-600"
                  onClick={() => handleDelete(item)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchHistoryPage;
