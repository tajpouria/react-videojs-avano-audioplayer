import React, { useEffect, useContext, useState } from 'react';
import { Grid, makeStyles, Avatar, Typography } from '@material-ui/core';

import Roundy from '../common/roundy';
import { secondsToHHMMSS } from '../utils/common';
import { PlayerContext } from '.';

const PROGRESS_BAR_RADIUS = 155,
  MAX_ROUNDY = 500,
  INITIAL_TIME = '00:00:00';

export interface PlayerProgressBarProps {
  image?: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
  },
  roundyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coverImg: {
    position: 'absolute',
    width: PROGRESS_BAR_RADIUS + 100,
    height: PROGRESS_BAR_RADIUS + 100,
  },
  timeContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    transform: 'translateY(-1.2rem)',
  },
  rightTime: {
    marginLeft: PROGRESS_BAR_RADIUS / 2,
    color: '#1e1e1ecf',
  },
  leftTime: {
    marginRight: PROGRESS_BAR_RADIUS / 2,
    color: '#1e1e1ecf',
  },
}));

const ProgressBar = () => {
  const {
    playerState: { player },
    ctx: { image = '' },
  } = useContext(PlayerContext);

  const [progressVal, setProgressVal] = useState<number>(0);

  const [{ currentTime, remainingTime }, setTimes] = useState({
    currentTime: INITIAL_TIME,
    remainingTime: INITIAL_TIME,
  });

  const handleSetCurrentAndRemainingTime = () => {
    const curTime = secondsToHHMMSS(player?.currentTime());
    const strCurTime = `${curTime.hours}:${curTime.minutes}:${curTime.seconds}`;

    // TODO: For some reason current and remaining time not updating on the same time so I ignore updating remaining time for now

    // const remTime = secondsToHHMMSS(player?.remainingTime());
    // const strRemTime = `${remTime.hours}:${remTime.minutes}:${remTime.seconds}`;

    setTimes((times) => ({
      ...times,
      currentTime: strCurTime,
    }));
  };

  useEffect(() => {
    player?.on('canplay', () => {
      const durTime = secondsToHHMMSS(player?.duration());

      setTimes((times) => ({
        ...times,
        remainingTime: 
          `${durTime.hours}:${durTime.minutes}:${durTime.seconds}`,
      }));
    });

    player?.on('timeupdate', () => {
      const percentage =
        (MAX_ROUNDY / player?.duration()) * player?.currentTime() ?? 0;

      setProgressVal(percentage);

      handleSetCurrentAndRemainingTime();
    });
  }, [player]);

  const handleProgressValChange = (newProgressVal: number) => {
    const time = player?.duration() / (MAX_ROUNDY / newProgressVal);

    player?.currentTime(time);

    handleSetCurrentAndRemainingTime();
  };

  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} className={classes.roundyContainer}>
        <Avatar src={image} alt="cover-image" className={classes.coverImg} />
        <Roundy
          value={progressVal}
          min={0}
          max={MAX_ROUNDY}
          sliced={false}
          stepSize={0.5}
          color="#F5859D"
          bgColor="#E4E4E4"
          onChange={handleProgressValChange}
          arcSize={290}
          rotationOffset={-55}
          radius={PROGRESS_BAR_RADIUS}
          strokeWidth={5}
          allowClick
        />
      </Grid>

      <Grid item xs={12} className={classes.timeContainer}>
        <Typography component="h3" className={classes.leftTime}>
        {currentTime}
        </Typography>
        <Typography component="h3" className={classes.rightTime}>
          {remainingTime}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ProgressBar;
