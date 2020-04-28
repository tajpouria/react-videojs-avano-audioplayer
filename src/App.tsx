import React, { useState, useRef, useEffect } from "react";
import { IDB } from "idborm";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  LinearProgress,
  Typography
} from "@material-ui/core";

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

  const AudioDB = IDB.init("AudioDB", 1, { name: "Audio" });
  const { Audio } = AudioDB.objectStores;

  const [showPlayer, toggleShowPlayer] = useToggle(false);
  const [source, setSrc] = useState<{ src: string; type?: string }>({
    src: episodes[1].src
  });
  const [playingEp, setPlayingEp] = useState<{ title: string }>(episodes[1]);

  const lastPlayedIndex = useRef<number>(0);

  const [downloadedAudiosKeys, setDownloadedAudiosKeys] = useState<any>([]);
  const [downloadingBlob, setDownloadingBlob] = useState<{
    pending: boolean;
    key?: string;
  }>({ pending: false });

  const handleSyncDownloadedAudios = async () => {
    const audioKeys = await Audio.keys();

    setDownloadedAudiosKeys(audioKeys);
  };

  useEffect(() => {
    handleSyncDownloadedAudios();
  }, []);

  const downloadAndStoreInIDB = async (audioURL: string) => {
    toggleShowPlayer(false);
    try {
      setDownloadingBlob({ pending: true, key: audioURL });
      let res = await fetch(`https://cors-anywhere.herokuapp.com/${audioURL}`);

      const blob = await res.blob();

      await Audio.put(blob, audioURL);

      await handleSyncDownloadedAudios();
    } catch (e) {
      console.error(e);
    }

    setDownloadingBlob({ pending: false });
  };

  const handlePlay = ({ idx = 0 }) => {
    setSrc({ src: episodes[idx].src });
    setPlayingEp(episodes[idx]);
    lastPlayedIndex.current = idx;
  };

  const handlePlayDownloadedAudio = async (audioKey: string) => {
    // TODO: Violence of Single Responsibilry should be fixed

    const audioBlob = await Audio.get(audioKey);

    const src = URL.createObjectURL(audioBlob);
    if (src) {
      setSrc({ src, type: audioBlob.type });
      setPlayingEp({ title: audioKey });
      toggleShowPlayer(true);
    } else {
      throw new Error("src not found!");
    }
  };

  const handleSkipNext = () => {
    const lpi = lastPlayedIndex.current;

    if (lpi + 1 < episodes.length) {
      handlePlay({ idx: lpi + 1 });
    }
  };

  const handleSkipPrevious = () => {
    const lpi = lastPlayedIndex.current;

    if (lpi - 1 > 0) {
      handlePlay({ idx: lpi - 1 });
    } else {
      handlePlay({ idx: 0 });
    }
  };

  return (
    <div className="App">
      <Button color="secondary" onClick={toggleShowPlayer}>
        Show Player
      </Button>

      {showPlayer && (
        <AudioPlayer
          source={source}
          autoplay
          ctx={{
            toggleShowPlayer,
            title: playingEp.title,
            subtitle: "Subtitle",
            image: "https://picsum.photos/200/300",
            handleSkipNext,
            handleSkipPrevious,
            downloadAndStoreInIDB
          }}
        />
      )}
      <Divider />
      <List
        component="ul"
        subheader={<ListSubheader>Downloaded Audios</ListSubheader>}
        aria-label="secondary mailbox folders"
      >
        {downloadedAudiosKeys.map((key: string) => (
          <ListItem
            button
            onClick={() => handlePlayDownloadedAudio(key)}
            key={key}
          >
            <ListItemText primary={key} />
          </ListItem>
        ))}
        {downloadingBlob.pending && (
          <>
            <Typography color="secondary">Downloading</Typography>
            <ListItem button>
              <ListItemText primary={downloadingBlob.key} />
            </ListItem>
            <LinearProgress color="secondary" />
          </>
        )}
      </List>
    </div>
  );
}
