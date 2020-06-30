import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { findAllByTestId } from '@testing-library/react';
import graphic from './../images/graphic.png'
import ClientStatistics from './ClientStatistics';
import { Box, Typography } from "@material-ui/core";
import TrafficLight from 'react-trafficlight';
import CircularProgress from "@material-ui/core/CircularProgress";



class ClientsDetails extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedClient: {},
            salesDetails: [],
            groupedSales: {},
            id: this.props.location?.state?.id,
            riskIndex: ""
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        
            this.context.getSalesInfoByClientId(this.props.history, this.state.id)
            .then(salesInfo => this.state.salesDetails = salesInfo )
            .then(() => {
                let groupedSalesList = this.state.salesDetails.reduce((groupedSales, sale) => {
                    if (groupedSales[sale.venta] == null) {
                        groupedSales[sale.venta] = [];
                    }
                    groupedSales[sale.venta].push(sale)
                    return groupedSales;
                }, {})
                this.state.groupedSales = groupedSalesList;
                
            }).then(()=>this.context.getClientInfo(this.props.history, this.state.id))
            .then(client => {
                this.setState({ ...this.state, selectedClient : client })
            })
            .then(()=>this.context.getClientRisk(this.props.history, this.state.id))
            .then(riskIndex => {
                if(riskIndex){
                    return this.setState({riskIndex: parseFloat(riskIndex)})
                } else {
                    return this.setState({riskIndex: "No data for this user"})
                }
            });
    }

      
       
    render() {
        return (
            <div><Navbar name={this.context.userName} />
            <div className="container">
                {!Object.keys(this.state.selectedClient).length? <CircularProgress color = "secondary"/>:
                <React.Fragment>
                <div className="title">
                <div>
                <h4 className=""> Client {this.state.selectedClient && this.state.selectedClient.razon_social}</h4>
                </div>
                
                <div>
             <React.Fragment>
                 <div className="trafficLight">
                     <div>
                     <h5>Risk Index: {this.state.riskIndex} %</h5>
                     </div>
                     <div>
                 {this.state.riskIndex < 30 && <TrafficLight Size="40" GreenOn Horizontal BlackColor="transparent" />}
                {this.state.riskIndex > 70 && <TrafficLight  Size="40" RedOn Horizontal  BlackColor="transparent" />}
                {(this.state.riskIndex >= 30 && this.state.riskIndex <= 70) && <TrafficLight  Size="40" YellowOn Horizontal  BlackColor="transparent"  />}
                     </div>
                
                 </div>
                
                </React.Fragment>
             </div>

                </div>
            
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
                    {this.state.selectedClient && <tr>
                        <td>{this.state.selectedClient.id}</td>
                        <td>{this.state.selectedClient.razon_social}</td>
                        <td>{this.state.selectedClient.cif}</td>
                        <td>{this.state.selectedClient.contacto}</td>
                        <td>{this.state.selectedClient.direccion}</td>
                        <td>{this.state.selectedClient.telefono}</td>
                        <td>{this.state.selectedClient.email}</td>
                    </tr>}
                </table>
                <h5 className="container_within_navbar"> Sales history</h5>
                
              
                <table id="clientDetails" /*className="table table-bordered"*/>
                    <tr>
                        <th>Sale</th>
                        <th>Date</th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price (unit)</th>
                        <th>Subtotal</th>
                    </tr>
                   {this.state.groupedSales && Object.keys(this.state.groupedSales).map(
                        key => {
                            let lines = this.state.groupedSales[key].map(saleLine => {
                               return (<tr>
                                    <td>{saleLine.venta}</td>
                                    <td className="date">{saleLine.fecha}</td>
                                    <td className="productName">{saleLine.producto}</td>
                                    <td>{saleLine.cantidad}</td>
                                    <td>{saleLine.precio_unitario}</td>
                                    <td className="subTotal">{Number((saleLine.precio_unitario * saleLine.cantidad).toFixed(2)) + " €"}</td>
                                </tr>)
                                
                            })
                            lines.push(<React.Fragment><tr className="totalPrice"><td className="totalPrice" colSpan="5">Total price per sale {key} :</td><td className="totalPrice" colSpan="1"> {this.state.groupedSales[key].reduce((total, current) => total + Number((current.cantidad*current.precio_unitario).toFixed(2)), 0)} €</td></tr></React.Fragment>);
                            return lines;
                        }
                    )}             
                </table>
               
                
             <div>
               <ClientStatistics 
               selectedClient = {this.state.selectedClient}
               salesDetails = {this.state.salesDetails}
               groupedSales = {this.state.groupedSales}
                clientId = {this.state.id} ></ClientStatistics>
                    
                </div>
            
              
                </React.Fragment>}
                </div>
                
            </div>
        )


    }

}

export default ClientsDetails;