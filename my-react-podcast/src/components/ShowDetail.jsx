import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Showdetail.css";

export default function ShowDetail() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  const [checkedEpisodes, setCheckedEpisodes] = useState(() => {
    return JSON.parse(localStorage.getItem("checkedEpisodes")) || {};
  });

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch show details");
        }
        const data = await response.json();
        setShowDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowDetails();
  }, [showId]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("checkedEpisodes", JSON.stringify(checkedEpisodes));
  }, [checkedEpisodes]);

  const handleSeasonSelect = (seasonNumber) => {
    setSelectedSeason(seasonNumber === selectedSeason ? null : seasonNumber);
  };

  const handleCheckFavorites = (episodeId) => {
    setCheckedEpisodes((prevCheckedEpisodes) => ({
      ...prevCheckedEpisodes,
      [episodeId]: !prevCheckedEpisodes[episodeId],
    }));
  };

  const addToFavorites = (episodeId) => {
    if (!favorites.includes(episodeId)) {
      setFavorites([...favorites, episodeId]);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>No show details available.</div>;
  }

  return (
    <div className="show-page-wrapper">
      <div className="card show-page d-flex flex-row gap-4 align-items-center p-3 my-3 w-100">
        <div className="d-flex">
          <img
            className="show-image"
            src={showDetails.image}
            alt={showDetails.title}
          />
        </div>
        <div className="d-flex flex-column justify-content-center flex-grow-1">
          <h2 className="show-title">{showDetails.title}</h2>
          <p className="show-date">
            <span className="fw-bold">Last updated:</span>{" "}
            {new Date(showDetails.updated).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="show-description">{showDetails.description}</p>
          <p className="show-seasons">
            <span className="fw-bold">Seasons:</span>{" "}
            {showDetails.seasons.length}
          </p>
        </div>
      </div>
      <div className="seasons-wrapper">
        <div className="seasons-tab">
          {showDetails.seasons.map((season) => (
            <button
              key={season.season}
              className={`season-tab ${
                season.season === selectedSeason ? "active" : ""
              }`}
              onClick={() => handleSeasonSelect(season.season)}
            >
              Season {season.season}
            </button>
          ))}
        </div>
        {showDetails.seasons.map((season) => (
          <div
            key={season.season}
            className={`season-episodes ${
              season.season === selectedSeason ? "show" : "hide"
            }`}
          >
            <div className="d-flex">
              <img
                className="season-image"
                src={season.image}
                alt={season.title}
              />
            </div>
            <div className="d-flex flex-column">
              <h3 className="season-title">{season.title}</h3>
              <p className="season-episodes">
                <span className="fw-bold">Episodes:</span>{" "}
                {season.episodes.length}
              </p>
              <div className="episodes-wrapper">
                {season.episodes.map((episode) => (
                  <div key={episode.id} className="episode-item">
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>

                    <audio controls>
                      <source src={episode.file} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>

                    <div>
                      <div className="d-flex gap-3">
                        <button
                          onClick={() => addToFavorites(episode.id)}
                          className="btn btn-primary"
                        >
                          Add to Favorites
                        </button>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={checkedEpisodes[episode.id] || false}
                          onChange={() => handleCheckFavorites(episode.id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
