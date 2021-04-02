import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createContext, useState } from 'react';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Order from './components/Orders/Order';
import NoMatch from './components/NoMatch/NoMatch';
import Dashboard from './components/Dashboard/Dashboard';
import ManageProduct from './components/ManageProduct/ManageProduct';
import AddProduct from './components/AddProduct/AddProduct';
import Checkout from './components/Checkout/Checkout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/login">
            <Login/>
          </Route>

          <PrivateRoute path="/checkout">
            <Checkout />
          </PrivateRoute>

          <PrivateRoute path="/order">
            <Order />
          </PrivateRoute>

          <PrivateRoute path="/addProduct">
            <AddProduct/>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <ManageProduct/>
          </PrivateRoute>
          <PrivateRoute path="/editProduct">
            <ManageProduct/>
          </PrivateRoute>

          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
      
  );
}

export default App;
