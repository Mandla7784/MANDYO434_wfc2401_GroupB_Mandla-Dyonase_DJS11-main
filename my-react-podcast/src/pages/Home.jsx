import React, { useState, useEffect } from "react";
// import Episode from "./pages/Episode";
import { NavLink } from "react-router-dom";
export default function Home() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchepisode, setSearchepisode] = useState("");

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => {
        const sortedEpisodes = data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });

        setEpisodes(sortedEpisodes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const episodesList = episodes.map((episode) => (
    <NavLink key={episode.id} to={`/episode/${episode.id}`}>
      <li className="episode-card" key={episode.id}>
        <img src={episode.image} alt={episode.title} />
        <a
          className="episode-title"
          href={episode.url}
          target="_blank"
          rel="noreferrer"
        >
          {episode.title}
        </a>
        <p>{episode.description.substring(0, 250)}</p>

        <br />
        <br />
      </li>
    </NavLink>
  ));

  return (
    <div className="home">
      <div className="text-align-center home-hero ">
        {/* <div className="bg-warning  w-50">
          <input
            className="   form-control bg-warn border-0 "
            type="text"
            placeholder="Search episodes...."
            value={searchepisode}
            onChange={(e) => setSearchepisode(e.target.value)}
          />
        </div> */}
        Home
        <h1>Listen to New PODS</h1>
        <p>
          <i className="fa-solid fa-microphone"></i> Listen to the latest
          podcasts
          <br />
          <i className="fa-solid fa-circle-play"></i> Play your favorite podcast
        </p>
        <h2>Podcasts</h2>
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ul className="episode-list">{episodesList}</ul>
        )}
      </div>
    </div>
  );
}
