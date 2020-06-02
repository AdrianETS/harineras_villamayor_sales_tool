import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';
import Topbar from "./Topbar";

class ClientsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.context.checkToken(this);
       this.context.getClientsList(this.props.history);
       this.retrieveClients();
    }

    
  retrieveClients() {
    fetch('http://127.0.0.1:3001/clientes/')
      .then(res => res.json())
      .then((json) => {
        //this.setState({ listOfUsers: json })
        this.context.setClientsList([...json]);
        this.context.setOriginalClients([...json]);
      })
  }

    render() {
        {
            return (<div>
                <Navbar name = {this.context.userName} />
                <h4 className = "title_within_navbar"> List of clients: </h4>
                <div className = {"container_within_navbar"} >
                <Topbar />
                    <ul>
                        {this.context.clientsList && this.context.clientsList.map(clientes =>
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