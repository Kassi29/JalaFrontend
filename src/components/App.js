import React, { Component } from 'react';
import CreateWorkItem from './CreateWorkItem';
import Lists from './Lists';

class Application extends Component {
  constructor(props) {
    super(props);
    this.state = { defaultList: 0, error: null, isLoaded: false, lists: [] };
  }

  createWorkItem = (kanbanListId, { title, description }) => {
    const newWorkItem = {
      title,
      description,
      kanbanListId,
    };

    fetch(`${process.env.REACT_APP_KANBAN_BOARD_API}/workitems`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newWorkItem),
    })
      .then((res) => res.json())
      .then(
        () => {
          this.fetchKanbanLists();
        },
        (error) => {
          console.log('Error on create: ', error);
        }
      );
  };

  updateWorkItem = async (workItemId, kanbanListId) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_KANBAN_BOARD_API}/workitems/${workItemId}/${kanbanListId}`,
        {
          method: 'PATCH',
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update WorkItem's kanban list ");
      }
      this.fetchKanbanLists();
    } catch (error) {
      console.log('Error to update: ', error);
    }
  };

  deleteWorkItem = (workItemId) => {
    fetch(`${process.env.REACT_APP_KANBAN_BOARD_API}/workitems/${workItemId}`, {
      method: 'DELETE',
    }).then(
      () => {
        this.fetchKanbanLists();
      },
      (error) => {
        console.log('Error on delete: ', error);
      }
    );
  };

  fetchKanbanLists = () => {
    fetch(`${process.env.REACT_APP_KANBAN_BOARD_API}/kanbanlists`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            lists: result,
            defaultList: result[0].kanbanListId,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentDidMount() {
    this.fetchKanbanLists();
  }

  render() {
    const { error, isLoaded, lists } = this.state;

    if (error) {
      return <div className="error">Error: {error.message}</div>;
    }

    if (!isLoaded) {
      return <div className="loading">Loading...</div>;
    }

    return (
      <>
        <header className="Header">
          <h1>Kanban Board</h1>
          <section>
            <CreateWorkItem
              onCreateWorkItem={this.createWorkItem}
              listId={this.state.defaultList}
            />
          </section>
        </header>
        <main className="Application">
          <section>
            <Lists
              lists={lists}
              onDeleteWorkItem={this.deleteWorkItem}
              updateWorkItem={this.updateWorkItem}
            />
          </section>
        </main>
        <footer className="Footer">
          <h2>Jalasoft DevTest 2020</h2>
        </footer>
      </>
    );
  }
}

export default Application;
