import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';


class ProductsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
        this.state = {
            productsList: "",
            numberValid: false,
            submitDisabled: true,
            productSelectors: {}
        }

        this.searchProducts = this.searchProducts.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    checkIfObjectsAreEqual(obj1, obj2) {
        let props1 = Object.getOwnPropertyNames(obj1);
        let props2 = Object.getOwnPropertyNames(obj2);

        if (props1.length != props2.length) {
            return false;
        }

        for (let prop in props1) {
            if (obj1[prop] != obj2[prop])
                return false;
        }
        return true;
    }

    initProductSelectors(products, previousState) {
        let productSelectors = {};
        products.forEach(product => {
            productSelectors[product.id] = 0;
        })
        if (previousState == undefined) {
            this.setState({ productSelectors });
            return null;
        }
        !this.checkIfObjectsAreEqual(productSelectors, previousState.productSelectors) && this.setState({ productSelectors });
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.clientSelected != null && this.context.productsAddedToCart.forEach(product =>{
            this.context.setProductSelectors(product.cantidad, product.id)
        })

        if (this.context.clientSelected != null && this.context.clientUpdated) {
            this.context.getPriceForClient(this.props.history, this.context.clientSelected.id);
            this.initProductSelectors(this.context.specialPricePerProduct);

        }
        else {
            this.context.getProductsList(this.props.history);
            this.initProductSelectors(this.context.productsList);
        }
    }

    componentDidUpdate(previousProps, previousState) {
        this.context.checkToken(this);
        if (this.context.clientUpdated) {
            if (this.context.clientSelected != null) {
                this.initProductSelectors(this.context.specialPricePerProduct, previousState);
            }
            else {
                this.initProductSelectors(this.context.productsList, previousState);
            }
        }
    }

    handleNumberChange(event, productId) {
        this.context.setProductSelectors(event.target.value, productId);
    }

    searchProducts(event) {
        let productsFound = [];
        if (this.context.clientSelected != null) {
            productsFound = this.context.specialPricePerProduct.filter(productos => productos.nombre_comercial.toUpperCase().includes(event.target.value.toUpperCase()));
            this.context.setSpecialPricePerProduct(productsFound);
        } else {
            productsFound = this.context.productsList.filter(productos => productos.nombre_comercial.toUpperCase().includes(event.target.value.toUpperCase()));
            this.context.setProductList(productsFound);
        }
    }


    render() {
        {
            return (<div>
                <Navbar name={this.context.userName} history={this.props.history} />

                <div className="container">
                    <div style={{ marginLeft: "100px", fontFamily: "sans-serif" }}>
                        <h5>Search product:</h5>

                        <form className="form-inline mt-2 mb-2">
                            <i class="fas fa-search" aria-hidden="true"></i>
                            <input className="form-control form-control-sm ml-3 w-45 " type="text" onChange={this.searchProducts} placeholder="Search" aria-label="Search" />
                        </form>

                        <div className="d-flex flex-wrap">

                            {this.context.specialPricePerProduct.length != 0 ? this.context.specialPricePerProductFiltered.map(producto =>
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                    <div className="productCard">
                                        <Link to={{ pathname: '/product/detail', state: { id: producto.id } }}><div><img className="imgProduct" src={"/images/productXs/" + producto.img} /></div>
                                            <div>{producto.nombre_comercial}</div></Link>
                                        <div>Price: {producto.precio} €/bag </div>
                                        <div className="addQuantity"><label>Quantity:</label><input className="quantity" id={"quantitySelector" + producto.id} type="number" min="0" onChange={(ev) => this.handleNumberChange(ev, producto.id)} aria-label="Search" value = {this.context.productSelectors && this.context.productSelectors[producto.id]}/>
                                            <button type="button" className="addProductBtn" type="button" onClick={() => this.context.addProductToCart({
                                                id: producto.id, nombre_comercial: producto.nombre_comercial, precio: producto.precio, unidad_medida: producto.unidad_medida,
                                                cantidad: parseInt(this.context.productSelectors[producto.id])
                                            })} disabled={this.context.productSelectors[producto.id] < 1} ><i class="fas fa-plus" style={{ color: "white", fontSize: "14px" }} ></i></button></div>



                                    </div>
                                </div>
                            ) : this.context.productsListFiltered.map(producto =>
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                    <div className="productCard">
                                        <Link to={{ pathname: '/product/detail', state: { id: producto.id } }}><div><img className="imgProduct" src={"/images/productXs/" + producto.img} /></div>
                                            <div>{producto.nombre_comercial}</div></Link>
                                        <div>Price: {producto.precio} €/bag </div>
                                        <div className="addQuantity"><label>Quantity:</label><input className="quantity" id={"quantitySelector" + producto.id} type="number" min="0" onChage={this.handleNumberChange} aria-label="Search" />
                                            <button className="addProductBtn" type="button" onClick={() => this.context.addProductToCart({
                                                id: producto.id, nombre_comercial: producto.nombre_comercial, precio: producto.precio, unidad_medida: producto.unidad_medida,
                                                cantidad: parseInt(document.getElementById("quantitySelector" + producto.id).value)
                                            })} disabled={this.state.submitDisabled} ><i class="fas fa-plus" style={{ color: "white", fontSize: "14px" }}></i></button></div>



                                    </div>
                                </div>
                            )}

                        </div>
                    </div>



                </div>
            </div>);
        }
    }
}

export default ProductsList;