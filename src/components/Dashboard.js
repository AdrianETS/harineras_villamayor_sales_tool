import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';


class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
      
    }


    componentDidMount(){
        this.context.checkToken(this);
    }

    render() {
        return (
            <div>
                 <Navbar name = {this.context.userName}/>
                <br/>                     
            
        </div>
        )
    }
}

export default Dashboard;