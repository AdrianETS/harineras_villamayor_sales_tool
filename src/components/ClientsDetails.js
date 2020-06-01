import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class ClientsDetails extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.state = {
            selectedClient: {},
            id: this.props.location?.state?.id
        }
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getClientInfo(this.props.history, this.state.id)
            .then(client => this.setState({ selectedClient: client }));
    }

    render() {
        return (
            <div><Navbar name={this.context.userName} />
                <h4 className = "container_within_navbar"> Client {this.state.selectedClient.contacto}</h4>
                <h5 className = "container_within_navbar"> Client's details</h5>
                <table id = "clientDetails">
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
                        <td>{this.state.selectedClient.id_cliente}</td>
                        <td>{this.state.selectedClient.razon_social}</td>
                        <td>{this.state.selectedClient.cif}</td>
                        <td>{this.state.selectedClient.contacto}</td>
                        <td>{this.state.selectedClient.direccion}</td>
                        <td>{this.state.selectedClient.telefono}</td>
                        <td>{this.state.selectedClient.email}</td>
                    </tr>
                </table>
                <h5 className = "container_within_navbar"> Sales history</h5>
            </div>
        )
    }

}

export default ClientsDetails;