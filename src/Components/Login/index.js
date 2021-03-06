import React, { Component } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

class Login extends Component {
    state = {
        email: '',
        password: '',
        redirect: false,
        articleandNote: []
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async () => {
        const res = await fetch('http://localhost:8000/login',
            {
                method: 'POST',
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if (res.ok) {
            const json = res.json();
            const { articles, notes } = json;
        } else {

        }

    }

    postData(type, userData) {
        return new Promise((resolve, reject) => {

            fetch('http://localhost:8000/' + type, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => response.json())
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    logIn = () => {
        if (this.state.email && this.state.password) {
            this.postData('login', this.state).then((result) => {
                this.setState({ articleandNote: result })
                if (this.state.articleandNote) {
                    this.setState({ redirect: true });
                }
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={{
                    pathname: '/savedArticles',
                    articleandNote: { articleandNote: this.state.articleandNote },
                }} />
            )
        }
        return (
            <Router>
                <div className="wrapper">
                    <form className="loginCard">
                        <div className="loginForm">
                            <h1>LOG IN</h1>
                            <p className="loginInput">
                                <label>Email Address: </label>
                                <input
                                    style={{ width: '10rem', padding: '5px', justifyContent: 'left' }}
                                    type="text"
                                    name="email"
                                    placeholder="Email"
                                    onChange={this.onChange}
                                    required />
                            </p>
                            <p className="loginInput">
                                <label>Password: </label>
                                <input
                                    style={{ width: '10rem', padding: '5px', stifyContent: 'left' }}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={this.onChange}
                                    required />
                            </p>
                            <input type="submit" value="login" onClick={this.logIn} className="logInButton" />
                        </div>
                    </form>

                </div>

            </Router>
        )
    }
}

export default Login;