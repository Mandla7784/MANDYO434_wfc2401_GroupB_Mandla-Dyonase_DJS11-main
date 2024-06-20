import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button from React Bootstrap
import "./searchedShows.css"; // Import a custom CSS file for additional styling

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchepisode, setSearchepisode] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [timeStamp, setTimeStamp] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // State to store the selected episode for modal

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
  // Function to get genre names from IDs
  const getGenreNames = (genreIds) => {
    return genreIds.map((id) => showGenres[id] || "Unknown Genre").join(", ");
  };

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

  const toggleFavorite = (episodeId) => {
    if (favorites.includes(episodeId)) {
      setFavorites(favorites.filter((id) => id !== episodeId));
    } else {
      localStorage.setItem("time", JSON.stringify(new Date()));
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, episodeId])
      );
      setFavorites([...favorites, episodeId]);
      setTimeStamp(timeStamp);
    }
  };

  const getFavorites = () => {
    const storedFavorites = localStorage.getItem("favorites");

    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  };

  useEffect(() => {
    getFavorites();
    const intervalId = setInterval(() => {
      setTimeStamp(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
  };

  const handleCloseModal = () => {
    setSelectedEpisode(null);
  };

  const filteredEpisodes = episodes.filter((episode) =>
    episode.title.toLowerCase().includes(searchepisode.toLowerCase())
  );

  const episodesList = filteredEpisodes.map((episode) => (
    <li
      className="episode-card-list card m-3 p-2"
      key={episode.id}
      onClick={() => handleEpisodeClick(episode)} // Handle click to show modal
    >
      <NavLink to={`/episodes/${episode.id}`}>
        <img className="card-img-top" src={episode.image} alt={episode.title} />
        <div className="card-body">
          <h5 className="card-title">{episode.title}</h5>
          <p className="card-text">
            {episode.description.substring(0, 100)}...
          </p>

          <p className="card-text">
            <small className="text-muted">
              Genres: <p> {getGenreNames(episode.genres)} </p>
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">Seasons: {episode.seasons}</small>
          </p>
          <button
            className="btn btn-warning"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(episode.id);
            }}
          >
            {favorites.includes(episode.id)
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
      </NavLink>
    </li>
  ));

  return (
    <div className="episodes-page container p-5 mt-5">
      <h1 className="text-center mb-4">
        {" "}
        <span className="text-warning">Shows /</span>Episodes
      </h1>
      <div
        className="d-flex justify-content-center mb-4 rounded-5 bg-transparent border gap-2  w-50   bg-gradient-to-r from-primary to-secondary text-white p-2
      "
      >
        <input
          className="form-control w-50 rounded-3 flex-grow-1 bg-transparent rounded-5  bg-gradient-to-r from-primary to-secondary text-white p-2"
          type="text"
          placeholder="Search episodes"
          value={searchepisode}
          onChange={(e) => setSearchepisode(e.target.value)}
        />
        🔍
      </div>
      <ul className="episodes-list d-flex flex-wrap justify-content-center">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : episodesList.length > 0 ? (
          episodesList
        ) : (
          <div>No episodes found</div>
        )}
      </ul>

      {/* Modal for displaying episode details */}
      <Modal
        className="episodes-modal"
        show={selectedEpisode !== null}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedEpisode?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            className="card-img-top"
            src={selectedEpisode?.image}
            alt={selectedEpisode?.title}
          />
          <p>{selectedEpisode?.description}</p>
          <p>
            <small className="text-muted">
              Genres: {selectedEpisode?.genres.join(", ")}
            </small>
          </p>
          <p>
            <small className="text-muted">
              Seasons: {selectedEpisode?.seasons}
            </small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <button
            onClick={() => toggleFavorite(selectedEpisode?.id)}
            className="btn btn-warning ms-2"
          >
            Like Episode
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
