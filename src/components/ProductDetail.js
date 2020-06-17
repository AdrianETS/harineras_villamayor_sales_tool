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
                        
                        <th>Imagen del producto</th>
                        <th colSpan="2">Datos del producto</th>   
                    </tr>
                    <tr>
                        <td className="subRow" rowSpan="5"><img className="imgProduct" src={"/images/productXl/" + this.state.selectedProduct.img}/></td>
                        <th className="subTitle">Id producto</th><td className="subRow">{this.state.selectedProduct.id}</td></tr>
                        <tr><th className="subTitle">Nombre comercial</th><td className="subRow">{this.state.selectedProduct.nombre_comercial}</td></tr>
                        <tr><th className="subTitle">Precio</th><td className="subRow">{this.state.selectedProduct.precio} Euros</td></tr>
                        <tr><th className="subTitle">Unidad de medida</th><td className="subRow">{this.state.selectedProduct.unidad_medida}</td></tr>
                        <tr><th className="subTitle">Otros datos</th><td className="subRow">{this.state.selectedProduct.otros_datos}</td></tr>
                            
                    
                </table>
                
            </div>
            </div>
        )


    }

}

export default ProductDetail;