import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [shows, setShows] = useState([]);
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

  ///formating date for last updates in show card
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`)
      .then((res) => res.json())
      .then((data) => {
        // Simple sorting by title in alphabetical order
        const sortedShows = data.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        setShows(sortedShows);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const showsList = shows.map((show) => (
    <li className="show-card" key={show.id}>
      <NavLink to={`/show/${show.id}`}>
        <img src={show.image} alt={show.title} />
        <h3 className="show-title">{show.title}</h3>
      </NavLink>
      <p>{show.description.substring(0, 100)}</p>
      <p>
        <strong>Genres:</strong>{" "}
        {show.genres
          .map((genre) => showGenres[genre] || "Unknown Genre")
          .join(", ")}
      </p>
      <p>Last Updated : {formatDate(show.updated)}</p>
    </li>
  ));

  return (
    <div className="home">
      <div className="home-hero text-align-center">
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
          <ul className="show-list">{showsList}</ul>
        )}
      </div>
    </div>
  );
}
