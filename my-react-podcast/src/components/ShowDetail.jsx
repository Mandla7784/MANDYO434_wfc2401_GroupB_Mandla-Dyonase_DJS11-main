import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ShowDetail() {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showGenres = {
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/shows/${showId}`)
      .then((res) => res.json())
      .then((data) => {
        setShow(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching show detail:", error);
        setIsLoading(false);
      });
  }, [showId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="show-detail">
      <h1>{show.title}</h1>
      <img src={show.image} alt={show.title} />
      <p>{show.description}</p>
      <p>
        <strong>Genres:</strong>{" "}
        {show.genres
          .map((genre) => showGenres[genre] || "Unknown Genre")
          .join(", ")}
      </p>
      <p>Last Updated : {formatDate(show.updated)}</p>
      <h2>Seasons and Episodes</h2>
      <ul>
        {show.seasons.map((season) => (
          <li key={season.number}>
            <h3>Season {season.number}</h3>
            <ul>
              {season.episodes.map((episode) => (
                <li key={episode.id}>
                  {episode.title} - {episode.description}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
