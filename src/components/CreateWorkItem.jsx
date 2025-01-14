import React, { Component } from 'react';

class CreateWorkItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  get isValid() {
    const { title, description } = this.state;
    return title && description;
  }

  get isInvalid() {
    return !this.isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.isInvalid) return;

    const { onCreateWorkItem, listId } = this.props;

    if (onCreateWorkItem) {
      onCreateWorkItem(listId, this.state);
    }

    this.setState({
      title: '',
      description: '',
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <form className="CreateWorkItem" onSubmit={this.handleSubmit}>
        <input
          className="CreateWorkItem-title"
          onChange={this.handleChange}
          name="title"
          placeholder="Title"
          type="text"
          value={title}
        />
        <input
          className="CreateWorkItem-description"
          onChange={this.handleChange}
          placeholder="Description"
          name="description"
          type="text"
          value={description}
        />
        <input
          className="CreateWorkItem-submit"
          type="submit"
          value="Create Work Item"
          disabled={this.isInvalid}
        />
      </form>
    );
  }
}

export default CreateWorkItem;
