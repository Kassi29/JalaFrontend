import React, { Component } from 'react';

import WorkItem from './WorkItem';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = { showOptions: false };
  }

  toggleOptions = () => {
    this.setState(({ showOptions }) => ({ showOptions: !showOptions }));
  };

  render() {
    const { list = {}, lists, onDeleteWorkItem } = this.props;
    const workItems = list.workItems || [];
    const hasWorkItems = workItems.length > 0;
    return (
      <article className="List">
        <h2>{list.title}</h2>
        {!hasWorkItems && (
          <p className="List-info">There are no work items in this list</p>
        )}
        <div>
          {workItems.map((workItem) => (
            <WorkItem
              key={workItem.workItemId}
              workItem={workItem}
              listId={list.kanbanListId}
              lists={lists}
              onDeleteWorkItem={onDeleteWorkItem}
            />
          ))}
        </div>
      </article>
    );
  }
}

export default List;
