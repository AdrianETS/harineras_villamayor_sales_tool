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
            productsFiltered: [],
            specialPricePerProduct: []
        }

        this.searchProducts = this.searchProducts.bind(this);
    }

    componentDidMount() {
       this.context.checkToken(this);

      console.log("CONTEXT", this.context)
      if (localStorage.selectedClient!= null) {
        console.log("SELECTED", JSON.parse(localStorage.selectedClient))
        this.context.getPriceForClient(this.props.history, JSON.parse(localStorage.selectedClient).id)
        .then(products => this.setState({productsList: products, productsFiltered: products}))
        .then (price=> this.setState({specialPricePerProduct:price}))
      }
      else {
        console.log("NOT SELECTED", localStorage.selectedClient)
        this.context.getProductsList(this.props.history)
        .then(products => this.setState({productsList: products, productsFiltered: products}))
        .then (price=> this.setState({specialPricePerProduct:price}))
      }
    }

    searchProducts(event) {
        let productsFound = [];
        event.target.value == "" ? productsFound = this.state.productsList : productsFound = this.state.productsList.filter(productos => productos.nombre_comercial.toUpperCase().includes(event.target.value.toUpperCase()));
        productsFound == this.state.productsList ? this.setState({ productsFiltered: productsFound }) : this.setState({ productsFiltered: productsFound.slice(0, 7) })
    }

    render() {
        {
            return (<div>
                <Navbar name = {this.context.userName} />
                
                <div className="container">
                    <div style = {{marginLeft: "100px", fontFamily: "sans-serif"}}>
                    <h5>Search product:</h5>

                    <form className="form-inline mt-2 mb-2">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input className="form-control form-control-sm ml-3 w-45 " type="text" onChange={this.searchProducts} placeholder="Search" aria-label="Search" />
                    </form>

                        <div className="d-flex flex-wrap">

                            {this.state.productsFiltered && this.state.productsFiltered.map(productos =>
                            <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="productCard">
                            <Link to={{ pathname: '/product/detail', state: { id: productos.id } }}><div><img className="imgProduct" src={"/images/" + productos.img}/></div>
                                <div>{productos.nombre_comercial}</div></Link>
                                    <div>Price: {productos.precio} €/bag </div>
                                    <div className="addQuantity"><label>Quantity:</label><input className="quantity" type="number" min="0" onChange={this.quantityChosen} placeholder="" aria-label="Search" />
                                    <button className="btn-primary" type="button"><i class="fas fa-plus" style = {{color: "white", fontSize: "14px"}}></i></button></div>
                                    
                                    
                                    
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