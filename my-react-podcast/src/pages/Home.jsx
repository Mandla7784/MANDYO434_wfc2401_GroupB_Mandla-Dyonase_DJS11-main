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

  const filteredShows = shows.filter((show) =>
    show.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedShows = [...filteredShows].sort((a, b) => {
    if (sortOrder === "A-Z") {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === "Z-A") {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === "Recent") {
      return new Date(b.updated) - new Date(a.updated);
    } else {
      return new Date(a.updated) - new Date(b.updated);
    }
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => {
        const sortedShows = data.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        setShows(sortedShows);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

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
              className="sort-order"
              value={sortOrder}
              onChange={handleSortOrderChange}
            >
              <option value="A-Z">Title: A-Z</option>
              <option value="Z-A">Title: Z-A</option>
              <option value="Recent">Most Recently Updated</option>
              <option value="Oldest">Oldest Updated</option>
            </select>
          </div>
          <input
            type="search"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Search for a podcast"
          />
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
                  <p>Last Updated : {formatDate(show.updated)}</p>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
