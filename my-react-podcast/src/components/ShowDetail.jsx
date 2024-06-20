import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Showdetail.css";

export default function ShowDetail() {
  const { showId } = useParams();
  const [showDetails, setShowDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>No show details available.</div>;
  }

  const showDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
            {showDate(showDetails.updated)}
          </p>
          <p className="show-description">{showDetails.description}</p>
          <p className="show-seasons">
            <span className="fw-bold">Seasons:</span>{" "}
            {showDetails.seasons.length}
          </p>
        </div>
      </div>
      <div className="seasons-wrapper">
        {showDetails.seasons.map((season) => (
          <div
            key={season.season}
            className="card season-card d-flex flex-column gap-4 p-3 my-3 w-100"
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
                  <div key={episode.episode} className="episode-item">
                    <h4>{episode.title}</h4>
                    <p>{episode.description}</p>
                    <audio controls>
                      <source src={episode.file} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
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
