import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class ProductsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.context.checkToken(this);
       this.context.getProductsList(this.props.history);

    }

    render() {
        {
            return (<div>
                <Navbar name = {this.context.userName} />
                <h5 style = {{marginLeft: "100px"}}>List of products:</h5>
                <br /><div style = {{marginLeft: "100px", fontFamily: "sans-serif"}}>
                    <ul>
                        {this.context.productsList && this.context.productsList.map(productos =>
                            <div>
                                <li>
                                    {productos.nombre_comercial} 
                                </li> 
                            </div>
                        )}
                    </ul>
                </div>
            </div>);
        }
    }
}

export default ProductsList;