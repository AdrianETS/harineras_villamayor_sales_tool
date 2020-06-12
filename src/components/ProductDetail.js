import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {},
            id: this.props.location?.state?.id
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getProductInfo(this.props.history, this.state.id)
            .then(product => this.setState({ selectedProduct: product[0] }))
            
            
    }

    render() {
        return (
            <div><Navbar name={this.context.userName} />
            <div className="container">
                <h4 className=""> Product {this.state.selectedProduct.nombre_comercial}</h4>
                <h5 className="container_within_navbar"> Product's details</h5>
                <table id="clientDetails" /*className="table table-bordered"*/>
                    <tr>
                        <th>Id</th>
                        <th>Product's name</th>
                        <th>Price</th>
                        <th>Measure</th>
                        <th>Img</th>
                    </tr>
                    <tr>
                        <td>{this.state.selectedProduct.id}</td>
                        <td>{this.state.selectedProduct.nombre_comercial}</td>
                        <td>{this.state.selectedProduct.precio}</td>
                        <td>{this.state.selectedProduct.unidad_medida}</td>
                        <td>{this.state.selectedProduct.img}</td>
                        
                    </tr>
                </table>
                
            </div>
            </div>
        )


    }

}

export default ProductDetail;