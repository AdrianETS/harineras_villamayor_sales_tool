import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class ProductDetail extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location?.state?.id,
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.findSelectedProduct(this.state.id);
    }

    handleNumberChange(event) {
        this.setState({ quantitySelected: event.target.value });

    }
    render() {
        return (
            <div><Navbar name={this.context.userName} />
                <div className="container">
                    <h4 className=""> Product {this.context.selectedProduct.nombre_comercial}</h4>
                    <h5 className="container_within_navbar"> Product's details</h5>

                    <table id="clientDetails" /*className="table table-bordered"*/>
                        <tr>

                            <th>Product Image</th>
                            <th colSpan="2">Product Details</th>
                        </tr>
                        <tr>
                            <td className="subRow" rowSpan="5"><img className="imgProduct" src={"/images/productXl/" + this.context.selectedProduct.img} /></td>
                            <th className="subTitle">Product Id</th><td className="subRow">{this.context.selectedProduct.id}</td></tr>
                        <tr><th className="subTitle">Tradename</th><td className="subRow">{this.context.selectedProduct.nombre_comercial}</td></tr>
                        <tr><th className="subTitle">Price</th><td className="subRow">{this.context.selectedProduct.precio} Euros</td></tr>
                        <tr><th className="subTitle">Unit of measurement</th><td className="subRow">{this.context.selectedProduct.unidad_medida}</td></tr>
                        <tr><th className="subTitle">Other data</th><td className="subRow">{this.context.selectedProduct.otros_datos}</td></tr>

                    </table>
                    <br />
                    <div className="lastCell">
                        <Link to={{ pathname: '/products/list' }}><button type="button" className="btnGoBack" onClick="">Go back</button></Link>
                        <div className="addProductDetail"><input className="inputUnit" id="quantitySelector" type="number" min="0" placeholder="Add units"
                            onChange={(event) => this.handleNumberChange(event)} aria-label="Search" />
                            <button type="button"
                                className="btnSubmitSale"
                                onClick={() => this.context.addProductToCart({
                                    id: this.context.selectedProduct.id, nombre_comercial: this.context.selectedProduct.nombre_comercial,
                                    precio: this.context.selectedProduct.precio, unidad_medida: this.context.selectedProduct.unidad_medida, cantidad: parseInt(this.state.quantitySelected)
                                })}>
                                <i class="fas fa-plus" style={{ color: "white", fontSize: "16px" }} ></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        )


    }

}

export default ProductDetail;