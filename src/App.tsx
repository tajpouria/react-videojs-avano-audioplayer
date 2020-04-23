import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";

import AudioPlayer from "./audioPlayer";
import { useToggle } from "./utils/hooks";

export default function App() {
  const episodes = [
    {
      title: "1 MB",
      src:
        "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_1MG.mp3"
    },
    {
      title: "2 MB",
      src:
        "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_2MG.mp3"
    },
    {
      title: "5 MB",
      src:
        "https://file-examples.com/wp-content/uploads/2017/11/file_example_MP3_5MG.mp3"
    }
  ];

  const [showPlayer, toggleShowPlayer] = useToggle(false);
  const [src, setSrc] = useState<string>(episodes[1].src);
  const [playingEp, setPlayingEp] = useState<{ title: string }>(episodes[1]);

  const lastPlayedIndex = useRef<number>(0);

  const handlePlay = (idx = 0) => {
    setSrc(episodes[idx].src);
    setPlayingEp(episodes[idx]);
    lastPlayedIndex.current = idx;
  };

  const handleSkipNext = () => {
    const lpi = lastPlayedIndex.current;

    if (lpi + 1 < episodes.length) {
      handlePlay(lpi + 1);
    }
  };

  const handleSkipPrevious = () => {
    const lpi = lastPlayedIndex.current;

    if (lpi - 1 > 0) {
      handlePlay(lpi - 1);
    } else {
      handlePlay(0);
    }
  };

  return (
    <div className="App">
      <Button color="secondary" onClick={toggleShowPlayer}>
        Show Player
      </Button>

      {showPlayer && (
        <AudioPlayer
          src={src}
          autoplay
          ctx={{
            toggleShowPlayer,
            title: playingEp.title,
            subtitle: "Subtitle",
            image: "https://picsum.photos/200/300",
            handleSkipNext,
            handleSkipPrevious
          }}
        />
      )}
    </div>
  );
}
