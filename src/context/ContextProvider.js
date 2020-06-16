import React from 'react';
import { createContext } from "react";
export const AppContext = createContext();

export class ContextProvider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clientsList: [],
            productsList: [],
            productsListFiltered: [],
            userName: "",
            specialPricePerProduct: [],
            specialPricePerProductFiltered: [],
            clientUpdated: false,
            productsAddedToCart: []
        }

        this.getClientsList = this.getClientsList.bind(this);
        this.getClientInfo = this.getClientInfo.bind(this);
        this.getProductsList = this.getProductsList.bind(this);
        this.storeUsersName = this.storeUsersName.bind(this);
        this.getSalesInfoByClientId = this.getSalesInfoByClientId.bind(this);
        this.getPriceForClient = this.getPriceForClient.bind(this);
        this.setClientSelected = this.setClientSelected.bind(this);
        this.getProductInfo = this.getProductInfo.bind(this);
        this.setProductList = this.setProductList.bind(this);
        this.setSpecialPricePerProduct = this.setSpecialPricePerProduct.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
        this.submitSale = this.submitSale.bind(this);
    }

    componentDidUpdate() {
        if (this.state.clientUpdated) {
            //we change the state every time a user is selected in Product List component so the componente is re-rendered
            if (this.state.clientSelected != null) {
                this.getPriceForClient(this.props.history, this.state.clientSelected.id)
                    .then(() => this.setState({ clientUpdated: false }))
            }
            else {
                this.getProductsList(this.props.history)
                    .then(() => this.setState({ clientUpdated: false }))
            }
        }
    }

    checkToken(ctx) {
        if (!this.getTokenFromLocalStorage()) {
            ctx.props.history.push("/login");
        }
    }

    getTokenFromLocalStorage() {
        return window.localStorage.getItem('token');
    }


    addProductToCart(productAdded) {
        let updateProductsAdded = [...this.state.productsAddedToCart];
        if (updateProductsAdded.length !=0) {
            let i = 1;
            for(let product of updateProductsAdded){
                if(product.id == productAdded.id){
                    product.cantidad = productAdded.cantidad + product.cantidad;
                    break;
                }
                if(i == updateProductsAdded.length){
                    updateProductsAdded.push(productAdded)
                    break;
                }
                i += 1;
            }
        } else {
            updateProductsAdded.push(productAdded);
        }
        this.setState({ productsAddedToCart: updateProductsAdded })
    }

    deleteProductFromCart(id){
        let updatedCart = this.state.productsAddedToCart.filter(product => product.id != id);
        this.setState({productsAddedToCart: updatedCart });
    }


    //store user's name in the context so it can be shown in the Navbar along with the welcome message
    storeUsersName(userName) {
        this.setState({ userName: userName })
    }

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
                    return res.json();
                })
                .then((json) => {
                    this.setState({ clientId: id });
                    this.setState({ selectedClient: json });
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
                    this.setState({ specialPricePerProduct: [...json], specialPricePerProductFiltered: [...json] });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }
    //get sales info depending on client id. Displayed on ClientsDetails
    getSalesInfoByClientId(history, id) {
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
                    this.setState({ productsList: [...json], productsListFiltered: [...json] });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }

    getProductInfo(history, id) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/products/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    return res.json();
                })
                .then((json) => {
                    this.setState({ productId: id });
                    this.setState({ selectedProduct: json });
                    resolve(json);
                })
                .catch(err => reject())
        })
    }


    submitSale(clientSelected, productsAddedToCart) {
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/sales?token=' + this.getTokenFromLocalStorage(), {
                method: 'POST',
                body: JSON.stringify({
                    cliente: clientSelected.id,
                    cartData: productsAddedToCart

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(res => {
                    if (res.status != 200) {
                        //history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then(json => resolve(json));
        })
    }

    //-----------------setters-----------------------------------------------------------------------------------------------------------

    setClientSelected(client) {
        //update state with the new client selected from ClientSelector component
        this.setState({ clientSelected: client, clientUpdated: true, productsAddedToCart:[]});
    }

    setProductList(list) {
        //update state from the search bar in ProductList
        this.setState({ productsListFiltered: list });
    }

    setSpecialPricePerProduct(list) {
        //update state from the search bar in ProductList
        this.setState({ specialPricePerProductFiltered: list });
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, checkToken: this.checkToken, getTokenFromLocalStorage: this.getTokenFromLocalStorage, storeUsersName: this.storeUsersName,
                    getClientsList: this.getClientsList, getClientInfo: this.getClientInfo, getProductsList: this.getProductsList,
                    getSalesInfoByClientId: this.getSalesInfoByClientId, getPriceForClient: this.getPriceForClient, setClientSelected: this.setClientSelected,
                    getProductInfo: this.getProductInfo, setProductList: this.setProductList, setSpecialPricePerProduct: this.setSpecialPricePerProduct,
                    addProductToCart: this.addProductToCart, deleteProductFromCart: this.deleteProductFromCart, submitSale: this.submitSale
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;