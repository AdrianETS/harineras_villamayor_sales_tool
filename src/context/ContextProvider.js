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
            productsAddedToCart: [],
            isClientSelected: false,
            openPopup: false,
            listOfUsers: [],
            originalUsers: [],
            salesList: [],
            productSelectors: {},
            selectedProduct: {},
            selectedClient: ""

        }


        this.getClientsList = this.getClientsList.bind(this);
        this.getClientInfo = this.getClientInfo.bind(this);
        this.getProductsList = this.getProductsList.bind(this);
        this.storeUsersName = this.storeUsersName.bind(this);
        this.getSalesInfoByClientId = this.getSalesInfoByClientId.bind(this);
        this.getPriceForClient = this.getPriceForClient.bind(this);
        this.setClientSelected = this.setClientSelected.bind(this);
        this.setOriginalUsers = this.setOriginalUsers.bind(this);
        this.setListOfUsers = this.setListOfUsers.bind(this);
        this.getSalesList = this.getSalesList.bind(this);
        this.getProductInfo = this.getProductInfo.bind(this);
        this.setProductList = this.setProductList.bind(this);
        this.setSpecialPricePerProduct = this.setSpecialPricePerProduct.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
        this.submitSale = this.submitSale.bind(this);
        this.setPopup = this.setPopup.bind(this);
        this.setProductSelectors = this.setProductSelectors.bind(this);
        this.getClientRisk = this.getClientRisk.bind(this);
        this.setSalesDataForSelectedClient = this.setSalesDataForSelectedClient.bind(this);
        this.findSelectedProduct = this.findSelectedProduct.bind(this);
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
        let productSelectors = this.state.productSelectors;
        if (updateProductsAdded.length != 0) {
            for (let [index, product] of updateProductsAdded.entries()) {
                if (product.id == productAdded.id) {
                    product.cantidad = productAdded.cantidad;
                    productSelectors[product.id] = product.cantidad
                    break;
                }
                if (index == updateProductsAdded.length - 1) {
                    productSelectors[productAdded.id] = productAdded.cantidad
                    updateProductsAdded.push(productAdded)
                    break;
                }
            }
        } else {
            productSelectors[productAdded.id] = productAdded.cantidad
            updateProductsAdded.push(productAdded);
        }
        this.setState({ productsAddedToCart: updateProductsAdded, productSelectors })
    }

    deleteProductFromCart(id) {
        let updatedCart = this.state.productsAddedToCart.filter(product => product.id != id);
        this.setProductSelectors(0, id)
        this.setState({ productsAddedToCart: updatedCart });
    }

    findSelectedProduct(id) {
        if (this.state.isClientSelected) {
            let productFound = this.state.specialPricePerProduct.find(product => product.id = id);
            this.setState({ selectedProduct: productFound, selectedProductId: id })
        } else {
            let productFound = this.state.productsList.find(product => product.id = id);
            this.setState({ selectedProduct: productFound, selectedProductId: id })
        }
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
                    this.initProductSelectors(json);
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



    getClientRisk(history, id) {
        //get index risk for the traffic light displayed in ClientDetails   
        return new Promise((resolve, reject) => {
            fetch('http://127.0.0.1:3001/clients/risk/' + id + '?token=' + this.getTokenFromLocalStorage())
                .then(res => {
                    if (res.status != 200) {
                        history.push("/login");
                        return Promise.reject();
                    }
                    console.log(res)
                    resolve(res.text());
                })
                .catch(err => reject())
        })
    }

    initProductSelectors(products) {
        let productSelectors = {};
        products.forEach(product => {
            productSelectors[product.id] = 0;
        })
        this.setState({ productSelectors: productSelectors })
    }

    resetProductSelectors() {
        let productSelectors = this.state.productSelectors;
        for (let [index, product] of this.state.specialPricePerProduct.entries()) {
            productSelectors[product.id] = 0;
        }

        this.setState({ productSelectors })
    }


    submitSale(history, clientSelected, productsAddedToCart) {
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
                        history.push("/login");
                        reject();
                    }
                    return res.json();
                })
                .then(json => resolve(json))
                .then(() => this.resetProductSelectors())
                .then(() => this.setState({ openPopup: true, productsAddedToCart: [] }))
                .then(() => history.push("/"))
        })
    }

    //-----------------setters-----------------------------------------------------------------------------------------------------------

    setClientSelected(client) {
        //update state with the new client selected from ClientSelector component
        this.setSalesDataForSelectedClient(client)
        this.setState({ clientSelected: client, clientUpdated: true, productsAddedToCart: [], isClientSelected: true });
    }

    setProductList(list) {
        //update state from the search bar in ProductList
        this.setState({ productsListFiltered: list });
    }

    setSpecialPricePerProduct(list) {
        //update state from the search bar in ProductList
        this.setState({ specialPricePerProductFiltered: list });
    }

    setPopup(boolean) {
        //control pop up that appears when the purchase is complete
        this.setState({ openPopup: boolean });
    }

    setProductSelectors(quantity, id) {
        let productSelectors = this.state.productSelectors;
        productSelectors[id] = quantity;
        this.setState({ productSelectors });
    }

    setOriginalUsers(list) {
        this.setState({ originalUsers: list });
    }
    setListOfUsers(list) {
        this.setState({ listOfUsers: list });
    }

    setSalesDataForSelectedClient(client) {
        this.getSalesInfoByClientId(this.props.history, client.id)
            .then(salesDetails => {
                let groupedSalesList = salesDetails.reduce((groupedSales, sale) => {
                    if (groupedSales[sale.venta] == null) {
                        groupedSales[sale.venta] = [];
                    }
                    groupedSales[sale.venta].push(sale)
                    return groupedSales;
                }, {})
                //this.state.groupedSales = groupedSalesList;   
                this.setState({ groupedSales: groupedSalesList })
            })
    }

    render() {
        return (
            <AppContext.Provider
                value={{
                    ...this.state, checkToken: this.checkToken, getTokenFromLocalStorage: this.getTokenFromLocalStorage, storeUsersName: this.storeUsersName,
                    getClientsList: this.getClientsList, getClientInfo: this.getClientInfo, getProductsList: this.getProductsList,
                    getSalesInfoByClientId: this.getSalesInfoByClientId, getPriceForClient: this.getPriceForClient, setClientSelected: this.setClientSelected,
                    setOriginalUsers: this.setOriginalUsers, setListOfUsers: this.setListOfUsers, getSalesList: this.getSalesList,
                    getSalesInfoByClientId: this.getSalesInfoByClientId, getPriceForClient: this.getPriceForClient, setClientSelected: this.setClientSelected,
                    getProductInfo: this.getProductInfo, setProductList: this.setProductList, setSpecialPricePerProduct: this.setSpecialPricePerProduct,
                    addProductToCart: this.addProductToCart, deleteProductFromCart: this.deleteProductFromCart, submitSale: this.submitSale, setPopup: this.setPopup,
                    setProductSelectors: this.setProductSelectors, getClientRisk: this.getClientRisk, findSelectedProduct: this.findSelectedProduct
                }}
            >

                {this.props.children}

            </AppContext.Provider>
        );
    }

}

export const ContextConsumer = AppContext.Consumer;