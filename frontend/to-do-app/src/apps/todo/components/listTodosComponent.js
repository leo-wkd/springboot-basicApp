import React, { Component } from 'react';
import TodoListService from '../api/todoListService';
import AuthenticationService from '../auth/authenticationService';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';

class ListTodosComponent extends Component { 
    constructor(props) {
        super();
        this.state = {
            todos: [],
            message: null,
        };

        this.fetchAllTodos = this.fetchAllTodos.bind(this);
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this);
        this.updateTodoClicked = this.updateTodoClicked.bind(this);
        this.addTodoClicked = this.addTodoClicked.bind(this);
    }

    componentDidMount() {
        this.fetchAllTodos();
    }

    updateTodoClicked(id) {
        this.props.navigate(`/todos/${id}`);
    }

    addTodoClicked() {
        this.props.navigate(`/todos/-1`);
    }
    
    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName();
        TodoListService.deleteTodo(username, id)
        .then(
            response => {
                this.setState({message: `Delete of todo ${id}`});
                this.fetchAllTodos();
            }
        );
    }

    fetchAllTodos() {
        let username = AuthenticationService.getLoggedInUserName();
        TodoListService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({ todos: response.data });
            }
        )
    }

    render() {
        return(
            <div>
                <h1>
                    List ToDos
                </h1>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <div className='container'>
                <table className='table' style={{fontSize: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>IsCompleted</th>
                            <th>Target Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.todos.map(
                            todo => 
                            <tr key={todo.id}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button onClick={() => this.updateTodoClicked(todo.id)} className='btn btn-success'>Edit</button></td>
                                <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Delele</button></td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                </div>
                <Row>
                    <Col><button onClick={this.addTodoClicked} className='btn btn-success'>
                        Add
                        </button>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </div>
        )     
    }
}

export default ListTodosComponent;