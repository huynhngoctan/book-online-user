import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { cartQuantityContext } from '~/App';
import './recovery.css'

const CheckPassword = () => {
    const url = 'http://localhost:8080/api/v1/users/newPassword';
    const [fomrValues, setFormValues] = useState({password: '', repeatPassword: ''});
    const [fomrErrors, setFormErrors] = useState({});
    const [isOK, setOK] = useState({password: false, repeatPassword: false});
    const recoveryEmail = sessionStorage.getItem('reco-email');
    const navigate = useNavigate();

    //context
    const {response, setResponse} = useContext(cartQuantityContext);

    useEffect(() => {
        window.scrollTo(0, 100);
      }, []);

    const handleOnchange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...fomrValues, [name]: value});
        validate(name, value);
        console.log(fomrErrors.email)
    }  

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isOK.password && isOK.repeatPassword){
            axios
            .post(url + '?password=' + fomrValues.password + '&email=' + recoveryEmail,
                {} 
                ).then(res => {
                if(res.data.message !== 'true'){
                    setResponse('Fail to update password');
                }
                else {
                    setResponse('Password update success')
                    navigate('/login');
                }
                console.log(res)
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const validate = (name, value) => {
        let nameRegex = /^[A-Za-z\s]+$/
        let emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/
        switch(name){
                case 'password':
                    console.log(value.length)
                if(value === ''){
                    fomrErrors.password = "Password is required";
                    setFormErrors(fomrErrors);
                    isOK.password = false;
                    setOK(isOK);
                }
                else{
                    if(value.length < 8){
                        fomrErrors.password = "Password length must be greater or equal than 8";
                        setFormErrors(fomrErrors);
                        isOK.password = false;
                        setOK(isOK);
                    }
                     else{
                        fomrErrors.password = "";
                        setFormErrors(fomrErrors);
                        isOK.password = true;
                        setOK(isOK);
                    }
                }
                break;

                case 'repeatPassword':
                if(value === ''){
                    fomrErrors.repeatPassword = "Repeat Password is required";
                    setFormErrors(fomrErrors);
                    isOK.repeatPassword = false;
                    setOK(isOK);
                }
                else {
                    if(!(value === fomrValues.password)){
                        fomrErrors.repeatPassword = "Password not matched";
                        setFormErrors(fomrErrors);
                        isOK.repeatPassword = false;
                        setOK(isOK);
                    }
                    else{
                        fomrErrors.repeatPassword = "";
                        setFormErrors(fomrErrors);
                        isOK.repeatPassword = true;
                        setOK(isOK);
                    }
                }                
                break;
        }
    }


    return (
        <div>
            <section className="vh-100" style={{backgroundColor: '#eee'}}>
            <div className="container h-100" style={{marginTop: '80px'}}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-lg-12 col-xl-11">
                    <div className="card text-black" style={{borderRadius: '25px'}}>
                    <div className="card-body p-md-5">
                        <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        
                            <div className="d-flex flex-row align-items-center mb-4">
                            
                                <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="form3Example4c">Password</label>
                                <input type="password" id="form3Example4c" className="form-control" 
                                    value={fomrValues.password} onChange={handleOnchange} name="password"/>
                                <span>{fomrErrors.password}</span>
                                </div>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4">
                               
                                <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                                <input type="password" id="form3Example4cd" className="form-control" 
                                    value={fomrValues.repeatPassword} onChange={handleOnchange} name="repeatPassword"/>
                                <span>{fomrErrors.repeatPassword}</span>
                                </div>
                            </div>
                
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg custom-button">Register</button>
                            </div>
                            </form>
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp" className="img-fluid" alt="Sample image" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>

        </div>
    );
};

export default CheckPassword;