import React, { useEffect, useContext } from 'react';
import videojs from 'video.js';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import 'video.js/dist/video-js.css';

import { PlayerContext, PlayerAction } from '.';
import ProgressBar from './ProgressBar';
import PlayerController from './PlayerController';
import PlayerHeader from './PlayerHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    zIndex: 3,
  },
  audioEl: {
    display: 'none',
  },
}));

export type PlayerProps = {
  src: string;
  autoplay?: boolean;
};

const Player = ({ src, ...props }) => {
  const {
    playerState: { player },
    playerDispatch,
  } = useContext(PlayerContext);

  let videoNode: any;

  useEffect(() => {
    playerDispatch({
      type: PlayerAction.SET_PLAYER,
      payload: videojs(
        videoNode,
        { sources: [{ src }], ...props },
        function onPlayerReady() {},
      ),
    });

    return () => player?.dispose();
  }, []);

  useEffect(() => {
    player?.src(src);
  }, [src]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PlayerHeader />

      <ProgressBar />

      <PlayerController />

      <div data-vjs-player>
        <audio
          ref={(node) => (videoNode = node)}
          className={clsx('video-js', classes.audioEl)}
        />
      </div>
    </div>
  );
};

export default Player;
