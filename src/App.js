import React from 'react';
import './App.css';
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ContextProvider } from './context/ContextProvider';

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
            </Switch>
          </Router>
        </ContextProvider>

      </div>
    )
  }

}

export default App;