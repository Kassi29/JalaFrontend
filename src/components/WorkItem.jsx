import React, { Component } from 'react';

class WorkItem extends Component {
  state = { showOptions: false, listId: '' };

  handleChange = (event) => {
    this.setState({
      listId: event.target.value,
    });
  };

  componentDidMount = () => {
    const { listId } = this.props;
    this.setState({
      listId,
    });
  };

  render() {
    const { workItem = {}, lists = [], onDeleteWorkItem } = this.props;
    const { listId } = this.state;

    const saveWorkItem = () => {
      // should update a work item
    };

    const deleteWorkItem = () => {
      onDeleteWorkItem(Math.random());
    };

    if (workItem.kanbanListId === 2) {
      // Removing the filter for kanbanList == 2
      return <div></div>;
    }

    return (
      <article className="WorkItem">
        <h3>{workItem.title} </h3>
        <div className="WorkItem-description">{workItem.description}</div>
        <div className="WorkItem-options">
          <select
            className="WorkItem-move"
            onChange={this.handleChange}
            value={listId}
          >
            {lists.map((list) => (
              <option value={list.kanbanListId} key={list.kanbanListId}>
                {list.title}
              </option>
            ))}
          </select>
          <button
            type="submit"
            onClick={saveWorkItem}
            className="WorkItem-button success"
          >
            SAVE
          </button>
          <button onClick={deleteWorkItem} className="WorkItem-button delete">
            DELETE
          </button>
        </div>
      </article>
    );
  }
}

export default WorkItem;
