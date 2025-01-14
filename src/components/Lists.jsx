import React from 'react';
import List from './List';

const Lists = ({ lists, onDeleteWorkItem }) => {
  return (
    <section className="Lists">
      {lists.map((list) => (
        <List
          list={list}
          lists={lists}
          key={list.kanbanListId}
          onDeleteWorkItem={onDeleteWorkItem}
        />
      ))}
    </section>
  );
};

export default Lists;
