import React, { Component } from 'react';

const Game = (props) => {

  const team1 = props.info.teams[0] ? props.info.teams[0] : '',
        team2 = props.info.teams[1] ? props.info.teams[1] : '';

  return (
    <div className="game">
      <a className={props.info.winner.name === team1.name ? 'selected' : ''} onClick={() => { props.teamClick(props.info, team1, props.round) }}>{team1.name}</a>
      <a className={props.info.winner.name === team2.name ? 'selected' : ''} onClick={() => { props.teamClick(props.info, team2, props.round) }}>{team2.name}</a>
    </div>
  );
};

export default Game;
