import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateWorkItem from './CreateWorkItem';

describe(CreateWorkItem, () => {
  let titleInput, descriptionInput, submitButton;

  beforeEach(() => {
    // ARRANGE
    render(<CreateWorkItem onCreateWorkItem={() => {}} listId={1} />);

    titleInput = screen.getByPlaceholderText('Title');
    descriptionInput = screen.getByPlaceholderText('Description');
    submitButton = screen.getByText('Create Work Item');
  });

  it('the button create has to disabled if title or description is empty', () => {
    //ASSERT
    expect(submitButton).toBeDisabled();
    //ACT
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    //ASSERT
    expect(submitButton).toBeDisabled();
    //ACT
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.change(titleInput, { target: { value: '' } });
    //ASSERT
    expect(submitButton).toBeDisabled();
  });

  it('the button should be enabled if title and descripcion have a content', () => {
    //ACT
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    //ASSERT
    expect(submitButton).toBeEnabled();
  });

  it('the form should reset after clicking the submit button', () => {
    //ACT
    fireEvent.change(titleInput, { target: { value: 'New Task' } });
    fireEvent.change(descriptionInput, { target: { value: 'Description' } });
    fireEvent.click(submitButton);

    //ASSERT
    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
    expect(submitButton).toBeDisabled();
  });
});
