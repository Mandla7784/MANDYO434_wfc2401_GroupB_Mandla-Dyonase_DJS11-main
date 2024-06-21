import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [sortOption, setSortOption] = useState("mostRecent");

  useEffect(() => {
    const fetchFavoriteEpisodes = async () => {
      const storedFavorites =
        JSON.parse(localStorage.getItem("favorites")) || [];
      const episodesData = await Promise.all(
        storedFavorites.map((id) =>
          fetch(`https://podcast-api.netlify.app/episodes/${id}`).then((res) =>
            res.json()
          )
        )
      );
      const storedTimestamps =
        JSON.parse(localStorage.getItem("timestamps")) || {};
      const favoritesWithTimestamps = episodesData.map((episode) => ({
        ...episode,
        timestamp: storedTimestamps[episode.id] || null,
      }));
      setFavorites(favoritesWithTimestamps);
    };

    fetchFavoriteEpisodes();
  }, []);

  const handleRemove = (id) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    const newTimestamps = newFavorites.reduce((acc, fav) => {
      acc[fav.id] = fav.timestamp;
      return acc;
    }, {});
    localStorage.setItem(
      "favorites",
      JSON.stringify(newFavorites.map((fav) => fav.id))
    );
    localStorage.setItem("timestamps", JSON.stringify(newTimestamps));
    setFavorites(newFavorites);
  };

  const handleSort = (option) => {
    setSortOption(option);
    let sortedFavorites = [...favorites];
    switch (option) {
      case "A-Z":
        sortedFavorites.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Z-A":
        sortedFavorites.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "mostRecent":
        sortedFavorites.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        break;
      case "oldest":
        sortedFavorites.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
        break;
      default:
        break;
    }
    setFavorites(sortedFavorites);
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
      {favorites.map((fav) => (
        <div className="card card-body d-flex mb-3 p-3" key={fav.id}>
          <NavLink to={`/episodes/${fav.id}`}>
            <h5 className="card-title">{fav.title}</h5>
          </NavLink>
          <button
            onClick={() => handleRemove(fav.id)}
            className="btn btn-danger"
          >
            Remove From Favourites
          </button>
          <p>Added on: {new Date(fav.timestamp).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
