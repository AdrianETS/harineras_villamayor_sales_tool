import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        clientsList:[]
        } 

        this.getClientsList=this.getClientsList.bind(this);
    }
    checkToken(ctx) {
        if (!this.getTokenFromLocalStorage()) {
            ctx.props.history.push("/login");
        }
    }

    getTokenFromLocalStorage() {
        return window.localStorage.getItem('token');
    }

    getClientsList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/list?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ clientsList: json });
                    resolve(json);
                })
        })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, checkToken: this.checkToken, getTokenFromLocalStorage: this.getTokenFromLocalStorage,
                    getClientsList: this.getClientsList
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;