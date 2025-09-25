import React from "react";
import "./VideoPlayer.css";

function VideoPlayer() {
  return (
    <video
      className="background-video"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/videos/video-2%20(1).mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;
