import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';
import graphic from './../images/graphic.png'

class ClientsDetails extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedClient: {},
            salesDetails: [],
            groupedSales: {},
            id: this.props.location?.state?.id
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getClientInfo(this.props.history, this.state.id)
            .then(client => this.setState({ selectedClient: client }))
            .then(() => this.context.getSalesInfoByClientId(this.props.history, this.state.id))
            .then(salesInfo => this.setState({ salesDetails: salesInfo }))
            .then(() => {
                let groupedSalesList = this.state.salesDetails.reduce((groupedSales, sale) => {
                    if (groupedSales[sale.venta] == null) {
                        groupedSales[sale.venta] = [];
                    }
                    groupedSales[sale.venta].push(sale)
                    return groupedSales;
                }, {})
                this.setState({ groupedSales: groupedSalesList })
            })
    }

    render() {
        return (
            <div><Navbar name={this.context.userName} />
            <div className="container">
                <h4 className=""> Client {this.state.selectedClient.razon_social}</h4>
                <h5 className="container_within_navbar"> Client's details</h5>
                <table id="clientDetails" /*className="table table-bordered"*/>
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
              
                <table id="clientDetails" /*className="table table-bordered"*/>
                    <tr>
                        <th>Sale</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price (unit)</th>
                    </tr>
                   {this.state.groupedSales && Object.keys(this.state.groupedSales).map(
                        key => {
                            let lines = this.state.groupedSales[key].map(saleLine => {
                               return (<tr>
                                    <td>{saleLine.venta}</td>
                                    <td>{saleLine.fecha}</td>
                                    <td>{saleLine.producto}</td>
                                    <td>{saleLine.cantidad}</td>
                                    <td>{saleLine.precio_unitario}</td>
                                </tr>)
                                
                            })
                            lines.push(<React.Fragment><tr><td colSpan="3">Total price per sale {key} :</td><td colSpan="2"><b> {this.state.groupedSales[key].reduce((total, current)=> total + (current.cantidad*current.precio_unitario), 0)}</b></td></tr></React.Fragment>);
                            return lines;
                        }
                    )}             
                </table>
               
                <div className="container_within_navbar">
                <h5> Sales graphic</h5>
                </div>
                <div><h6>Click to show graphic.</h6>
                <button className="btn-primary"><img src={graphic}/></button></div>
            </div>
            </div>
        )


    }

}

export default ClientsDetails;