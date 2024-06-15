import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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

  const episodesList = episodes.map((episode) => (
    <NavLink key={episode.id} to={`/episode/${episode.id}`}>
      <li className="episode-card-list" key={episode.id}>
        <img src={episode.image} alt={episode.title} />
        <a
          className="episode-title"
          href={episode.url}
          target="_blank"
          rel="noreferrer"
        >
          {episode.title}
        </a>
        <p>genres:{episode.genres}</p>
        <p>{episode.description.substring(0, 300)}...</p>
        <h3>Seasons:{episode.seasons}</h3>
        <h5>Episodes:{episode.id}</h5>
        <button className="btn btn-warning">Add to favorites</button>
      </li>
    </NavLink>
  ));

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchepisode.toLowerCase())
  );

  const episodesListFiltered = filteredEpisodes.map((episode) => (
    <NavLink key={episode.id} to={`/episode/${episode.id}`}>
      <li className="episode-card-list mt-5" key={episode.id}>
        <img src={episode.image} alt={episode.title} />
        <a
          className="episode-title"
          href={episode.url}
          target="_blank"
          rel="noreferrer"
        >
          {episode.title}
        </a>
        <p>genres:{episode.genres}</p>
        <p>{episode.description.substring(0, 300)}...</p>
        <h3>Seasons:{episode.seasons}</h3>
        <h5>Episodes:{episode.id}</h5>
        <button className="btn btn-warning">Add to favorites</button>
      </li>
    </NavLink>
  ));
  return (
    <div className="episodes-page container p-5 mt-5 text-align-center  ">
      <h1>Episodes</h1>
      <div className="d-flex gap-2 text-align-center ">
        <input
          className="form-control w-50 rounded-3 bg-transparent text-white "
          type="text"
          placeholder="Search episodes"
          value={searchepisode}
          onChange={(e) => setSearchepisode(e.target.value)}
        />
        <button className="btn btn-warning">Search</button>
      </div>
      <ul
        style={{ marginTop: "100px" }}
        className="episodes-list gap-3 w-100  d-flex flex-wrap justyfy-content-center"
      >
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : episodesListFiltered.length > 0 ? (
          episodesListFiltered
        ) : (
          episodesList
        )}
      </ul>
    </div>
  );
}
