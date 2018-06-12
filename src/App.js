import React, { Component } from 'react';
import firebase from './firebase';
import GroupStage from './components/GroupStage';
import Game from './components/Game';
import bracketUpdater from './bracket';
import './App.css';

class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        name: '',
        username: '',
        stage: 'group',
        group_stage: {
          group_a: [
            {id: 1, name: "Egypt", group: "A"},
            {id: 2, name: "Russia", group: "A"},
            {id: 3, name: "Saudi Arabia", group: "A"},
            {id: 4, name: "Uruguay", group: "A"}
          ],
          group_b: [
            {id: 5, name: "Iran", group: "B"},
            {id: 6, name: "Morocco", group: "B"},
            {id: 7, name: "Portugal", group: "B"},
            {id: 8, name: "Spain", group: "B"}
          ],
          group_c: [
            {id: 9, name: "Australia", group: "C"},
            {id: 10, name: "Denmark", group: "C"},
            {id: 11, name: "France", group: "C"},
            {id: 12, name: "Peru", group: "C"}
          ],
          group_d: [
            {id: 13, name: "Argentina", group: "D"},
            {id: 14, name: "Croatia", group: "D"},
            {id: 15, name: "Iceland", group: "D"},
            {id: 16, name: "Nigeria", group: "D"}
          ],
          group_e: [
            {id: 17, name: "Brazil", group: "E"},
            {id: 18, name: "Costa Rica", group: "E"},
            {id: 19, name: "Serbia", group: "E"},
            {id: 20, name: "Switzerland", group: "E"}
          ],
          group_f: [
            {id: 21, name: "Germany", group: "F"},
            {id: 22, name: "South Korea", group: "F"},
            {id: 23, name: "Mexico", group: "F"},
            {id: 24, name: "Sweden", group: "F"}
          ],
          group_g: [
            {id: 25, name: "Belgium", group: "G"},
            {id: 26, name: "England", group: "G"},
            {id: 27, name: "Panama", group: "G"},
            {id: 28, name: "Tunisia", group: "G"}
          ],
          group_h: [
            {id: 29, name: "Colombia", group: "H"},
            {id: 30, name: "Japan", group: "H"},
            {id: 31, name: "Poland", group: "H"},
            {id: 32, name: "Senegal", group: "H"}
          ]
        },
        knockout: {
          round_16: {
            game_1: {
              id: 1,
              teams: [],
              winner: "",
              ref: "Group A Winner vs. Group B Runner-up"
            },
            game_2: {
              id: 2,
              teams: [],
              winner: "",
              ref: "Group C Winner vs. Group D Runner-up"
            },
            game_3: {
              id: 3,
              teams: [],
              winner: "",
              ref: "Group E Winner vs. Group F Runner-up"
            },
            game_4: {
              id: 4,
              teams: [],
              winner: "",
              ref: "Group G Winner vs. Group H Runner-up"
            },
            game_5: {
              id: 5,
              teams: [],
              winner: "",
              ref: "Group B Winner vs. Group A Runner-up"
            },
            game_6: {
              id: 6,
              teams: [],
              winner: "",
              ref: "Group D Winner vs. Group C Runner-up"
            },
            game_7: {
              id: 7,
              teams: [],
              winner: "",
              ref: "Group F Winner vs. Group E Runner-up"
            },
            game_8: {
              id: 8,
              teams: [],
              winner: "",
              ref: "Group H Winner vs Group G Runner-up"
            }
          },
          quarter_finals: {
            game_1: {
              id: 1,
              teams: [{}, {}],
              winner: "",
              ref: "RO16 Game 1 & 2 Winners"
            },
            game_2: {
              id: 2,
              teams: [{}, {}],
              winner: "",
              ref: "RO16 Game 3 & 4 Winners"
            },
            game_3: {
              id: 3,
              teams: [{}, {}],
              winner: "",
              ref: "RO16 Game 5 & 6 Winners"
            },
            game_4: {
              id: 4,
              teams: [{}, {}],
              winner: "",
              ref: "RO16 Game 7 & 8 Winners"
            }
          },
          semi_finals: {
            game_1: {
              id: 1,
              teams: [{}, {}],
              winner: "",
              ref: "QF Game 1 & 2 Winners"
            },
            game_2: {
              id: 2,
              teams: [{}, {}],
              winner: "",
              ref: "QF Game 3 & 4 Winners"
            }
          },
          final: {
            id: 1,
            teams: [{}, {}],
            winner: "",
            ref: "SF Game 1 & 2 Winners"
          }
        }
      };

      this.onListChange = this.onListChange.bind(this);
    }

    onListChange(newList, group) {
      this.setState(prevState => ({
        ...prevState,
        group_stage: {
          ...prevState.group_stage,
          [group]: newList
        }
      }));
    };

    toKnockout() {
      // order should already be set at this point
      const ro16Matchups = {
        game_1: [
          this.state.group_stage.group_a[0],
          this.state.group_stage.group_b[1],
        ],
        game_2: [
          this.state.group_stage.group_c[0],
          this.state.group_stage.group_d[1],
        ],
        game_3: [
          this.state.group_stage.group_e[0],
          this.state.group_stage.group_f[1],
        ],
        game_4: [
          this.state.group_stage.group_g[0],
          this.state.group_stage.group_h[1],
        ],
        game_5: [
          this.state.group_stage.group_b[0],
          this.state.group_stage.group_a[1],
        ],
        game_6: [
          this.state.group_stage.group_d[0],
          this.state.group_stage.group_c[1],
        ],
        game_7: [
          this.state.group_stage.group_f[0],
          this.state.group_stage.group_e[1],
        ],
        game_8: [
          this.state.group_stage.group_h[0],
          this.state.group_stage.group_g[1],
        ]
      };

      // update RO16 states
      this.setState(prevState => ({
        ...prevState,
        knockout: {
          ...prevState.knockout,
          round_16: {
            ...prevState.knockout.round_16,
            game_1: {
              ...prevState.knockout.round_16.game_1,
              teams: ro16Matchups.game_1,
              winner: '',
            },
            game_2: {
              ...prevState.knockout.round_16.game_2,
              teams: ro16Matchups.game_2,
              winner: '',
            },
            game_3: {
              ...prevState.knockout.round_16.game_3,
              teams: ro16Matchups.game_3,
              winner: '',
            },
            game_4: {
              ...prevState.knockout.round_16.game_4,
              teams: ro16Matchups.game_4,
              winner: '',
            },
            game_5: {
              ...prevState.knockout.round_16.game_5,
              teams: ro16Matchups.game_5,
              winner: '',
            },
            game_6: {
              ...prevState.knockout.round_16.game_6,
              teams: ro16Matchups.game_6,
              winner: '',
            },
            game_7: {
              ...prevState.knockout.round_16.game_7,
              teams: ro16Matchups.game_7,
              winner: '',
            },
            game_8: {
              ...prevState.knockout.round_16.game_8,
              teams: ro16Matchups.game_8,
              winner: '',
            },
          }
        }
      }));

      const ro16 = [
        ro16Matchups.game_1,
        ro16Matchups.game_2,
        ro16Matchups.game_3,
        ro16Matchups.game_4,
        ro16Matchups.game_5,
        ro16Matchups.game_6,
        ro16Matchups.game_7,
        ro16Matchups.game_8
      ];

      // reset knockout passed ro16 teams & winners
      const knockout = this.state.knockout;

      Object.keys(knockout.quarter_finals).forEach((key) => {
        knockout.quarter_finals[key].winner = '';
        knockout.quarter_finals[key].teams[0] = {};
        knockout.quarter_finals[key].teams[1] = {};
      });

      Object.keys(knockout.semi_finals).forEach((key) => {
        knockout.semi_finals[key].winner = '';
        knockout.semi_finals[key].teams[0] = {};
        knockout.semi_finals[key].teams[1] = {};
      });

      knockout.final.winner = '';
      knockout.final.teams[0] = {};
      knockout.final.teams[1] = {};

      this.setState({ stage: 'knockout' });
    }

    toGroupStage() {
      this.setState({ stage: 'group' });
    }

    onGameClick(gameInfo, winner, round) {
      const newGameInfo = gameInfo;
      newGameInfo.winner = winner.name;
      const gameKey = `game_${gameInfo.id}`;

      const updatedKnockout = bracketUpdater(this.state.knockout, round, gameKey, winner);

      this.setState({ knockout: updatedKnockout });
    }

    submitPicks() {
      const picks = firebase.database().ref('picks');
      picks.push(this.state);
    }

    render() {
      return (
        <div className="main">
          {
            this.state.stage === 'group' ?
            <div>
              <GroupStage groups={this.state.group_stage} onListChange={this.onListChange} />
              <button onClick={this.toKnockout.bind(this)}>VAMOS</button>
            </div>
          : <div className="knockout">
              <h1>Knockout</h1>
              <div className="knockout-rounds">
                <div className="knockout-round">
                  <h2>Round of 16</h2>
                  <div className="knockout-games ko-16">
                    <Game info={this.state.knockout.round_16.game_1} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_2} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_3} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_4} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_5} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_6} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_7} round="round_16" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.round_16.game_8} round="round_16" teamClick={this.onGameClick.bind(this)} />
                  </div>
                </div>
                <div className="knockout-round">
                  <h2>Quarter-Finals</h2>
                  <div className="knockout-games ko-qf">
                    <Game info={this.state.knockout.quarter_finals.game_1} round="quarter_finals" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.quarter_finals.game_2} round="quarter_finals" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.quarter_finals.game_3} round="quarter_finals" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.quarter_finals.game_4} round="quarter_finals" teamClick={this.onGameClick.bind(this)} />
                  </div>
                </div>
                <div className="knockout-round">
                  <h2>Semi-Finals</h2>
                  <div className="knockout-games ko-sf">
                    <Game info={this.state.knockout.semi_finals.game_1} round="semi_finals" teamClick={this.onGameClick.bind(this)} />
                    <Game info={this.state.knockout.semi_finals.game_2} round="semi_finals" teamClick={this.onGameClick.bind(this)} />
                  </div>
                </div>
                <div className="knockout-round">
                  <h2>Final</h2>
                  <div className="knockout-games ko-f">
                    <Game info={this.state.knockout.final} round="final" teamClick={this.onGameClick.bind(this)} />
                  </div>
                </div>
              </div>
              <button onClick={this.submitPicks.bind(this)}>SUBMIT</button>
              <button onClick={this.toGroupStage.bind(this)}>GROUP STAGE</button>
            </div>
          }
        </div>
      );
    }
}

export default App;
