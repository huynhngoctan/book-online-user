import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { cartQuantityContext } from '~/App';

function GetAllFunction(props) {
    const url = 'http://localhost:8080/api/v1/products';
    const [books, setBooks] = useState([]);
    

    //context
    const {addBookToCart} = useContext(cartQuantityContext);

    useEffect(() => {
        axios
        .get(url + "/top").then(res => {
            console.log(res);
            setBooks(res.data.data);
        })
        .catch(err => {
            console.log(err)
        });

        
    }, []);


    return (
        <div className="container">
            <div className="row">
                {books.map(book => (
                    <div key={book.id} className="col-sm-2" style={{marginBottom: '30px'}}>
                        <div className="card" style={{width: '180px'}}>           
                                {/* <a style={{cursor: 'pointer'}}> */}
                                    <Link to={'/books/' + book.id + '#'}>
                                        <img className="card-img-top" src={book.linkImage} alt="Card image" style={{width: '100%', height: '250px', objectFit: 'cover'}} /> 
                                    </Link>
                                {/* </a> */}
                                <div className="card-body" style={{textAlign: 'center'}}>
                                    <h4 className="card-title" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{book.name}</h4>
                                    <a onClick={() => addBookToCart(book.id, book)} className="btn btn-primary" >Add to Cart</a>
                                </div>           
                        </div>
                
                    </div>
                ))}
               
            </div>
        </div>
        
    );

}

export default GetAllFunction;