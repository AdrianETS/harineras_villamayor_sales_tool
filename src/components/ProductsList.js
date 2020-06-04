import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import trigo from './../images/trigo.png';

class ProductsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
        this.state = {
            productsList: "",
            productsFiltered: []
        }

        this.searchProducts = this.searchProducts.bind(this);
    }

    componentDidMount() {
       this.context.checkToken(this);
       this.context.getProductsList(this.props.history)
       .then(products => this.setState({productsList: products, productsFiltered: products}))
      

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
                            <div className="productCard">
                                <div><img src={trigo}/></div>
                                <div>{productos.nombre_comercial}</div>
                                <div><button className="btn-primary" type="button">Add product</button></div> 
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