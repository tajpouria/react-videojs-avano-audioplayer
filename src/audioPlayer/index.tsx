import React, { createContext, useReducer, Dispatch } from 'react';
import { VideoJsPlayer } from 'video.js';

import Player, { PlayerProps } from './Player';
import { PlayerHeaderProps } from './PlayerHeader';
import { PlayerProgressBarProps } from './ProgressBar';
import { PlayerControllerProps } from './PlayerController';

interface InitialState {
  player?: VideoJsPlayer;
}

const initialState: InitialState = {
  player: undefined,
};

export const PlayerContext = createContext<{
  playerState: InitialState;
  ctx?: CtxProps;
  playerDispatch: Dispatch<{ type: PlayerAction; payload?: any }>;
}>({
  playerState: initialState,
  playerDispatch: () => null,
});

export enum PlayerAction {
  SET_PLAYER = 'SET_PLAYER',
  PAUSE_PLAYER = 'PAUSE_PLAYER',
  PLAY_PLAYER = 'PLAY_PLAYER',
}

export const playerReducer = (state, action) => {
  switch (action.type) {
    case PlayerAction.SET_PLAYER:
      return Object.assign({}, state, { player: action.payload });

    case PlayerAction.PLAY_PLAYER:
    case PlayerAction.PAUSE_PLAYER:
      return Object.assign({}, state, { paused: !state.paused });

    default:
      return state;
  }
};

type CtxProps = PlayerHeaderProps &
  PlayerProgressBarProps &
  PlayerControllerProps;

interface Props extends PlayerProps {
  ctx: CtxProps;
}

export default (_props: Props) => {
  const { ctx, ...props } = _props;

  const [playerState, playerDispatch] = useReducer(playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ playerState, ctx, playerDispatch }}>
      <Player {...props} />
    </PlayerContext.Provider>
  );
};
