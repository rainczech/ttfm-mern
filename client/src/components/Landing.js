import React, { Component } from "react";
import AppContext from '../AppContext';

const OAuth = window.OAuth;
const login = window.login;

let localUri = 'http://localhost:3002';
let productionUri = 'https://ttfm-api.herokuapp.com';

export default class Landing extends Component {

    state = {
        userName: "",
        email: "",
        password: ""
    };

    handleInputChange = event => {
        let value = event.target.value;
        const name = event.target.name;
        this.setState({
            [name]: value
        });
    }

    signUpSubmit = event => {
        event.preventDefault();
        let su_email = document.querySelector('#su_email').value.trim();
        let su_password = document.querySelector('#su_password').value.trim();
        let displayName = document.querySelector('#su_user_name').value.trim();
        fetch(productionUri + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: su_email,
                pass: su_password,
                displayName: displayName
            })
        })
            .then((response) => {
                // maybe save token here
                console.log(response);

            })
            .then((json) => {
                console.log(json);
            });
    };

    signInSubmit = event => {
        event.preventDefault();
        let li_email = document.querySelector('#li_user_name').value.trim();
        let li_password = document.querySelector('#li_password').value.trim();
        fetch(productionUri + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: li_email,
                pass: li_password
            }),
            // redirect: 'follow'
        })
            .then((response) => {
                //maybe save token here
                console.log(response);
                // redirectUri = response.url;
                // return response.json();
                // window.location.href = redirectUri;
            })
            .then((json) => {
                console.log(json);
            });
    };


    githubClickHandler = (evt, context) => {
        console.log(context);
        evt.preventDefault();

        OAuth.initialize('yjjLE5GugMvVBZz4Qb319CMVVbs');
        OAuth.popup('github').then(github => {
            const githubToken = github;
            githubToken.me()
                .then((user) => {

                    const githubUser = user;

                    console.log(githubUser);

                    fetch(productionUri + '/users/github', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            githubID: githubUser.id,
                            githubName: githubUser.name,
                            githubAlias: githubUser.alias,
                            avatarUrl: githubUser.avatar
                        }),
                        mode: 'cors'
                    })
                        .then((response) => {
                            //maybe save token here
                            console.log(response);
                            return response.json();
                        })
                        .then((json) => {

                            setTimeout(() => {
                                console.log(json);
                                context.updateUser(json.user);

                                if (json.notifications && json.notifications.length && json.notifications.length > 0) {
                                    // context.setModalContent({
                                    //     name: json.notifications[0].name,
                                    //     message: json.notifications[0].message
                                    // });
                                    // context.toggleModal();
                                }

                                context.logIn();
                            }, 1000);

                        });
                });
            console.log(githubToken);

        });

    }



    render() {
        return (
            <AppContext.Consumer>
                {context => (

                    <div>
                        <div className="container app-wrapper">
                            <div className="row">
                                <div className="card col s5 m4">
                                    <div className="card-content">
                                        <p>New to TestThisFor.Me? Sign up! It takes only a few seconds to change your coding life!</p>
                                    </div>
                                    <div className="card-tabs">
                                        <ul className="tabs tabs-fixed-width">
                                            <li className="tab">
                                                <a href="#test5">Sign In</a>
                                            </li>
                                            <li className="tab">
                                                <a href="#test4">Sign Up</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="card-content grey lighten-4">
                                        <div id="test4">
                                            <div className="row">
                                                <div className="card col s12 m12">
                                                    <div className="row">
                                                        <form className="col s12">
                                                            <div className="row">
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        value={this.state.userName}
                                                                        name="userName"
                                                                        onChange={this.handleInputChange}
                                                                        type="text"
                                                                    />
                                                                    <label htmlFor="su_user_name">
                                                                        User Name
                                                </label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        value={this.state.email}
                                                                        name="email"
                                                                        onChange={this.handleInputChange}
                                                                        type="text"
                                                                    />
                                                                    <label htmlFor="su_email">Email</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        value={this.state.password}
                                                                        name="password"
                                                                        onChange={this.handleInputChange}
                                                                        type="text"
                                                                    />
                                                                    <label htmlFor="su_password">Password</label>
                                                                </div>

                                                            </div>
                                                            <button onClick={this.signUpSubmit} className="btn waves-effect waves-light btn-small" type="submit" name="action">
                                                                Submit
                                        </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="test5">
                                            <div className="row">
                                                <div className="card col s12 m12">
                                                    <div className="row">
                                                        <h3>Sign in with either your GitHub account or username!</h3>
                                                    </div>
                                                    <div className="row">
                                                        <a
                                                            href=""
                                                            className="center-align"
                                                            onClick={(e) => { this.githubClickHandler(e, context) }}
                                                        >
                                                            <img id="gitLogo" src="./img/if_mark-github_298822.png" />
                                                            <div className="black-text">Sign In</div>
                                                        </a>
                                                        <br />
                                                        <div className="center-align">
                                                            -or-
                                    </div>
                                                    </div>
                                                    <div className="row">
                                                        <form className="col s12">
                                                            <div className="row">
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        value={this.state.email}
                                                                        name="password"
                                                                        onChange={this.handleInputChange}
                                                                        type="text"
                                                                    />
                                                                    <label htmlFor="user_name">Email</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input
                                                                        value={this.state.password}
                                                                        name="password"
                                                                        onChange={this.handleInputChange}
                                                                        type="text"
                                                                    />
                                                                    <label htmlFor="password">
                                                                        Password
                                                </label>
                                                                </div>
                                                            </div>
                                                            <button id="li_submit" className="btn waves-effect waves-light btn-small" type="submit" name="action" onClick={this.signInSubmit}>
                                                                Submit
                                        </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card col s6 m7 offset-m1 offset-s0" id="content">
                                    <div className="row">
                                        <img id="instructions" src="./img/carbon.png" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </AppContext.Consumer>

        );
    }
}