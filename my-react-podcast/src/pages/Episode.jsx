import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function Episode() {
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
              <p>Season: {episode.season}</p>
              <p>Release Date: {episode.date}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
