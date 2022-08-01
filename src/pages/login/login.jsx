import React, {useEffect, useState, useContext} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import './login.css';
import 'bootstrap/dist/css/bootstrap.css';
import { cartQuantityContext } from '~/App';

const Login = () => {
    const url = 'http://localhost:8080/api/v1/users/login?';
    const [fomrValues, setFormValues] = useState({email: '', password: ''});
    const [fomrErrors, setFormErrors] = useState({});
    const [isOK, setOK] = useState({email: false, password: false});
    const navigate = useNavigate();

    //context
    const {setUser} = useContext(cartQuantityContext);
    const {response, setResponse} = useContext(cartQuantityContext);


    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])

    const handleOnchange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...fomrValues, [name]: value});
        validate(name, value);
        console.log(fomrValues);
        console.log(isOK)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isOK.email && isOK.password){
            axios
            .get(url + `email=${fomrValues.email}` + `&password=${fomrValues.password}`, 
                ).then(res => {
                if(res.data.data === 'false'){
                    setResponse('Account not existed');
                }
                else {
                    console.log(res.data.data)
                    setUser(res.data.data);
                    sessionStorage.setItem('user', JSON.stringify(res.data.data));
                    navigate('/');
                }
                
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    const validate = (name, value) => {
        switch(name){
            case 'email':
                if(value === ''){
                    fomrErrors.email = "Email is required";
                    setFormErrors(fomrErrors);
                    isOK.email = false;
                    setOK(isOK);
                }
                else{
                    fomrErrors.email = "";
                    setFormErrors(fomrErrors);
                    isOK.email = true;
                    setOK(isOK);
                }
                break;

                case 'password':
                if(value === ''){
                    fomrErrors.password = "Password is required";
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
                break;
        }
    }

    return (
        <div>
            <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style={{marginTop: '100px'}}>
                    <h3 style={{textAlign: 'center'}}>{response}</h3>
                    <form onSubmit={handleSubmit}>
                    {/* Email input */}
                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                        <input type="email" id="form3Example3" className="form-control form-control-lg" value={fomrValues.email} 
                         name="email" onChange={handleOnchange} />
                        <span>{fomrErrors.email}</span>
                    </div>
                    {/* Password input */}
                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                        <input type="password" id="form3Example4" className="form-control form-control-lg" value={fomrValues.password} 
                         name="password" onChange={handleOnchange} />
                        <span>{fomrErrors.password}</span>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Checkbox */}
                        <div className="form-check mb-0">
                        <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
                        
                        </div>
                        <Link to={'/recovery/email'} href="#!" className="text-body">Forgot password?</Link>
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button type="submit" className="custom-button btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                            <Link to={'/register'} className="link-danger">Register</Link>
                        </p>
                    </div>
                    </form>
                </div>
                </div>
            </div>
            </section>

        </div>
    );
};

export default Login;