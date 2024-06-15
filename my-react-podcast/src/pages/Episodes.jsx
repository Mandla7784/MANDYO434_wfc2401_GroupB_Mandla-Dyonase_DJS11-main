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
      </li>
    </NavLink>
  ));

  return <div>Episodes</div>;
}
