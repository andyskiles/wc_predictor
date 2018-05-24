import React, { Component } from 'react';
import cx from 'classnames';
import DraggableList from 'react-draggable-list';
import './App.css';

class Group extends Component {
  render() {
    const {item, itemSelected, dragHandle} = this.props;
    const scale = itemSelected * 0.05 + 1;
    const shadow = itemSelected * 15 + 1;
    const dragged = itemSelected !== 0;

    return (
      <div
        className={cx('item', {dragged})}
        style={{
          transform: `scale(${scale})`,
          boxShadow: `rgba(0, 0, 0, 0.3) 0px ${shadow}px ${2 * shadow}px 0px`
        }}
      >
        {dragHandle(<div className="dragHandle" />)}
        <h2>{ item.name }</h2>
      </div>
    );
  }
}

const Game = (props) => {

  const team1 = props.info.teams[0] ? props.info.teams[0] : {name: 'TBD'},
        team2 = props.info.teams[1] ? props.info.teams[1] : {name: 'TBD'};

  return (
    <div className="game">
      <a className={props.info.winner === team1.name ? 'selected' : ''} onClick={() => { props.teamClick(props.info, team1, props.round) }}>{team1.name}</a>
      <a className={props.info.winner === team2.name ? 'selected' : ''} onClick={() => { props.teamClick(props.info, team2, props.round) }}>{team2.name}</a>
    </div>
  );
};

class App extends Component {

