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
    const {
      workItem = {},
      lists = [],
      onDeleteWorkItem,
      updateWorkItem,
    } = this.props;
    const { listId } = this.state;

    const saveWorkItem = () => {
      updateWorkItem(workItem.workItemId, listId);
    };

    const deleteWorkItem = () => {
      onDeleteWorkItem(workItem.workItemId);
    };
    return (
      <article className="WorkItem">
        <h3>
          {workItem.title} | {workItem.workItemId}
        </h3>
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
