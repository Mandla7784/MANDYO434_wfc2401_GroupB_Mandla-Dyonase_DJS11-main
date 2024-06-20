import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  return (
    <div className="show-detail">
      <h1>{showDetails.title}</h1>
      <p>{showDetails.description}</p>
      <ul>
        {showDetails.seasons.map((season) => (
          <li key={season.id}>
            <h2>Season {season.seasons}</h2>
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.id}>{episode.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
