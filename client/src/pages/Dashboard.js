import React, { Component } from 'react';
import AppContext from '../AppContext';
import { withRouter } from 'react-router-dom';

class Dashboard extends Component {

    redirect = (path) => {
        console.log('redirect', path)
        this.props.history.push('/create');
    }

    render() {
        return (
            // we can wrap any of our components like this, then you have access to the context object
            // which is equivalent to App.state
            // the context object has a context.user that has all the user info
            <AppContext.Consumer>
                {context => {
                    console.log(context);
                    return (
                        <div>
                            <div className="container dash app-wrapper">
                                <h4>My Projects</h4>
                                <ul className=" right tabs tabs-fixed-width">
                                    <li className="tab">
                                        <a className="active" href="#current">Current</a>
                                    </li>
                                    <li className="tab">
                                        <a href="#closed">Closed</a>
                                    </li>
                                </ul>

                                <div id="current" className="col s12">
                                    <ul className="collection">
                                        {   //do we have any projects
                                            context.user.projects.length > 0 ?
                                                //if yes, list them
                                                context.user.projects.map(project => {
                                                    return (
                                                        <li className="collection-item avatar">
                                                            <a href={'projects' + project._id}>
                                                                <i className="material-icons circle">person</i>
                                                                <h5 className="truncate">{project.title}</h5>
                                                                <div href="#!" className="secondary-content">
                                                                    <i className="material-icons light-green-text accent-3">arrow_forward</i>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )
                                                })
                                                : //if not, show this
                                                <div style={{textAlign: 'center', marginTop: '20px'}}>
                                                    <div>Looks like you haven't posted any projects yet!</div>
                                                    <button className="btn btn-large" onClick={() => {this.redirect('/create')}}>Let's Fix That</button>
                                                </div>
                                        }
                                    </ul>
                                </div>
                                {/* I'm not sure why this isn't showing up on the correct tab */}
                                <div id="closed" className="col s12">
                                    <ul className="collection">
                                        <li className="collection-item avatar">
                                            <a href="/projects/{{this.dataValues.id}}">
                                                <i className="material-icons circle">person</i>
                                                <h5 className="truncate">something</h5>
                                                <div href="#!" className="secondary-content">
                                                    <i className="material-icons light-green-text accent-3">arrow_forward</i>
                                                </div>
                                            </a>
                                        </li>
                                    </ul>
                                    
                                    <div className="divider"></div>
                                </div>
                            </div>
                        </div>)
                }}
            </AppContext.Consumer>
        );
    }
}

export default withRouter(Dashboard);
