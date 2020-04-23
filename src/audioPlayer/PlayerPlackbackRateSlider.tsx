import React from "react";
import { makeStyles, IconButton, Paper, Slider } from "@material-ui/core";

import { CloseRounded } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  bg: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000000",
    opacity: 0.4
  },
  closeBtn: {
    position: "absolute",
    left: "1%",
    top: "1%"
  },
  closeIcon: {
    fontSize: "2rem"
  },
  sliderOuterPaper: {
    zIndex: 4,
    height: 80,
    width: "90%",
    maxWidth: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 20px 24px 0 rgba(0,0,0,0.25)",
    borderRadius: "1.5rem"
  },
  sliderInnerPaper: {
    display: "flex",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    backgroundColor: "#d4d4d4",
    border: ".6px solid #8e8e8e",
    borderRadius: "2rem",
    boxShadow: "none"
  },
  slider: {
    width: "80%"
  }
}));

const marks = [
  {
    value: 0.25,
    label: "0.25"
  },
  {
    value: 0.5,
    label: "0.5"
  },
  {
    value: 0.75,
    label: "0.75"
  },
  {
    value: 1,
    label: "1"
  },
  {
    value: 1.25,
    label: "1.25"
  },
  {
    value: 1.5,
    label: "1.5"
  },
  {
    value: 1.75,
    label: "1.75"
  },
  {
    value: 2,
    label: "2"
  }
];

interface PlayerPlaybackRateSliderProps {
  valueText: (newVal?: number) => string;
  toggleShowPlayBackRate: (nexVal: any) => void;
}

const PlayerPlaybackRateSlider = ({
  valueText,
  toggleShowPlayBackRate
}: PlayerPlaybackRateSliderProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        onClick={() => toggleShowPlayBackRate(false)}
        className={classes.bg}
      />
      <IconButton
        onClick={() => toggleShowPlayBackRate(false)}
        className={classes.closeBtn}
      >
        <CloseRounded
          style={{ fill: "#FFFFFF" }}
          className={classes.closeIcon}
        />
      </IconButton>

      <Paper className={classes.sliderOuterPaper}>
        <Paper className={classes.sliderInnerPaper}>
          <Slider
            track="normal"
            color="secondary"
            className={classes.slider}
            defaultValue={1}
            getAriaValueText={valueText}
            valueLabelDisplay="auto"
            step={0.25}
            marks={marks}
            min={0.25}
            max={2}
          />
        </Paper>
      </Paper>
    </div>
  );
};

export default PlayerPlaybackRateSlider;
