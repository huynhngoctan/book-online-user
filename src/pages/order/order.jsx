import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Order = () => {
    const url = 'http://localhost:8080/api/v1/orders';
    const inittValue = {name: '', email: '', phone: '', address: ''}
    const [fomrValues, setFormValues] = useState(inittValue);
    const [fomrErrors, setFormErrors] = useState({});
    const [isOK, setOK] = useState({name: false, email: false, phone: false, address: false});
    const [order, setOrder] = useState({});
    const listItems = JSON.parse(sessionStorage.getItem('cart-list'));
    const [listTransform, setListTransform] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const handleChange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...fomrValues, [name]: value})
        validate(name, value);
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('ok')
        if(isOK.name && isOK.email && isOK.phone && isOK.address){
            axios
            .post(url, 
                {
                    customer: fomrValues.name,
                    address: fomrValues.address,
                    phone: fomrValues.phone,
                    createdDate: new Date(),
                    paymentStatus: "Chưa thanh toán",
                    status: "Đơn hàng mới",
                    shipPrice: 69000,

                }
                ).then(res => {
                // console.log(res);
                setOrder(res.data.data);

                listItems.forEach((item) => {
                    listTransform.push(
                        {
                            
                            orderID: res.data.data.id,
                            productID: item.book.id,
                            quantity: item.quantity
                        }
                    )
                });
    
            
                // console.log('transform ', listTransform)
                
                    axios
                    .post(url + '/details', 
                       JSON.stringify(listTransform),{
                        headers : {
                            "Content-Type" : "application/json"
                          }
                       }
                        ).then(res => {
                        if(res.data.status === 'oke'){
                            navigate('/viewOrder')
                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                    });
    
                
            })
            .catch(err => {
                console.log(err)
            });

           
            setListTransform([]);

        }
    }

    const validate = (name, value) => {
        let nameRegex = /^[A-Za-z\s]+$/
        let emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
        let phoneRegex = /^\d+$/
        switch(name){
            case 'name':
                if(value === ''){
                    fomrErrors.name = "Name is required";
                    setFormErrors(fomrErrors);
                    isOK.name = false;
                    setOK(isOK);
                }
                else{
                    if(!nameRegex.test(value)){
                        fomrErrors.name = "Name not valid";
                        setFormErrors(fomrErrors);
                        isOK.name = false;
                        setOK(isOK);
                    }
                    else{
                        fomrErrors.name = "";
                        setFormErrors(fomrErrors);
                        isOK.name = true;
                        setOK(isOK);
                    }
                }
                break;
            
            case 'email':
                if(value === ''){
                    fomrErrors.email = "Email is required";
                    setFormErrors(fomrErrors);
                    isOK.email = false;
                    setOK(isOK);
                }
                else{
                    if(!emailRegex.test(value)){
                        fomrErrors.email = "Email not valid";
                        setFormErrors(fomrErrors);
                        isOK.email = false;
                        setOK(isOK);
                    }
                    else {
                        fomrErrors.email = "";
                        setFormErrors(fomrErrors);
                        isOK.email = true;
                        setOK(isOK);
                    }
                }
                break;

            case 'phone':
                if(value === ''){
                    fomrErrors.phone = "Phone is required";
                    setFormErrors(fomrErrors);
                    isOK.phone = false;
                    setOK(isOK);
                }
                else{
                    if(!phoneRegex.test(value)){
                        fomrErrors.phone = "Phone not valid";
                        setFormErrors(fomrErrors);
                        isOK.phone = false;
                        setOK(isOK);
                    }
                    else{
                        fomrErrors.phone = "";
                        setFormErrors(fomrErrors);
                        isOK.phone = true;
                        setOK(isOK);
                    }
                }
                break;

            case 'address':
                if(value === ''){
                    fomrErrors.address = "Address is required";
                    setFormErrors(fomrErrors);
                    isOK.address = false;
                    setOK(isOK);
                }
                else{
                    fomrErrors.address = "";
                    setFormErrors(fomrErrors);
                    isOK.address = true;
                    setOK(isOK);
                }
                break;
        }
        

    }

    return (
        <div className="inner" style={{width: '50%', margin: '0 auto'}}>
        <section>
            <form style={{marginTop: '200px'}} onSubmit={handleSubmit}>
                <h1>Create Order</h1>
            <div className="fields">
                <div className="field half">
                <input type="text" name="name" id="field-2" placeholder="Name" value={fomrValues.name} onChange={handleChange}/>
                <span>{fomrErrors.name}</span>
                </div>
                <div className="field half">
                <input type="text" name="email" id="field-3" placeholder="Email"  value={fomrValues.email} onChange={handleChange}/>
                <span>{fomrErrors.email}</span>
                </div>
                <div className="field half">
                <input type="text" name="phone" id="field-4" placeholder="Phone" value={fomrValues.phone} onChange={handleChange}/>
                <span>{fomrErrors.phone}</span>
                </div>
                <div className="field half">
                <input type="text" name="address" id="field-5" placeholder="Address" value={fomrValues.address} onChange={handleChange}/>
                <span>{fomrErrors.address}</span>
                </div>
                <div className="field half">
                <input type="text" name="field-7" id="field-7" placeholder="City" />
                </div>
                <div className="field half">
                <select>
                    <option value>-- Choose Payment Method--</option>
                    <option value>COD</option>
                </select>
                </div>
                <div className="field">
                <div>
                    <input type="checkbox" id="checkbox-4" /> 
                    <label htmlFor="checkbox-4">
                    I agree with the <a href="terms.html" target="_blank">Terms &amp; Conditions</a>
                    </label>
                </div>
                </div> 
                <div className="field half text-right" style={{float: 'right'}}>
                <ul className="actions">
                    <li><input type="submit" defaultValue="Finish" className="primary" /></li>
                </ul>
                </div>
            </div>
            </form>
        </section>
        </div>

    );
};


export default Order;