import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from './context/ContextProvider';
import ClientsList from './components/ClientsList';
import ClientsDetails from "./components/ClientsDetails";
import ProductsList from './components/ProductsList';
import ShoppingCart from "./components/ShoppingCart";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <div>
        <ContextProvider>
          <Router>
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/clients/list" exact component={ClientsList} />
              <Route path="/clients/details" exact component={ClientsDetails} />
              <Route path="/products/list" exact component={ProductsList} />
              <Route path="/shoppingcart" exact component = {ShoppingCart} />

            </Switch>
          </Router>
        </ContextProvider>

      </div>
    )
  }

}

export default App;