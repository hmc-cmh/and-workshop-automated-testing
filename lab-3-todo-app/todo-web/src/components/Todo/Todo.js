import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { bool, string } from 'prop-types';
import Divider from '@material-ui/core/Divider/Divider';
import TextField from '@material-ui/core/TextField/TextField';
import Fab from '@material-ui/core/Fab/Fab';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const TODO_API_URL = process.env.REACT_APP_TODO_API_URL;

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      todos: [],
    };

    this.getTodos = this.getTodos.bind(this);
    this.createTodo = this.createTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.getTodos();
  }

  /**
   * Retrieves a list of tasks from the backend.
   */
  async getTodos() {
    const { data } = await axios.get(TODO_API_URL);
    this.setState({
      todos: data,
    });
  }

  /**
   * Retrieves the text value from the state and creates a task using the API,
   * then resets the value of the text.
   */
  async createTodo() {
    const { text } = this.state;
    const { data } = await axios.post(TODO_API_URL, { text });
    this.setState(prevState => ({
      todos: [...prevState.todos, data],
      text: '',
    }));
  }

  /**
   * Updates the status ('completed' field) of a given task and sets the 'todos' state
   * with the new 'completed' value of the specific updated task.
   */
  async updateTodo(todo) {
    const { todos } = this.state;
    const { id, completed } = todo;
    const newStatus = !completed;
    const itemToUpdate = todos.findIndex(t => t.id === id);

    await axios.put(`${TODO_API_URL}/${id}`, { completed: newStatus });
    todos[itemToUpdate].completed = newStatus;
    this.setState({ todos });
  }

  /**
   * Deletes a given task and sets the 'todos' state to exclude the deleted task.
   */
  async deleteTodo(todo) {
    const { id } = todo;
    await axios.delete(`${TODO_API_URL}/${id}`);
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== id),
    }));
  }

  handleChange(evt) {
    this.setState({
      text: evt.target.value,
    });
  }

  render() {
    const { text, todos } = this.state;
    const { label, autoFocus } = this.props;
    return (
      <Fragment>
        <div style={{ display: 'flex' }}>
          <TextField
            data-test-id="textfield"
            type="text"
            name="task"
            label={label}
            value={text}
            autoFocus={autoFocus}
            onChange={this.handleChange}
            variant="outlined"
            style={{ flex: 1 }}
          />

          <Fab
            disabled={!text}
            data-test-id="fabbutton"
            onClick={this.createTodo}
            size="medium"
            color="primary"
            style={{ marginLeft: 8 }}
          >
            <AddIcon />
          </Fab>
        </div>

        <Divider style={{ marginTop: 18, marginBottom: 12 }} />

        <div style={{ display: 'block' }}>
          <Typography variant="h5">My todo list</Typography>

          {todos.length ? (
            <List data-test-id="list">
              {todos.map(todo => (
                <ListItem key={todo.id} button onClick={() => this.updateTodo(todo)}>
                  <Checkbox data-test-id="check" checked={todo.completed} color="secondary" />

                  <ListItemText primary={todo.text} />

                  <ListItemSecondaryAction>
                    <IconButton data-test-id="bin" onClick={() => this.deleteTodo(todo)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="subheading" color="secondary" style={{ paddingTop: 16 }}>
              Waiting for you to add tasks...
            </Typography>
          )}
        </div>
      </Fragment>
    );
  }
}

Todo.propTypes = {
  label: string.isRequired,
  autoFocus: bool,
};

Todo.defaultProps = {
  autoFocus: false,
};

export default Todo;
