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
            submitDisabled: true 
        }

        this.searchProducts = this.searchProducts.bind(this);
        this.handleNumberChange = this.handleNumberChange.bind(this);
    }

    componentDidMount() {
       this.context.checkToken(this);
      if (this.context.clientSelected!= null) {
        this.context.getPriceForClient(this.props.history, this.context.clientSelected.id)
      }
      else {
        this.context.getProductsList(this.props.history)
      }
    }

    handleNumberChange(event) {
        let numberValid = event.target.value ? true : false; // basic number validation
        this.setState({numberValid: numberValid, submitDisabled: !numberValid });
    }

    searchProducts(event) {
        let productsFound = [];
        if (this.context.clientSelected != null){
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
                <Navbar name = {this.context.userName} history={this.props.history}/>
                
                <div className="container">
                    <div style = {{marginLeft: "100px", fontFamily: "sans-serif"}}>
                    <h5>Search product:</h5>

                    <form className="form-inline mt-2 mb-2">
                        <i class="fas fa-search" aria-hidden="true"></i>
                        <input className="form-control form-control-sm ml-3 w-45 " type="text" onChange={this.searchProducts} placeholder="Search" aria-label="Search" />
                    </form>

                        <div className="d-flex flex-wrap">

                            {this.context.specialPricePerProduct.length !=0? this.context.specialPricePerProductFiltered.map(producto =>
                            <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="productCard">
                            <Link to={{ pathname: '/product/detail', state: { id: producto.id } }}><div><img className="imgProduct" src={"/images/productXs/" + producto.img}/></div>
                                <div>{producto.nombre_comercial}</div></Link>
                                    <div>Price: {producto.precio} €/bag </div>
                                    <div className="addQuantity"><label>Quantity:</label><input className="quantity" id= {"quantitySelector" + producto.id} type="number" min="0" onChange={this.handleNumberChange} aria-label="Search" />
                                    <button className="btn-primary" type="button" onClick= {()=>this.context.addProductToCart({id: producto.id, nombre_comercial: producto.nombre_comercial, precio: producto.precio, unidad_medida: producto.unidad_medida, 
                                        cantidad: parseInt(document.getElementById("quantitySelector" + producto.id).value)})} disabled={this.state.submitDisabled} ><i class="fas fa-plus" style = {{color: "white", fontSize: "14px"}} ></i></button></div>
                                    
                                    
                                    
                            </div>
                            </div>
                            ): this.context.productsListFiltered.map(producto =>
                                <div className="col-xs-12 col-sm-6 col-md-4">
                                <div className="productCard">
                                <Link to={{ pathname: '/product/detail', state: { id: producto.id } }}><div><img className="imgProduct" src={"/images/productXs/" + producto.img}/></div>
                                    <div>{producto.nombre_comercial}</div></Link>
                                        <div>Price: {producto.precio} €/bag </div>
                                        <div className="addQuantity"><label>Quantity:</label><input className="quantity" id= {"quantitySelector" + producto.id} type="number" min="0" onChage={this.handleNumberChange} aria-label="Search" />
                                        <button className="btn-primary" type="button" onClick= {()=>this.context.addProductToCart({id: producto.id, nombre_comercial: producto.nombre_comercial, precio: producto.precio, unidad_medida: producto.unidad_medida, 
                                            cantidad: parseInt(document.getElementById("quantitySelector" + producto.id).value)})} disabled={this.state.submitDisabled} ><i class="fas fa-plus" style = {{color: "white", fontSize: "14px"}}></i></button></div>
                                        
                                        
                                        
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