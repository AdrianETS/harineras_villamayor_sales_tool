import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import { MDBCol, MDBIcon } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


class ClientsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
        this.state = {
            clientList: "",
            membersFound: []

        }
        this.searchClients = this.searchClients.bind(this);
    }

    componentDidMount() {
        this.context.checkToken(this);
        this.context.getClientsList(this.props.history)
            .then(clients => this.setState({ clientList: clients, membersFound: clients }))
    }

    searchClients(event) {
        let clientsFound = [];
        event.target.value == "" ? clientsFound = this.state.clientList : clientsFound = this.state.clientList.filter(clientes => clientes.contacto.toUpperCase().includes(event.target.value.toUpperCase()));
        clientsFound == this.state.clientList ? this.setState({ membersFound: clientsFound }) : this.setState({ membersFound: clientsFound.slice(0, 7) })
    }

    render() {
        {
            return (<div>
                <Navbar name={this.context.userName} />

                <h4 className="title_within_navbar"> List of clients: </h4>
                <div className={"container_within_navbar"} >

                    <div align="right">
                        <MDBCol md="2">
                            <form className="form-inline mt-3 mb-3">
                                <MDBIcon icon="search" />
                                <input className="form-control form-control-sm ml-3 w-75 " type="text" onChange={this.searchClients} placeholder="Search" aria-label="Search" />
                            </form>
                        </MDBCol>
                    
                    </div>
                    <ul>
                        {this.state.membersFound && this.state.membersFound.map(clientes =>
                            <div>
                                <li> <Link to={{ pathname: '/clients/details', state: { id: clientes.id } }}>
                                    {clientes.contacto}
                                </Link>
                                </li>
                            </div>
                        )}
                    </ul>


                </div>
            </div>);
        }
    }
}

export default ClientsList;