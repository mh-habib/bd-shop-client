import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedProduct, setSelectedProduct] = useState({})

    const selectedProductId = loggedInUser.id;
    useEffect(() => {
        fetch(`https://rhubarb-pudding-58136.herokuapp.com/product/${selectedProductId}`)
            .then(res => res.json())
            .then(data => setSelectedProduct(data[0]))
    }, [])

    const handleCheckout = () => {
        const email = loggedInUser.email;
        const newOrder = { ...selectedProduct, email: email, orderTime: new Date() }
        // console.log(newOrder);

        fetch('https://rhubarb-pudding-58136.herokuapp.com/sendOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrder),
        })
            .then(response => response.json())
            .then(data =>{
                if(data){
                    alert('Your order Placed Successfully')
                }
            })
    }
    return (
        <div>
            <Header></Header>
            <h3 className="text-center">Proceed to Check Out</h3>
            <table className="m-auto bg-light">
                <thead>
                    <tr>
                        <th className="text-dark p-4">Description Of Product</th>
                        <th className="text-dark p-4">Product Quantity</th>
                        <th className="text-dark p-4">Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="mt-3 borderBottom-1">
                        <td className="text-dark p-4">{selectedProduct.productName}</td>
                        <td className="text-dark text-center p-4">1</td>
                        <td className="text-dark text-center p-4"><strong>$</strong>{selectedProduct.productPrice}</td>
                    </tr>
                    <tr>
                        <td className="text-dark text-center p-4"></td>
                        <td className="text-dark text-right p-4"><strong>Total Price:</strong></td>
                        <td className="text-dark text-center p-4"><strong>${selectedProduct.productPrice}</strong></td>
                    </tr>
                    <tr>
                        <td className="text-dark text-center p-4"></td>
                        <td className="text-dark text-right p-4"></td>
                        <td className="text-dark text-right p-4"><button className="btn btn-primary" onClick={handleCheckout}>Check Out</button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    );
};

export default Checkout;