const bracketUpdater = (bracket, round, gameKey, winner) => {
  const newBracket = bracket;
  const round16 = newBracket.round_16;
  const quarterFinals = newBracket.quarter_finals;
  const semiFinals = newBracket.semi_finals;
  const final = newBracket.final;

  console.log(round);
  console.log(gameKey);

  // set winner
  if (round !== 'final') {
    newBracket[round][gameKey].winner = winner;
  } else {
    newBracket.final.winner = winner;
  }

  if (round === 'round_16') {
    if (gameKey === 'game_1' || gameKey === 'game_2') {
      quarterFinals.game_1.winner = '';
    } else if (gameKey === 'game_3' || gameKey === 'game_4') {
      quarterFinals.game_2.winner = '';
    } else if (gameKey === 'game_5' || gameKey === 'game_6') {
      quarterFinals.game_3.winner = '';
    } else {
      quarterFinals.game_4.winner = '';
    }
  }

  // round 16 updater
  round16.game_1.winner !== '' ?
    quarterFinals.game_1.teams[0] = round16.game_1.winner
    : '';

  round16.game_2.winner !== '' ?
    quarterFinals.game_1.teams[1] = round16.game_2.winner
    : '';

  round16.game_3.winner !== '' ?
    quarterFinals.game_2.teams[0] = round16.game_3.winner
    : '';

  round16.game_4.winner !== '' ?
    quarterFinals.game_2.teams[1] = round16.game_4.winner
    : '';

  round16.game_5.winner !== '' ?
    quarterFinals.game_3.teams[0] = round16.game_5.winner
    : '';

  round16.game_6.winner !== '' ?
    quarterFinals.game_3.teams[1] = round16.game_6.winner
    : '';

  round16.game_7.winner !== '' ?
    quarterFinals.game_4.teams[0] = round16.game_7.winner
    : '';

  round16.game_8.winner !== '' ?
    quarterFinals.game_4.teams[1] = round16.game_8.winner
    : '';

  quarterFinals.game_1.winner !== '' ?
    semiFinals.game_1.teams[0] = quarterFinals.game_1.winner
    : '';

  quarterFinals.game_2.winner !== '' ?
    semiFinals.game_1.teams[1] = quarterFinals.game_2.winner
    : '';

  quarterFinals.game_3.winner !== '' ?
    semiFinals.game_2.teams[0] = quarterFinals.game_3.winner
    : '';

  quarterFinals.game_4.winner !== '' ?
    semiFinals.game_2.teams[1] = quarterFinals.game_4.winner
    : '';

  semiFinals.game_1.winner !== '' ?
    final.teams[0] = semiFinals.game_1.winner
    : '';

  semiFinals.game_2.winner !== '' ?
    final.teams[1] = semiFinals.game_2.winner
    : '';

  if (semiFinals.game_1.teams[0].name) {
    const team = semiFinals.game_1.teams[0];

    const quarterTeams = quarterFinals.game_1.teams.filter(qteam => {
      return qteam.name === team.name;
    });

    if (quarterTeams.length === 0) {
      semiFinals.game_1.teams[0] = {};
      semiFinals.game_1.winner = '';
      final.winner = '';
    }
  }

  if (semiFinals.game_1.teams[1].name) {
    const team = semiFinals.game_1.teams[1];

    const quarterTeams = quarterFinals.game_2.teams.filter(qteam => {
      return qteam.name === team.name;
    });

    if (quarterTeams.length === 0) {
      semiFinals.game_1.teams[1] = {};
      semiFinals.game_1.winner = '';
      final.winner = '';
    }
  }

  if (semiFinals.game_2.teams[0].name) {
    const team = semiFinals.game_2.teams[0];

    const quarterTeams = quarterFinals.game_3.teams.filter(qteam => {
      return qteam.name === team.name;
    });

    if (quarterTeams.length === 0) {
      semiFinals.game_2.teams[0] = {};
      semiFinals.game_2.winner = '';
      final.winner = '';
    }
  }

  if (semiFinals.game_2.teams[1].name) {
    const team = semiFinals.game_2.teams[1];

    const quarterTeams = quarterFinals.game_4.teams.filter(qteam => {
      return qteam.name === team.name;
    });

    if (quarterTeams.length === 0) {
      semiFinals.game_2.teams[1] = {};
      semiFinals.game_2.winner = '';
      final.winner = '';
    }
  }

  if (final.teams[0].name) {
    const team = final.teams[0];

    const sTeams = semiFinals.game_1.teams.filter(sTeam => {
      return sTeam.name === team.name;
    });

    if (sTeams.length === 0) {
      final.teams[0] = {};
      final.winner = '';
    }
  }

  if (final.teams[1].name) {
    const team = final.teams[1];

    const sTeams = semiFinals.game_2.teams.filter(sTeam => {
      return sTeam.name === team.name;
    });

    if (sTeams.length === 0) {
      final.teams[1] = {};
      final.winner = '';
    }
  }

  return newBracket;
}

export default bracketUpdater;