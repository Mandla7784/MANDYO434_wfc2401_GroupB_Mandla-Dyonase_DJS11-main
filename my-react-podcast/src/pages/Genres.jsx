import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [genreName, setGenreName] = useState("");

  const genreOptions = {
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

  useEffect(() => {
    fetch("https://podcast-api.netlify.app")
      .then((response) => response.json())
      .then((data) => {
        setShows(data);
      })
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  useEffect(() => {
    if (selectedGenre) {
      const filtered = shows.filter((show) =>
        show.genres.includes(parseInt(selectedGenre))
      );
      setFilteredShows(filtered);
      setGenreName(genreOptions[selectedGenre]);
    } else {
      setFilteredShows(shows);
      setGenreName("");
    }
  }, [selectedGenre, shows, genreOptions]);

  return (
    <div className="genres-page">
      <h2 className="genres-title">Genres</h2>
      <div className="genre-select-container">
        <label htmlFor="genreSelect" className="genre-label">
          Select Genre:
        </label>
        <select
          id="genreSelect"
          className="genre-select"
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {Object.entries(genreOptions).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {genreName && (
        <h3 className="selected-genre-heading">Selected Genre: {genreName}</h3>
      )}
      <div className="show-list">
        {filteredShows.map((show) => (
          <div key={show.id} className="show-item">
            <img src={show.image} alt={show.title} />
            <h3>{show.title}</h3>
            <Link to={`/show/${show.id}`} className="view-show-link">
              View Show
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
