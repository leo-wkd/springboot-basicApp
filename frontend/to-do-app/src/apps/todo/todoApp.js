import React, { Component } from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';

import AuthenticatedRoute from './auth/authenticatedRoute';

import withNavigation from './helper/navigation';
import withParams from './helper/params';

import LoginComponent from './components/loginComponent';
import ListTodosComponent from './components/listTodosComponent';
import WelcomeComponent from './components/welcomeComponent';
import HeaderComponent from './components/headerComponent';
import FooterComponent from './components/footerComponent';
import LogoutComponent from './components/logoutComponent';
import ErrorComponent from './components/errorComponent';
import TodoComponent from './components/todoComponent';


class TodoApp extends Component {
    render() {
        const LoginComponentWithNavi = withNavigation(LoginComponent);
        const WelcomeComponentWithParams = withParams(WelcomeComponent);
        const HeaderComponentWithNavi = withNavigation(HeaderComponent);
        const ListTodosComponentWithNavi = withNavigation(ListTodosComponent);
        const TodoComponentWithNaviAndParams = withParams(withNavigation(TodoComponent));
        return (
            <div className="ToDoApp">
                <BrowserRouter>
                <HeaderComponentWithNavi/>
                <Routes>
                    <Route path="/" element={<LoginComponentWithNavi/>} />
                    <Route path="/login" element={<LoginComponentWithNavi/>} />

                    <Route path="/welcome/:name" element={<AuthenticatedRoute><WelcomeComponentWithParams/></AuthenticatedRoute>} />
                    <Route path="/todos/:id" element={<AuthenticatedRoute><TodoComponentWithNaviAndParams/></AuthenticatedRoute>} />
                    <Route path="/todos" element={<AuthenticatedRoute><ListTodosComponentWithNavi/></AuthenticatedRoute>} />
                    <Route path="/logout" element={<AuthenticatedRoute><LogoutComponent/></AuthenticatedRoute>} />
                    
                    <Route path="*" element={<ErrorComponent/>} /> 
                </Routes>
                <FooterComponent/>
                </BrowserRouter>
            </div>
        )
    }
}


export default TodoApp;