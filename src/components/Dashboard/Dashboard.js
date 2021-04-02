import React from 'react';
import ManageProduct from '../ManageProduct/ManageProduct';
import SideBar from '../SideBar/SideBar';
import dashBoardImage from '../../Products/demo.png'

const Dashboard = () => {
    return (
        <div className="d-flex mt-5 container">
            <div className="col-md-3">
                <SideBar/>
            </div>
            <div className="col-md-8">
                <img className="fluid rounded" src={dashBoardImage} alt=""/>
            </div>        
        </div>
    );
};

export default Dashboard;