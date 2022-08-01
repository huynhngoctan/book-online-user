import React, { PureComponent, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cartQuantityContext } from '~/App';

const Search = () => {
  const url = 'http://localhost:8080/api/v1/products/search?q=';
  const inputSearch = sessionStorage.getItem('input-search');
  const [news, setNews] = useState([]);

  //context
  const {addBookToCart} = useContext(cartQuantityContext);

  useEffect(() => {
    window.scrollTo(0, 100);

    axios
        .get(url + inputSearch).then(res => {
            console.log(res);
            setNews(res.data.data);
        })
        .catch(err => {
            console.log(err)
        });
  }, [inputSearch])


   return (
    <div>

    <div style={{ marginTop: '250px'}}>
        <div style={{marginTop: '50px'}}>
            <div className="container mt-5">
              <div className="row">
                <div className="col-sm-4">
                  <h2>Search Result</h2>
                </div>
              </div>
            </div>
          </div>
         
          <div className="container">
            <div className="row">
            {news.map(item => (
              <div key={item.id} className="col-sm-2" style={{marginBottom: '30px'}}>
                <div className="card" style={{width: '180px'}}>
                  <Link to={'/books/' + item.id}>
                    <img className="card-img-top" src={item.linkImage} style={{width: '100%', height: '250px', objectFit: 'cover'}} />
                  </Link>
                  <div className="card-body" style={{textAlign: 'center'}}>
                    <h4 className="card-title" style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{item.name}</h4>
                    <a onClick={() => addBookToCart(item.id, item)} className="btn btn-primary">Add to Cart</a>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
    </div>
    </div>
   );
}



export default Search;