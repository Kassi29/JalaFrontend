import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';

jest.mock('./WorkItem', () => () => <div>Work Item</div>);
describe(List, () => {
  const mockDeleteWorkItem = jest.fn();
  const mockUpdateWorkItem = jest.fn();

  const listData = {
    kanbanListId: 1,
    title: 'To Do',
    order: 1,
    workItems: [
      {
        workItemId: 1,
        title: 'Task 1',
        Description: 'Some description 1',
        kanbanListId: 1,
      },
      {
        workItemId: 2,
        title: 'Task 2',
        description: 'Some description 2',
        kanbanListId: 1,
      },
    ],
  };

  beforeEach(() => {
    render(
      <List
        list={listData}
        lists={[listData]}
        onDeleteWorkItem={mockDeleteWorkItem}
        updateWorkItem={mockUpdateWorkItem}
      />
    );
  });

  it("should render the list's title correctly", () => {
    //ASSERT
    expect(screen.getByText('To Do')).toBeInTheDocument();
  });

  it('should render the correct number of work items', () => {
    // ASSERT
    const workItems = screen.getAllByText('Work Item');
    expect(workItems).toHaveLength(listData.workItems.length);
  });

  it('should display a message when the are not work items', () => {
    //ARRANGE
    const emptyListData = {
      kanbanListId: 1,
      title: 'To Do',
      order: 1,
      workItems: [],
    };

    render(
      <List
        list={emptyListData}
        lists={[emptyListData]}
        onDeleteWorkItem={mockDeleteWorkItem}
        updateWorkItem={mockUpdateWorkItem}
      />
    );

    //ASERT
    expect(
      screen.getByText('There are no work items in this list')
    ).toBeInTheDocument();
  });
});
