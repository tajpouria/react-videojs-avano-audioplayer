import React, { useContext, useEffect, useState } from 'react';
import { makeStyles, IconButton, Grid } from '@material-ui/core';
import {
  PauseRounded,
  PlayArrowRounded,
  SkipNextOutlined,
  SkipPreviousOutlined,
  Replay10,
  Forward10,
  Brightness2Outlined,
  SystemUpdateAltOutlined,
  BookmarkBorderOutlined,
} from '@material-ui/icons';

import { PlayerContext } from '.';
import PlayerPlackbackRateSlider from './PlayerPlackbackRateSlider';
import { useToggle } from '../utils/hooks';

const SEEK_STEP = 10;

const useStyles = makeStyles((theme) => ({
  upperControllerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  playPauseButton: {
    boxShadow: '0 5px 15px 0 rgba(245,133,157,0.60)',
  },
  playPauseIcon: {
    color: '#F5859D',
    opacity: 0.9,
    fontSize: '2.6rem',
  },
  upperPlayerButton: {
    padding: '0 .8rem',
  },
  upperPlayerIcon: {
    fontSize: '2.2rem',
    opacity: 0.7,
  },

  loweControllerContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'nowrap',
  },
  lowerPlayerButton: {
    boxShadow: '0 5px 15px 0 rgba(0,0,0,0.15)',
    marginTop: '7%',
    margin: '0 .5rem',
    width: '3.5rem',
  },
  lowerPlayerIcon: {
    fontSize: '1.5rem',
    opacity: 0.7,
    fontWeight: 0.1,
  },
}));

export interface PlayerControllerProps {
  handleSkipNext: () => void;
  handleSkipPrevious: () => void;
  downloadAndStoreInIDB: (audioURL: string) => void;
}

const PlayerController = () => {
  const {
    playerState: { player },
    ctx: { handleSkipNext, handleSkipPrevious, downloadAndStoreInIDB },
  } = useContext(PlayerContext);

  const [paused, togglePaused] = useToggle(false);

  const handleTogglePlayAndPause = () => {
    if (paused) {
      return player?.play();
    }

    return player?.pause();
  };

  useEffect(() => {
    player?.on('play', () => togglePaused(false));
    player?.on('pause', () => togglePaused(true));
  }, [player]);

  const seek = (secs: number) => {
    let time = player?.currentTime() + secs;

    if (time < 0) {
      time = 0;
    }

    player?.currentTime(time);
  };

  const forward = () => seek(SEEK_STEP);
  const rewind = () => seek(-SEEK_STEP);

  const [playBackRateContent, setPlayBackRateContent] = useState(1);
  const [showPlayBackRate, toggleShowPlayBackRate] = useToggle(false);

  const handlePlayBackRateClick = () => {
    toggleShowPlayBackRate(true);
  };

  const playBackRateValueText = (newVal: number) => {
    player?.playbackRate(newVal);
    setPlayBackRateContent(newVal);
    return '';
  };

  const handleDownload = async () => {
    const audioURL = player!.currentSrc()
    if(audioURL){
      await downloadAndStoreInIDB(audioURL)
    }
  }

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.upperControllerContainer}>
        
      <IconButton
          onClick={handleSkipPrevious}
          className={classes.upperPlayerButton}
        >
          <SkipPreviousOutlined className={classes.upperPlayerIcon} />
        </IconButton>

        <IconButton onClick={rewind} className={classes.upperPlayerButton}>
          <Replay10 className={classes.upperPlayerIcon} />
        </IconButton>


       

        <IconButton
          onClick={handleTogglePlayAndPause}
          className={classes.playPauseButton}
        >
          {paused ? (
            <PlayArrowRounded className={classes.playPauseIcon} />
          ) : (
            <PauseRounded className={classes.playPauseIcon} />
          )}
        </IconButton>

       
        <IconButton onClick={forward} className={classes.upperPlayerButton}>
          <Forward10 className={classes.upperPlayerIcon} />
        </IconButton>
        

        <IconButton
          onClick={handleSkipNext}
          className={classes.upperPlayerButton}
        >
          <SkipNextOutlined className={classes.upperPlayerIcon} />
        </IconButton>
      </Grid>

      <Grid container className={classes.loweControllerContainer}>
        <IconButton
          onClick={handlePlayBackRateClick}
          style={{ fontSize: '1rem' }}
          className={classes.lowerPlayerButton}
        >
          {playBackRateContent}x
        </IconButton>

        <IconButton className={classes.lowerPlayerButton}>
          <BookmarkBorderOutlined className={classes.lowerPlayerIcon} />
        </IconButton>

        <IconButton onClick={handleDownload} className={classes.lowerPlayerButton}>
          <SystemUpdateAltOutlined  className={classes.lowerPlayerIcon} />
        </IconButton>

        <IconButton className={classes.lowerPlayerButton}>
          <Brightness2Outlined  className={classes.lowerPlayerIcon} />
        </IconButton>
      </Grid>

      {showPlayBackRate && (
        <PlayerPlackbackRateSlider
          valueText={playBackRateValueText}
          toggleShowPlayBackRate={toggleShowPlayBackRate}
        />
      )}
    </>
  );
};

export default PlayerController;
