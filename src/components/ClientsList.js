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
                <Navbar history={this.props.history} />
                <h5>List of clients:</h5>
                <br /><div>
                    <ul>
                        {this.context.clientsList.map(clientes =>
                            <div>
                                <li> <Link to={{ pathname: '/clients/edit', state: { id: clientes.id } }}>
                                    {clientes.nombre} 
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