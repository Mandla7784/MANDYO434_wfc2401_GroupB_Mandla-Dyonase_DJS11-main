import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]); // State to store the list of favorites
  const [sortOption, setSortOption] = useState("mostRecent"); // State to store the selected sort option

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      // Fetch favorite episodes from local storage
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || []; // Get stored favorites from local storage
      const episodesData = await Promise.all(
        storedFavorites.map((id) =>
          fetch(`https://podcast-api.netlify.app/episodes/${id}`).then(
            (
              res // Fetch episode data for each favorite
            ) => res.json() // Parse the response as JSON
          )
        )
      );
      const storedTimestamps =
        JSON.parse(localStorage.getItem("timestamps")) || {}; // Get stored timestamps from local storage
      const favoritesWithTimestamps = episodesData.map((episode) => ({
        ...episode, // Include the timestamp in the episode object
        timestamp: storedTimestamps[episode.id] || null,
      }));
      setFavorites(favoritesWithTimestamps); // Set the list of favorites in the state
    };

    fetchFavoriteEpisodes(); // Fetch favorite episodes on component mount
  }, []);

  const handleRemove = (episodeId) => {
    const newFavorites = favorites.filter(
      // Remove the episode from the list of favorites
      (episode) => episode.id !== episodeId // Filter out the episode with the given ID
    );
    const newTimestamps = newFavorites.reduce((acc, episode) => {
      acc[episode.id] = episode.timestamp;
      return acc;
    }, {});
    localStorage.setItem(
      "favorites",
      JSON.stringify(newFavorites.map((episode) => episode.id))
    );
    localStorage.setItem("timestamps", JSON.stringify(newTimestamps));
    setFavorites(newFavorites);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedFavorites = [...favorites];
    switch (option) {
      case "A-Z":
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title in ascending order
        break;
      case "Z-A":
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title)); // Sort by title in descending order
        break;
      case "mostRecent":
        sortedFavorites.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp) // Sort by timestamp in descending order
        );
        break;
      case "oldest":
        sortedFavorites.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp) // Sort by timestamp in ascending order
        );
        break;
      default:
        break;
    }
    setFavorites(sortedFavorites); // Update the list of favorites in the state
  };

  return (
    <div className="favorites-page container p-5 mt-5">
      <h1 className="text-center mb-4">Favorites</h1>
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select w-50"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="mostRecent">Most Recently Updated</option>
          <option value="oldest">Oldest Updated</option>
          <option value="A-Z">Title: A-Z</option>
          <option value="Z-A">Title: Z-A</option>
        </select>
      </div>
      {favorites.map((episode) => (
        <div className="card card-body d-flex mb-3 p-3 w-50" key={episode.id}>
          <img
            src={episode.image}
            alt={episode.title}
            className="card-img-top"
          />
          <h5> Seasons: {episode.seasons} </h5>
          <h5> Episodes: {episode.episodes} </h5>

          <NavLink to={`/episodes/${episode.id}`}>
            <h5 className="card-title">{episode.title}</h5>
            <img src={episode.image} alt={episode.title} />
          </NavLink>
          <button
            onClick={() => handleRemove(episode.id)}
            className="btn btn-danger w-25"
          >
            Remove ✖️
          </button>
          <p>Added on: {new Date(episode.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
