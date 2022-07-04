import { jpaUrl } from './baseUrl';
const axios = require('axios');

class TodoListService {
    retrieveAllTodos(name) {
        return axios.get(jpaUrl + `/users/${name}/todos`);
    }
    deleteTodo(name, id) {
        return axios.delete(jpaUrl + `/users/${name}/todos/${id}`);
    }
    retrieveTodo(name, id) {
        return axios.get(jpaUrl + `/users/${name}/todos/${id}`);
    }
    updateTodo(name, id, todo) {
        return axios.put(jpaUrl + `/users/${name}/todos/${id}`, todo);
    }
    createTodo(name, todo) {
        return axios.post(jpaUrl + `/users/${name}/todos`, todo);
    }
}

export default new TodoListService();