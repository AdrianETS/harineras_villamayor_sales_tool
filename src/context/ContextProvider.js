import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        clientsList:[],
        productsList:[],
        userName:"",
        specialPricePerProduct: [],
        listOfUsers: [],
        originalUsers: [],
        salesList: []
        } 

        this.getClientsList=this.getClientsList.bind(this);
        this.getClientInfo = this.getClientInfo.bind(this);
        this.getProductsList=this.getProductsList.bind(this);
        this.storeUsersName = this.storeUsersName.bind(this);
        this.getSalesInfoByClientId = this.getSalesInfoByClientId.bind(this);
        this.getPriceForClient=this.getPriceForClient.bind(this);
        this.setClientSelected = this.setClientSelected.bind(this);
        this.setOriginalUsers=this.setOriginalUsers.bind(this);
        this.setListOfUsers = this.setListOfUsers.bind(this);
        this.getSalesList = this.getSalesList.bind(this);
       
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
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ clientsList: json });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }

     //get details for the selected client. It's displayed by ClientDetails component

    getClientInfo(history, id) {
        
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    console.log("devuelvo...")
                    return res.json();
                })
                .then((json) => {
                    this.setState({ clientId: id });
                    this.setState({ selectedClient: json });
                    console.log("json...")
                    resolve(json);
                })
                .catch(err => reject())
        })
    }

    getPriceForClient(history, id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/prices/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ specialPricePerProduct: json });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }
    //get sales info depending on client id. Displayed on ClientsDetails

    getSalesInfoByClientId(history, id){
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/sales/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    resolve(json);
                })
                .catch(err => reject())
        })
    }

    getProductsList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/products/list?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ productsList: json });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }


    getSalesList(history) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/sales/?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ salesList: json });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }

    setClientSelected(client){
        this.setState({clientSelected: client});
    }
    
    setOriginalUsers(list) {
        this.setState({ originalUsers: list });
    }
    setListOfUsers(list) {
        this.setState({ listOfUsers: list });
    }
    


    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, checkToken: this.checkToken, getTokenFromLocalStorage: this.getTokenFromLocalStorage, storeUsersName: this.storeUsersName,
                    getClientsList: this.getClientsList, getClientInfo: this.getClientInfo, getProductsList: this.getProductsList,
                    getSalesInfoByClientId: this.getSalesInfoByClientId, getPriceForClient: this.getPriceForClient, setClientSelected: this.setClientSelected,
                    setOriginalUsers: this.setOriginalUsers, setListOfUsers:this.setListOfUsers, getSalesList:this.getSalesList
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;