import React from 'react';
import {AppContext} from './../context/ContextProvider';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import PopupMessage from './PopupMessage';


class Dashboard extends React.Component {

    static contextType = AppContext;

    constructor(props) {
        super(props);
      
    }


    componentDidMount(){
        this.context.checkToken(this);
    }

    componentDidUpdate(){
        this.context.checkToken(this);
    }

    

    render() {
        return (
            <div>
                 <Navbar history={this.props.history}/>
                <div className="container">
                <div style={{marginTop: "100px", marginBottom: "100px"}}>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={"/images/nea_organic_flour.jpg"}
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={"/images/nueva_cosecha_ing.jpg"}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={"/images/calidad.jpg"}
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
        
                </div>
                <hr/>
                    <div className="imgDash">
                   
                    <div>   <hr className="style11"/></div>
                    <Link to={{ pathname: '/clients/list'}}><img className="imgD" src={"/images/clientsDashboard.png"}/></Link>
                    <Link to={{ pathname: '/products/list'}}><img className="imgD" src={"/images/productsDashboard.png"}/></Link>
                        <img className="imgD" src={"/images/businessDashboard.png"}/>
                    </div>
                    
                </div>
                <PopupMessage></PopupMessage>
            </div>

        )
    }
}

export default Dashboard;