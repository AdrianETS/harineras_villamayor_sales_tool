import React from 'react';
import { AppContext } from './../context/ContextProvider';
import logo from './../images/logo_0.jpg';

class Login extends React.Component {

    static contextType = AppContext;
   
    constructor(props) {
        super(props);
        this.state = {
            loginFailed: false,
            userValid: false,        // valid flags for each field. The button won't be available until both fields 
                                     // are typed in with at least one character
            passwordValid: false, 
            submitDisabled: true 
        }

       this.handleUserChange = this.handleUserChange.bind(this);
       this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    componentDidUpdate() {
        
    }

    handleUserChange(event) {
        let userValid = event.target.value ? true : false; // basic user validation
        let submitValid = this.state.passwordValid && userValid;  // validate total form
        this.setState({ user: event.target.value, userValid: userValid, submitDisabled: !submitValid });
    }

    handlePasswordChange(event) {
        let passwordValid = event.target.value ? true : false; // basic password validation
        let submitValid = this.state.userValid && passwordValid;  // validate total form
        this.setState({ password: event.target.value, passwordValid: passwordValid, submitDisabled: !submitValid });
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
                        this.context.storeUsersName(user)
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
                                <div>
                                <img src={logo}/>
                                </div>
                                <br/>
                                <br/>
                                <form className="form-signin">
                                    <div className="form-label-group">
                                        <input type="text" id="inputUserame" className="form-control" placeholder="Username" onChange={this.handleUserChange} required autofocus />
                                        <label for="inputUserame"/>
                                    </div>

                                    <div className="form-label-group">
                                        <input type="password" id="inputPassword" className="form-control" placeholder="Password" onChange={this.handlePasswordChange} required />
                                        <label for="inputPassword"/>
                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block text-uppercase" type="button" data-toggle="modal" onClick={(event) => this.processLogin(this.state.user, this.state.password)} disabled={this.state.submitDisabled} >
                                        Submit</button>

                                  

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