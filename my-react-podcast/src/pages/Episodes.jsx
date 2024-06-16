import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Episodes.css"; // Import a custom CSS file for additional styling

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchepisode, setSearchepisode] = useState("");

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => {
        setEpisodes(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchepisode.toLowerCase())
  );

  const episodesList = filteredEpisodes.map((episode) => (
    <li className="episode-card-list card m-3 p-2" key={episode.id}>
      <NavLink to={`/episode/${episode.id}`}>
        <img className="card-img-top" src={episode.image} alt={episode.title} />
        <div className="card-body">
          <h5 className="card-title">{episode.title}</h5>
          <p className="card-text">
            {episode.description.substring(0, 100)}...
          </p>
          <p className="card-text">
            <small className="text-muted">
              Genres: {episode.genres.join(", ")}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">Seasons: {episode.seasons}</small>
          </p>
          <button className="btn btn-warning">Add to favorites</button>
        </div>
      </NavLink>
    </li>
  ));

  return (
    <div className="episodes-page container p-5 mt-5">
      <h1 className="text-center mb-4">Episodes</h1>
      <div className="d-flex justify-content-center mb-4">
        <input
          className="form-control w-50 rounded-3 bg-light"
          type="text"
          placeholder="Search episodes"
          value={searchepisode}
          onChange={(e) => setSearchepisode(e.target.value)}
        />
        <button className="btn btn-warning ms-2">Search</button>
      </div>
      <ul className="episodes-list d-flex flex-wrap justify-content-center">
        {/* if Episodes  not rendered yet , the user will  wait for the loadon */}
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : episodesList.length > 0 ? (
          episodesList
        ) : (
          // if no episodes in the data base searched by the user , the user will get a message
          <div>No episodes found</div>
        )}
      </ul>
    </div>
  );
}
