import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WorkItem from './WorkItem';

describe(WorkItem, () => {
  const mockDeleteWorkItem = jest.fn();
  const mockUpdateWorkItem = jest.fn();

  const listData = [
    {
      kanbanListId: 1,
      title: 'To Do',
    },
    {
      kanbanListId: 2,
      title: 'In Progress',
    },
  ];

  const workItem = {
    workItemId: 1,
    title: 'Task 1',
    description: 'Some description 1',
    kanbanListId: 1,
  };

  beforeEach(() => {
    render(
      <WorkItem
        workItem={workItem}
        lists={listData}
        onDeleteWorkItem={mockDeleteWorkItem}
        updateWorkItem={mockUpdateWorkItem}
      />
    );
  });

  it('should call onDeleteWorkItem when the delete button is clicked', () => {
    //ACTION
    fireEvent.click(screen.getByText('DELETE'));
    expect(mockDeleteWorkItem).toHaveBeenCalledWith(workItem.workItemId);
  });

  it('should call on saveWorkItem when the save button is clicked after selecting a new kanban list', () => {
    //ASSERT
    expect(screen.getByRole('combobox')).toHaveValue('1');
    //ACTION
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    fireEvent.click(screen.getByText('SAVE'));
    expect(mockUpdateWorkItem).toHaveBeenCalledWith(workItem.workItemId, '2');
  });
});
