import React from 'react';
import './Header.css';
import logo from './../../icons/logo.png'
import { Link } from 'react-router-dom';

const Header = () => {
    return (

        <div className=" container d-sm-flex d-block text-center bd-highlight pt-5 pb-5">
            <div className="p-2 flex-grow-1 bd-highlight">
                <img src={logo} className="title-logo float-sm-left" alt="logo" />
            </div>

            <nav className="nav">
                <Link to="/home" className="nav-link active" href="#">Home </Link>
                <Link to="/order" className="nav-link" >Order</Link>
                <Link to="/dashboard" className="nav-link" >Admin</Link>
                <a className="nav-link disabled" href="#">Deals</a>
            </nav>


            <Link to="/login"><button className="btn btn-primary px-4">Login</button></Link>
        </div>
    );
};

export default Header;