    state = {
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
            teams: [{}, {}],
            winner: "",
            ref: "RO16 Game 1 & 2 Winners"
          },
          game_2: {
            teams: [{}, {}],
            winner: "",
            ref: "RO16 Game 3 & 4 Winners"
          },
          game_3: {
            teams: [{}, {}],
            winner: "",
            ref: "RO16 Game 5 & 6 Winners"
          },
          game_4: {
            teams: [{}, {}],
            winner: "",
            ref: "RO16 Game 7 & 8 Winners"
          }
        },
        semi_finals: {
          game_1: {
            teams: [],
            winner: "",
            ref: "QF Game 1 & 2 Winners"
          },
          game_2: {
            teams: [],
            winner: "",
            ref: "QF Game 3 & 4 Winners"
          }
        },
        final: {
          teams: [],
          winner: "",
          ref: "SF Game 1 & 2 Winners"
        }
      }
    };

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
              teams: ro16Matchups.game_1
            },
            game_2: {
              ...prevState.knockout.round_16.game_2,
              teams: ro16Matchups.game_2
            },
            game_3: {
              ...prevState.knockout.round_16.game_3,
              teams: ro16Matchups.game_3
            },
            game_4: {
              ...prevState.knockout.round_16.game_4,
              teams: ro16Matchups.game_4
            },
            game_5: {
              ...prevState.knockout.round_16.game_5,
              teams: ro16Matchups.game_5
            },
            game_6: {
              ...prevState.knockout.round_16.game_6,
              teams: ro16Matchups.game_6
            },
            game_7: {
              ...prevState.knockout.round_16.game_7,
              teams: ro16Matchups.game_7
            },
            game_8: {
              ...prevState.knockout.round_16.game_8,
              teams: ro16Matchups.game_8
            },
          }
        }
      }));

      this.setState({ stage: 'knockout' });
    }

    toGroupStage() {
      this.setState({ stage: 'group' });
    }

    onGameClick(gameInfo, winner, round) {
      const newGameInfo = gameInfo;
      newGameInfo.winner = winner.name;
      const gameKey = `game_${gameInfo.id}`;

      console.log(winner);

      this.setState(prevState => ({
        ...prevState,
        knockout: {
          ...prevState.knockout,
          [round]: {
            ...prevState.knockout[round],
            [gameKey]: {
              ...prevState.knockout[round][gameKey],
              newGameInfo
            }
          }
        }
      }));

      switch (round) {
        case 'round_16':
          switch(gameKey) {
            case 'game_1':
              let gameTeams = this.state.knockout.quarter_finals.game_1.teams;
              gameTeams[0] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_1: {
                      ...prevState.knockout.quarter_finals.game_1,
                      teams: gameTeams
                    }
                  }
                }
              }));
              break;
            case 'game_2':
              let gameTeams2 = this.state.knockout.quarter_finals.game_1.teams;
              gameTeams2[1] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_1: {
                      ...prevState.knockout.quarter_finals.game_1,
                      teams: gameTeams2
                    }
                  }
                }
              }));
              break;
            case 'game_3':
              let gameTeams3 = this.state.knockout.quarter_finals.game_2.teams;
              gameTeams3[0] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_2: {
                      ...prevState.knockout.quarter_finals.game_2,
                      teams: gameTeams3
                    }
                  }
                }
              }));
              break;
            case 'game_4':
              let gameTeams4 = this.state.knockout.quarter_finals.game_2.teams;
              gameTeams4[1] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_2: {
                      ...prevState.knockout.quarter_finals.game_2,
                      teams: gameTeams4
                    }
                  }
                }
              }));
              break;
            case 'game_5':
              let gameTeams5 = this.state.knockout.quarter_finals.game_3.teams;
              gameTeams5[0] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_3: {
                      ...prevState.knockout.quarter_finals.game_3,
                      teams: gameTeams5
                    }
                  }
                }
              }));
              break;
            case 'game_6':
              let gameTeams6 = this.state.knockout.quarter_finals.game_3.teams;
              gameTeams6[1] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_3: {
                      ...prevState.knockout.quarter_finals.game_3,
                      teams: gameTeams6
                    }
                  }
                }
              }));
              break;
            case 'game_7':
              let gameTeams7 = this.state.knockout.quarter_finals.game_4.teams;
              gameTeams7[0] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_4: {
                      ...prevState.knockout.quarter_finals.game_4,
                      teams: gameTeams7
                    }
                  }
                }
              }));
              break;
            case 'game_8':
              let gameTeams8 = this.state.knockout.quarter_finals.game_4.teams;
              gameTeams8[1] = winner;
              this.setState(prevState => ({
                ...prevState,
                knockout: {
                  ...prevState.knockout,
                  quarter_finals: {
                    ...prevState.knockout.quarter_finals,
                    game_4: {
                      ...prevState.knockout.quarter_finals.game_4,
                      teams: gameTeams8
                    }
                  }
                }
              }));
              break;
          }
          break;
        default:
          break;
      }
    }

    render() {
      console.log(this.state.knockout);
      return (
        <div className="main">
          {
            this.state.stage === 'group' ?
            <div>
            <div className="list">
              <h2>Group A</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_a}
                onMoveEnd={newList => this.onListChange(newList, 'group_a')}
              />
            </div>
            <div className="list">
              <h2>Group B</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_b}
                onMoveEnd={newList => this.onListChange(newList, 'group_b')}
              />
            </div>
            <div className="list">
              <h2>Group C</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_c}
                onMoveEnd={newList => this.onListChange(newList, 'group_c')}
              />
            </div>
            <div className="list">
              <h2>Group D</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_d}
                onMoveEnd={newList => this.onListChange(newList, 'group_d')}
              />
            </div>
            <div className="list">
              <h2>Group E</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_e}
                onMoveEnd={newList => this.onListChange(newList, 'group_e')}
              />
            </div>
            <div className="list">
              <h2>Group F</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_f}
                onMoveEnd={newList => this.onListChange(newList, 'group_f')}
              />
            </div>
            <div className="list">
              <h2>Group G</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_g}
                onMoveEnd={newList => this.onListChange(newList, 'group_g')}
              />
            </div>
            <div className="list">
              <h2>Group H</h2>
              <DraggableList
                itemKey="name"
                template={Group}
                list={this.state.group_stage.group_h}
                onMoveEnd={newList => this.onListChange(newList, 'group_h')}
              />
            </div>
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
                    <div className="game">
                      <p>Team 1</p>
                      <p>Team 2</p>
                    </div>
                    <div className="game">
                      <p>Team 1</p>
                      <p>Team 2</p>
                    </div>
                  </div>
                </div>
                <div className="knockout-round">
                  <h2>Final</h2>
                  <div className="knockout-games ko-f">
                    <div className="game">
                      <p>Team 1</p>
                      <p>Team 2</p>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={this.toGroupStage.bind(this)}>GROUP STAGE</button>
            </div>
          }
        </div>
      );
    }
}

export default App;
