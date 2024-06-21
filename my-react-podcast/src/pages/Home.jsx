import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CarouselComponent from "../components/Carousel";

export default function Home() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");

  const showGenres = {
    1: "Personal Growth",
    2: "Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  // Filter shows based on search term
  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort shows based on selected sortOrder
  const sortedShows = [...filteredShows].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "Recent") {
      return new Date(b.updated) - new Date(a.updated);
    } else if (sortOrder === "Oldest") {
      return new Date(a.updated) - new Date(b.updated);
    }
    return 0;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch shows data
  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => {
        setShows(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="home">
      <div className="home-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Listen to New PODS</h1>
          <p>
            <i className="fa-solid fa-microphone"></i> Listen to the latest
            podcasts
            <br />
            <i className="fa-solid fa-circle-play"></i> Play your favorite
            podcast
          </p>
        </div>
        <div className="hero-carousel">
          {isLoading ? (
            <p className="loading">Loading...</p>
          ) : (
            <CarouselComponent images={shows.map((show) => show.image)} />
          )}
        </div>
      </div>

      <div className="container my-5">
        <div className="filter mb-4">
          <div className="sort-options">
            <label className="sort-label">Sort by:</label>
            <select
              className="sort-order form-select rounded-3 bg-transparent text-white"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="A-Z">Title: A-Z</option>
              <option value="Z-A">Title: Z-A</option>
              <option value="Recent">Most Recently Updated</option>
              <option value="Oldest">Oldest Updated</option>
            </select>
          </div>
          <div className="bg-transparent border border-white rounded-5 d-flex gap-2 align-items-center px-3 py-2 mt-5 justify-content-center w-75">
            <input
              className="form-control rounded-3 w-100 bg-transparent text-white"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a podcast"
            />
            🔍
          </div>
        </div>
        <h2 className="mb-4">Podcasts</h2>

        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ul className="show-list">
            {sortedShows.map((show) => (
              <Link to={`/show/${show.id}`} key={show.id}>
                <li className="show-card" key={show.id}>
                  <img src={show.image} alt={show.title} />
                  <h6 className="show-title">{show.title}</h6>
                  <p>{show.description.substring(0, 100)}</p>
                  <p>
                    <strong>Genres:</strong>{" "}
                    {show.genres
                      .map((genre) => showGenres[genre] || "Unknown Genre")
                      .join(", ")}
                  </p>
                  <p>Seasons: {show.seasons.length}</p>
                  <p>Last Updated: {formatDate(show.updated)}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
