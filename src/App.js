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

class App extends Component {

    state = {
      name: '',
      username: '',
      list: [
        {name: 'Egypt'},
        {name: 'Russia'},
        {name: 'Saudi Arabia'},
        {name: 'Uruguay'},
      ],
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
            teams: [],
            winner: "",
            ref: "Group A Winner vs. Group B Runner-up"
          },
          game_2: {
            teams: [],
            winner: "",
            ref: "Group C Winner vs. Group D Runner-up"
          },
          game_3: {
            teams: [],
            winner: "",
            ref: "Group E Winner vs. Group F Runner-up"
          },
          game_4: {
            teams: [],
            winner: "",
            ref: "Group G Winner vs. Group H Runner-up"
          },
          game_5: {
            teams: [],
            winner: "",
            ref: "Group B Winner vs. Group A Runner-up"
          },
          game_6: {
            teams: [],
            winner: "",
            ref: "Group D Winner vs. Group C Runner-up"
          },
          game_7: {
            teams: [],
            winner: "",
            ref: "Group F Winner vs. Group E Runner-up"
          },
          game_8: {
            teams: [],
            winner: "",
            ref: "Group H Winner vs Group G Runner-up"
          }
        },
        quarter_finals: {
          game_1: {
            teams: [],
            winner: "",
            ref: "RO16 Game 1 & 2 Winners"
          },
          game_2: {
            teams: [],
            winner: "",
            ref: "RO16 Game 3 & 4 Winners"
          },
          game_3: {
            teams: [],
            winner: "",
            ref: "RO16 Game 5 & 6 Winners"
          },
          game_4: {
            teams: [],
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
    }

    render() {

      return (
        <div className="main">
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
            <h2>Group C</h2>
            <DraggableList
              itemKey="name"
              template={Group}
              list={this.state.group_stage.group_d}
              onMoveEnd={newList => this.onListChange(newList, 'group_d')}
            />
          </div>
          <div className="list">
            <DraggableList
              itemKey="name"
              template={Group}
              list={this.state.group_stage.group_e}
              onMoveEnd={newList => this.onListChange(newList, 'group_e')}
            />
          </div>
          <div className="list">
            <DraggableList
              itemKey="name"
              template={Group}
              list={this.state.group_stage.group_f}
              onMoveEnd={newList => this.onListChange(newList, 'group_f')}
            />
          </div>
          <div className="list">
            <DraggableList
              itemKey="name"
              template={Group}
              list={this.state.group_stage.group_g}
              onMoveEnd={newList => this.onListChange(newList, 'group_g')}
            />
          </div>
          <div className="list">
            <DraggableList
              itemKey="name"
              template={Group}
              list={this.state.group_stage.group_h}
              onMoveEnd={newList => this.onListChange(newList, 'group_h')}
            />
          </div>
        </div>
      );
    }
}

export default App;
