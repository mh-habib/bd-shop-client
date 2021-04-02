import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Product from '../Product/Product';


const Home = () => {
    const [allProducts, setAllProducts] = useState([])
    // console.log(allProducts);
    useEffect(() => {
        fetch('https://rhubarb-pudding-58136.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setAllProducts(data))
    }, [])

    return (
        <div className="container">
            <Header />
            <div className="row justify-content-center pt-3 pb-5 px-5">
                {
                    allProducts.length === 0 &&
                    <button className="btn btn-primary" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    </button>
                }
                {
                    allProducts.map(pd => <Product product={pd} key={pd._id}></Product>)
                }
            </div>
        </div>
    );
};

export default Home;