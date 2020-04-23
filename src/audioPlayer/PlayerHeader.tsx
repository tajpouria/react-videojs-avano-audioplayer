import React, { useContext } from 'react';
import { makeStyles, Grid, Typography, IconButton } from '@material-ui/core';
import {
  KeyboardArrowDownRounded,
  FormatListBulletedOutlined,
} from '@material-ui/icons';

import { PlayerContext } from '.';

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerIcon: {
    fontSize: '2rem',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '1rem',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#044950',
  },
  subtitle: {
    fontSize: '.9rem',
    color: '#1e1e1ecf',
    paddingTop: '.4rem',
  },
}));

export interface PlayerHeaderProps {
  toggleShowPlayer: (nextValue?: any) => void;
  title?: string;
  subtitle?: string;
}

const PlayerHeader = () => {
  const {
    playerState: { player },
    ctx: { title = '', subtitle = '', toggleShowPlayer },
  } = useContext(PlayerContext);

  const classes = useStyles();

  const handleArrowDownClick = () => {
    player?.dispose();
    toggleShowPlayer(false);
  };

  return (
    <>
      <Grid className={classes.header}>
        <IconButton onClick={handleArrowDownClick}>
          <KeyboardArrowDownRounded className={classes.headerIcon} />
        </IconButton>

        <IconButton>
          <FormatListBulletedOutlined className={classes.headerIcon} />
        </IconButton>
      </Grid>

      <Grid className={classes.infoContainer}>
        <Typography component="h3" className={classes.title}>
          {title}
        </Typography>

        <Typography component="p" className={classes.subtitle}>
          {subtitle}
        </Typography>
      </Grid>
    </>
  );
};

export default PlayerHeader;
