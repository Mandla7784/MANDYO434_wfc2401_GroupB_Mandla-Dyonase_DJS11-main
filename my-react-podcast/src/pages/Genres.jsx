import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [genreName, setGenreName] = useState("");

  const genreOptions = useMemo(
    () => ({
      0: "All Genres",
      1: "Personal Growth",
      2: "Investigative Journalism",
      3: "History",
      4: "Comedy",
      5: "Entertainment",
      6: "Business",
      7: "Fiction",
      8: "News",
      9: "Kids and Family",
    }),
    []
  );

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Genres</h2>
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <label htmlFor="genreSelect" className="form-label">
            Select Genre:
          </label>
          <select
            id="genreSelect"
            className="form-select bg-transparent text-white"
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
      </div>
      {genreName && (
        <h3 className="text-center mb-4">Filter by: {genreName}</h3>
      )}
      <div className="row">
        {filteredShows.map((show) => (
          <div key={show.id} className="col-md-4 mb-4">
            <div
              style={{ backgroundColor: "transparent" }}
              className="card h-100 shadow bg-transparent"
            >
              <img src={show.image} className="card-img-top" alt={show.title} />
              <div className="card-body bg-transparent">
                <h5 className="card-title">{show.title}</h5>
                <Link to={`/show/${show.id}`} className="btn btn-primary">
                  View Show
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
