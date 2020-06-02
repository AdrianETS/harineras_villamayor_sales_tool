import React from 'react';
import { AppContext } from './../context/ContextProvider.js';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Link } from 'react-router-dom';

class Topbar extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
        this.searchClients = this.searchClients.bind(this);
    }

    searchClients(event) {
        this.context.setClientsList(this.context.originalClients.filter(item => item.name.toUpperCase().includes(event.target.value.toUpperCase())));

    }


    render() {
        return (
            <div>
             <nav className="navbar navbar-light bg-light">
                    <a className="form-inline"></a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" onChange={this.searchClients} placeholder="Search" aria-label="Search"></input>
                    </form>
                </nav>
            </div>
        );
    }

}

export default Topbar;