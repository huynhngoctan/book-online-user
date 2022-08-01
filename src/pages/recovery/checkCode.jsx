import React, {useEffect, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './recovery.css'

const CheckCode = () => {
    const url = 'http://localhost:8080/api/v1/users';
    const [fomrValues, setFormValues] = useState({code: ''});
    const [isOK, setOK] = useState({code: true});
    const [result, setResult] = useState('');
    const recoveryEmail = sessionStorage.getItem('reco-email');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 100);
      }, []);

    const handleOnchange = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValues({...fomrValues, [name]: value});
        console.log(fomrValues)
        // validate(name, value);
    }  

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isOK.code){
            axios
                    .get('http://localhost:8080/api/v1/users/checkCode?email=' + recoveryEmail + '&code=' + fomrValues.code ).then(res => {
                        console.log(res);
                        if(res.data.message !== 'true'){
                            setResult('The code is not correct');
                        }
                        else {
                            console.log("code oke");
                            navigate('/recovery/updatePassword');
                            setResult('');
                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                    }) 

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
                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Email authentication</p>
                            <h2 style={{textAlign: 'center', color: 'red'}}>{result}</h2>
                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                           
                            <div className="d-flex flex-row align-items-center mb-4">
                            
                                <div className="form-outline flex-fill mb-0">
                                <label className="form-label" htmlFor="form3Example3c">Enter Code</label>
                                <input type="text" id="form3Example3c" className="form-control" 
                                    value={fomrValues.code} onChange={handleOnchange} name="code"/>
                                </div>
                            </div>
                            
                
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-primary btn-lg custom-button">Submit</button>
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

export default CheckCode;