import React, { useState } from "react";

export default function Home() {
  const [episodes, setEpisodes] = useState([]);

  React.useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => setEpisodes(data));
  });

  const episodesList = episodes.map((episode) => (
    <li key={episode.id}>
      <a href={episode.url} target="_blank" rel="noreferrer">
        {episode.title}
      </a>
      <p>{episode.description}</p>
      <img src={episode.image} alt={episode.title} />
      <br />
      <br />
    </li>
  ));
  return (
    <div className="home">
      <div className="text-align-center home-hero">
        Home
        <h1>Listen to New PODS</h1>
        <p>
          <i className="fa-solid fa-microphone"></i> Listen to the latest
          podcasts
          <br />
          <i className="fa-solid fa-circle-play"></i> Play your favorite podcast
        </p>
        <h2>Podcasts</h2>
        <ul className="episode-card">{episodesList}</ul>
      </div>
    </div>
  );
}
