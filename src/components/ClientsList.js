import React from 'react';
import { AppContext } from './../context/ContextProvider';
import Navbar from "./Navbar";
import { Link } from 'react-router-dom';

class ClientsList extends React.Component {

    static contextType = AppContext;


    constructor(props) {
        super(props);
    }

    componentDidMount() {
       this.context.checkToken(this);
       this.context.getClientsList(this.props.history);

    }

    render() {
        {
            return (<div>
                <Navbar name = {this.context.userName} />
                <h5 style = {{marginLeft: "100px"}}>List of clients:</h5>
                <br /><div style = {{marginLeft: "100px", fontFamily: "sans-serif"}}>
                    <ul>
                        {this.context.clientsList && this.context.clientsList.map(clientes =>
                            <div>
                                <li> <Link to={{ pathname: '/clients/details', state: { id: clientes.id_cliente } }}>
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