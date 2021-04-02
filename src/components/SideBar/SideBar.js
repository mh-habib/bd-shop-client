import React from 'react';
import './Sidebar.css'
import logo from '../../icons/logo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const SideBar = () => {
    return (
        <div className="mt-2">
            <ul className="side-list text-center">
                <img style={{ height: '40px'}} src={logo} alt="" />
                <Link to={'/manageProduct'}><li>Manage Product</li></Link>
                <Link to={'/addProduct'}><li>Add Product</li></Link>
                <Link to={'/editProduct'}><li>Edit Product</li></Link>
                <Link to={'/'}><h1 className="text-center"><FontAwesomeIcon icon={faHome} /></h1></Link>
            </ul>
        </div>
    );
};

export default SideBar;