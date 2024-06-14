import React from "react";
import { Player, PosterImage } from "video-react";

const MyVideo = (props) => {
  return (
    <Player>
      <PosterImage src={props.image} />
      <source src={props.src} type="video/mp4" />
      <source src={props.src} type="video/ogg" />
      <source src={props.src} type="video/webm" />
      <track
        kind="captions"
        srcLang="en"
        label="English captions"
        src="captions.vtt"
        default
      />
    </Player>
  );
};

export default MyVideo;
