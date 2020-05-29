import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';

class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);

        const userName = "Adrian";         
    }

    

    componentDidMount(){
        this.context.checkToken(this);
    }

    render() {
        return (
            <div>
                 <Navbar name = {this.context.userName}/>
                 <div style = {{marginLeft: "100px"}}> Welcome to Dashboard</div>
                <br/>                     
            
        </div>
        )
    }
}

export default Dashboard;