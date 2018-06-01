import React, { Component } from 'react';
import cx from 'classnames';
import DraggableList from 'react-draggable-list';

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

const GroupStage = (props) => {
  console.log(props);
  return (
    <div>
      <div className="list">
        <h2>Group A</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_a}
          onMoveEnd={newList => props.onListChange(newList, 'group_a')}
        />
      </div>
      <div className="list">
        <h2>Group B</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_b}
          onMoveEnd={newList => props.onListChange(newList, 'group_b')}
        />
      </div>
      <div className="list">
        <h2>Group C</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_c}
          onMoveEnd={newList => props.onListChange(newList, 'group_c')}
        />
      </div>
      <div className="list">
        <h2>Group D</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_d}
          onMoveEnd={newList => props.onListChange(newList, 'group_d')}
        />
      </div>
      <div className="list">
        <h2>Group E</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_e}
          onMoveEnd={newList => props.onListChange(newList, 'group_e')}
        />
      </div>
      <div className="list">
        <h2>Group F</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_f}
          onMoveEnd={newList => props.onListChange(newList, 'group_f')}
        />
      </div>
      <div className="list">
        <h2>Group G</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_g}
          onMoveEnd={newList => props.onListChange(newList, 'group_g')}
        />
      </div>
      <div className="list">
        <h2>Group H</h2>
        <DraggableList
          itemKey="name"
          template={Group}
          list={props.groups.group_h}
          onMoveEnd={newList => props.onListChange(newList, 'group_h')}
        />
      </div>
    </div>
  );
};

export default GroupStage;
