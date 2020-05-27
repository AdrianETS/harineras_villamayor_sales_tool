import React from 'react';
import { AppContext } from './../context/ContextProvider';

class Login extends React.Component {

    static contextType = AppContext;
   
    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false
        }

       this.handleUserChange = this.handleUserChange.bind(this);
       this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidUpdate() {
    }

    handleUserChange(event) {
        this.setState({ user: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    processLogin(user, password) {
        fetch('http://127.0.0.1:3001/login', {
            method: 'POST',
            body: JSON.stringify({
                user: user,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => {
                response.json().then(json => {
                    if (response.status == 200) {
                        window.localStorage.setItem('token', json.token);
                        this.setState({ loginFailed: false });
                        this.props.history.push("/");
                    } else {
                        this.setState({ loginFailed: true });
                    }
                })
            });
    }

    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row my-5">
                            <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Login</h5>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control" placeholder="Username" onChange={this.handleUserChange} required autofocus />
                                        <label for="inputUserame">User</label>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.handlePasswordChange} required />
                                        <label for="inputPassword">Password</label>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" data-toggle="modal" onClick={(event) => this.processLogin(this.state.user, this.state.password)} data-target="#loginFailedMessage">Submit</button>

                                  

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;