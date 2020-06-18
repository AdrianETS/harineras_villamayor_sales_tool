import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

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
                <Navbar name={this.context.userName} history={this.props.history} />
                <div className="container">
                <h4 className=""> List of clients: </h4>
                <div className={"container_within_navbar"} >
                    <div >
                            <form className="form-inline mt-2 mb-2">
                            <i className="fas fa-search" aria-hidden="true"></i>
                                <input className="form-control form-control-sm ml-3 w-45 " type="text" onChange={this.searchClients} placeholder="Search" aria-label="Search" />
                            </form>
                       
                    
                    </div>
                    <ul>
                        {this.state.clientList && (this.state.membersFound.length == 0 ?  <h5 className = "container_within_navbar">No clients found</h5> 
                        : this.state.membersFound.map(clientes =>
                            <div>
                                <li> <Link to={{ pathname: '/clients/details', state: { id: clientes.id } }}>
                                    {clientes.razon_social}
                                </Link>
                                </li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
            </div>);
        }
    }
}

export default ClientsList;