import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';
import { UserContext } from '../../App';

const Product = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {_id, productName, productPrice, productWeight, productImg} = props.product;
    const history = useHistory();
    const handleBuyProduct = (id) =>{
        const productWithInfo = {...loggedInUser, id}
        setLoggedInUser(productWithInfo)
        history.push('/checkout');
    }
    return (
        <div className="card col-md-4 col-lg-3 col-sm-5 m-3 text-center shadow">
            <img src={productImg} className="img-size" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{productName} - {productWeight}</h5>
            </div>
            <div className=" d-flex justify-content-between card-footer bg-white text-center border-0 pb-3">
                <strong>$ {productPrice}</strong> 
                <button onClick={()=>handleBuyProduct(_id)} className="btn btn-primary btn-sm"> Buy Now <FontAwesomeIcon icon={faShoppingCart} /> </button>
            </div>
        </div>
    );
};

export default Product;