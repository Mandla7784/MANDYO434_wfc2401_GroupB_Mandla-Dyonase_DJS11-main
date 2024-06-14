import React from "react";
import { Player, PosterImage } from "video-react";

const MyVideo = (props) => {
  return (
    <Player>
      <PosterImage src={props.image} />
      <source src={props.src} type="video/mp4" />
    </Player>
  );
};

export default MyVideo;
