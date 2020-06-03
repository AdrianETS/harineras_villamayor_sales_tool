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
            productsList: ""
        }
    }

    componentDidMount() {
       this.context.checkToken(this);
       this.context.getProductsList(this.props.history)
       .then(products => this.setState({productsList: products}))

    }

    render() {
        {
            return (<div>
                <Navbar name = {this.context.userName} />
                <h5 style = {{marginLeft: "100px"}}>List of products:</h5>
                <div style = {{marginLeft: "100px", fontFamily: "sans-serif"}}>
                 
                    <div className="container">
                        <div className="d-flex flex-wrap">

                            {this.state.productsList && this.state.productsList.map(productos =>
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