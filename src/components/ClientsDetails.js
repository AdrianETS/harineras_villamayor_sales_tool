import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';

class ClientsDetails extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedClient: {},
            salesDetails: [],
            id: this.props.location?.state?.id
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getClientInfo(this.props.history, this.state.id)
            .then(client => this.setState({ selectedClient: client }))
            .then(() => this.context.getSalesInfoByClientId(this.props.history, this.state.id))
            .then(salesInfo => this.setState({ salesDetails: salesInfo }))
    }





    render() {
        return (
            <div><Navbar name={this.context.userName} />
                <h4 className="title_within_navbar"> Client {this.state.selectedClient.contacto}</h4>
                <h5 className="container_within_navbar"> Client's details</h5>
                <table id="clientDetails">
                    <tr>
                        <th>Id</th>
                        <th>Firm's name</th>
                        <th>Tax identification card</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Phone number</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <td>{this.state.selectedClient.id}</td>
                        <td>{this.state.selectedClient.razon_social}</td>
                        <td>{this.state.selectedClient.cif}</td>
                        <td>{this.state.selectedClient.contacto}</td>
                        <td>{this.state.selectedClient.direccion}</td>
                        <td>{this.state.selectedClient.telefono}</td>
                        <td>{this.state.selectedClient.email}</td>
                    </tr>
                </table>
                <h5 className="container_within_navbar"> Sales history</h5>
                <table id="clientDetails">
                    <tr>
                        <th>Sale</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price (unit)</th>
                    </tr>
                    {this.state.salesDetails.map(salePerProduct => 
                      <div>  <tr>
                            <td>{salePerProduct.venta}</td>
                            <td>{salePerProduct.fecha}</td>
                            <td>{salePerProduct.producto}</td>
                            <td>{salePerProduct.cantidad}</td>
                            <td>{salePerProduct.precio_unitario}</td>                            
                        </tr>

                    {salePerProduct.precio_total_venta && <tr><td colSpan = "2">Total price per sale {salePerProduct.venta} :</td><td>{salePerProduct.precio_total_venta}</td></tr>}
  
                    </div> )}
                    
                </table>
                <i className="fas fa-chart-line"></i>
            </div>
        )

        
    }

}

export default ClientsDetails;