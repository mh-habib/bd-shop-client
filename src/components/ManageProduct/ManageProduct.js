import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar/SideBar';

const ManageProduct = () => {
    const [productList, setProductList] = useState([])
    useEffect(() => {
        fetch('https://rhubarb-pudding-58136.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProductList(data))
    }, [])
    const deleteProduct = (id) => {
        fetch(`https://rhubarb-pudding-58136.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                if(result){
                    alert('Product deleted Successfully!!!');
                }                    
            })
    }
    return (
        <div className="d-flex mt-5 container">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-8">
                <h3></h3>
                <table className="m-auto bg-light">
                    <thead>
                        <tr>
                            <th className="text-dark p-4">Product Name</th>
                            <th className="text-dark p-4">Product Weight</th>
                            <th className="text-dark p-4">Product Price</th>
                            <th className="text-dark p-4"></th>
                            <th className="text-dark p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productList.map(list =>
                            <tr className="mt-3" key={list._id}>
                                <td className="text-dark p-4">{list.productName}</td>
                                <td className="text-dark p-4">{list.productWeight}</td>
                                <td className="text-dark p-4"><strong>$</strong>{list.productPrice}</td>
                                <td className="p-4"><button className="btn btn-info">Edit</button></td>
                                <td className="p-4"><button className="btn btn-danger" onClick={() => deleteProduct(list._id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;