import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();


export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        clientsList:[],
        productsList:[]
        originalClients:[]
        } 

        this.getClientsList=this.getClientsList.bind(this);
        this.getClientInfo = this.getClientInfo.bind(this);
        this.getProductsList=this.getProductsList.bind(this);
        this.storeUsersName = this.storeUsersName.bind(this);
        this.getSalesInfoByClientId = this.getSalesInfoByClientId.bind(this);
    }

    checkToken(ctx) {
        if (!this.getTokenFromLocalStorage()) {
            ctx.props.history.push("/login");
        }
    }

    getTokenFromLocalStorage() {
        return window.localStorage.getItem('token');
    }

    //store user's name in the context so it can be shown in the Navbar along with the welcome message

    storeUsersName(userName){
        this.setState({userName: userName})}

    //get full list of clients for ClienList component

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

     //get details for the selected client. It's displayed by ClientDetails component

    getClientInfo(history, id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ clientId: id });
                    this.setState({ selectedClient: json });
                    resolve(json);
                })
        })
    }

    //get sales info depending on client id. Displayed on ClientsDetails

    getSalesInfoByClientId(history, id){
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/sales/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    resolve(json);
                })
        })
    }

    getProductsList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/products/list?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ productsList: json });
                    resolve(json);
                })
        })
    }
    setClientsList(list){
        this.setState({clientsList:list})
    }
    
    setOriginalClients(list) {
        this.setState({ originalClients: list });
    }



    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, checkToken: this.checkToken, getTokenFromLocalStorage: this.getTokenFromLocalStorage, storeUsersName: this.storeUsersName,
                    getClientsList: this.getClientsList, getClientInfo: this.getClientInfo, getProductsList: this.getProductsList,
                    getSalesInfoByClientId: this.getSalesInfoByClientId
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;