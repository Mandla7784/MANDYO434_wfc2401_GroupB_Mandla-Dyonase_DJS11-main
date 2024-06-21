import { useEffect, useState, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./searchedShows.css"; // Import custom CSS file for additional styling

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
  // getting genre names from ids
  if (!genreIds) {
    return "";
  }

  return genreIds.map((id) => showGenres[id] || "Unknown Genre").join(", "); // return genre names
};

export default function Episodes() {
  // Function to render the list of episodes
  const [episodes, setEpisodes] = useState([]); // State to store the list of episodes
  const [isLoading, setIsLoading] = useState(true); // State to track if data is loading
  const [searchepisode, setSearchepisode] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null); // State to store the selected episode for modal

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/`) // Fetch data from the API
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        setEpisodes(data); // Set the data in the state
        setIsLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log any errors
        setIsLoading(false); // Set loading to false
      });
  }, []); // Only run once on component mount (when the page loads)

  const toggleFavorite = (episodeId) => {
    // Function to toggle favorite episodes
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get stored favorites from local storage
    const storedTimestamps =
      JSON.parse(localStorage.getItem("timestamps")) || {}; // Get stored timestamps from local storage

    if (storedFavorites.includes(episodeId)) {
      const updatedFavorites = storedFavorites.filter((id) => id !== episodeId); // Remove episode from favorites
      delete storedTimestamps[episodeId];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update favorites in local storage
      localStorage.setItem("timestamps", JSON.stringify(storedTimestamps)); // Update timestamps in local storage
      setFavorites(updatedFavorites); // Update favorites in state
    } else {
      const newFavorites = [...storedFavorites, episodeId]; // Add episode to favorites
      const newTimestamps = { ...storedTimestamps, [episodeId]: new Date() };
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      localStorage.setItem("timestamps", JSON.stringify(newTimestamps));
      setFavorites(newFavorites);
    }
  };

  const getFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || []; // Get stored favorites from local storage
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    getFavorites(); // Get favorites on component mount
  }, []);

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode); // Set selected episode in state
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
      <div className="container d-flex justify-content-center mb-4 rounded-5 bg-transparent border gap-2 w-50 bg-gradient-to-r from-primary to-secondary text-white p-2">
        <input
          className="form-control w-50 rounded-3 flex-grow-1 bg-transparent rounded-5 bg-gradient-to-r from-primary to-secondary text-white p-2"
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
            {favorites.includes(selectedEpisode?.id)
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export function Episode() {
  const [episode, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch episode data
    fetch(`https://podcast-api.netlify.app/episodes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisode(data);
        setIsLoading(false);
        setIsPlaying(true); // Auto-play when episode data is fetched
      })
      .catch((error) => {
        console.error("Error fetching episode:", error);
        setIsLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Playback control based on isPlaying state and episode changes
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, episode]);

  const handlePlayPause = () => {
    // Toggle play/pause state
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
    // Reset isPlaying when audio playback ends
    setIsPlaying(false);
  };

  return (
    <div>
      <h1>Episode</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        episode && (
          <div className="episode-card-div" key={episode.id}>
            <h2 className="episode-title">{episode.title}</h2>
            {episode.image ? (
              <img
                src={episode.image} // Correct property name for the image URL
                alt={`${episode.title} cover`}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
            ) : (
              <p>No cover image available</p>
            )}
            {episode.audioUrl && (
              <audio
                ref={audioRef}
                onEnded={handleAudioEnd}
                src={episode.audioUrl}
                controls
              >
                Your browser does not support the audio element.
              </audio>
            )}
            <button onClick={handlePlayPause}>
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>

            <div>
              <p>{episode.description}</p>
              <p>
                <small className="text-muted">
                  Genres: {episode.genres.join(", ")}
                </small>
              </p>
              <p>
                <small className="text-muted">Seasons: {episode.seasons}</small>
              </p>
              <button
                className="btn btn-warning"
                onClick={() => toggleFavorite(episode.id)}
              >
                {favorites.includes(episode.id)
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
