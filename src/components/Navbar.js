import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="nav-link active" href={"/#"}><Link to="/">Harineras Villamayor</Link></a>
                </nav>
            </div>
        );
    }
}

export default Navbar;