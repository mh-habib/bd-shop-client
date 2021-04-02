import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Order = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        fetch(`https://rhubarb-pudding-58136.herokuapp.com/allOrders?email=${loggedInUser.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
    },[])
    return (
        <div>
            <Header></Header>
            <h3 className="text-primary text-center">You Have Submitted {orders.length} Orders</h3>            
            <h5 className="text-secondary text-center mb-5">{loggedInUser.email}</h5>
            <table className="m-auto bg-light">
                    <thead>
                        <tr>
                            <th className="text-secondary p-4">Product Name</th>
                            <th className="text-secondary p-4">Product Weight</th>
                            <th className="text-secondary p-4">Product Price</th>
                            <th className="text-secondary p-4">Order Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(or =>
                            <tr className="mt-3" key={or._id}>
                                <td className="text-dark p-4">{or.productName}</td>
                                <td className="text-dark p-4 text-center">{or.productWeight}</td>
                                <td className="text-dark p-4 text-center"><strong>$</strong>{or.productPrice}</td>   
                                <td className="text-dark p-4">{(new Date(or.orderTime).toDateString('dd/MM/yyyy'))}</td>   
                            </tr>
                        )}
                    </tbody>
                </table>

        </div>
    );
};

export default Order;