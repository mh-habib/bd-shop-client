import React, { useState } from 'react';
import SideBar from '../SideBar/SideBar';
import axios from 'axios';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, errors } = useForm();
    const [imgURL, setImgURL] = useState(null)
    const onSubmit = data => {
        const productData = {
            productName: (data.name),
            productWeight: (data.weight),
            productPrice: (data.price),
            productImg: imgURL
        }

        fetch('https://rhubarb-pudding-58136.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        })
            // .then(response => console.log('Success Report:', response))
            .then(res => res.json())
            .then(result => {
                if(result){
                    alert('Product Added Successfully!!!');
                }                    
            })


    };
    const handleImageUpload = (event) => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'ac97e82d9a2e32790606aeeadba36de7');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                setImgURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="d-flex mt-5 container">
            <div className="col-md-3">
                <SideBar />
            </div>
            <div className="col-md-8">
                <h3 className="text-primary text-center">Add Product</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="mt-5 mx-auto">
                        <tbody>
                            <tr>
                                <td><input name="name" placeholder="Product Name" ref={register} /></td>
                                <td><input name="weight" placeholder="Product Weight" ref={register} /></td>
                            </tr>
                            <tr>
                                <td className="py-3 pr-3"><input name="price" placeholder="Product Price" ref={register} /></td>
                                <td className="py-3 pr-3"><input name="image" type='file' onChange={handleImageUpload} /></td>
                            </tr>
                            <tr>
                                <td><input className="btn btn-primary" type="submit" /></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;