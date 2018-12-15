import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";
import "./Home.css";

export default withAuth(class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async() => {
        const authenticated = await this.props.auth.isAuthenticated();
        if(authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    login = async() => {
        this.props.auth.login('/');
    }

    logout = async() => {
        this.props.auth.logout('/')
    }

    render() {
        if (this.state.authenticated === null) return null;

        const mainContent = this.state.authenticated ? (
            <div>
                <p>You have logged in</p>
                <button onClick={this.logout}>Logout</button>
            </div>
        ) : (
            <div>
                <p>Please Login/Signup</p>
                <button onClick={this.login}>Login</button>
            </div>
        )

        return (
            <div className="home-div">
                <div className="home-div-sub">
                
                </div>
                <div className="login-div">
                    {mainContent}
                </div>
                
            </div>
        );
    }
})

