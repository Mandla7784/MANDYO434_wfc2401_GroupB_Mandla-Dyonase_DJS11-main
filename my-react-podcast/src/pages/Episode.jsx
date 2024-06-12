import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Episode() {
  const [episode, setEpisode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://podcast-api.netlify.app/episodes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setEpisode(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching episode:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleAudioEnd = () => {
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
            <img src={episode.image} alt={episode.title} />
            <a
              className="episode-title"
              href={episode.url}
              target="_blank"
              rel="noreferrer"
            >
              {episode.title}
            </a>
            <audio
              controls
              autoPlay={isPlaying}
              onEnded={handleAudioEnd}
              src={episode.audioUrl}
            >
              Your browser does not support the audio element.
            </audio>
            <button onClick={handlePlayPause}>
              {isPlaying ? "Pause" : "Play"}
            </button>
          </div>
        )
      )}
    </div>
  );
}
