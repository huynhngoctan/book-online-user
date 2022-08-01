import React, { PureComponent, useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './bookDetail.css';
import 'bootstrap/dist/css/bootstrap.css';
import { cartQuantityContext } from '~/App';

const BookDetail = () => {
  const {bookID} = useParams();
  const url = `http://localhost:8080/api/v1/products/${bookID}`;
  const [book, setBook] = useState({});

  //context
  const {addBookToCart} = useContext(cartQuantityContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
        .get(url).then(res => {
            console.log(res.data.data)
            setBook(res.data.data);
           
        })
        .catch(err => {
            console.log(err)
        });
  }, [bookID])

  

    return (
        <div style={{marginTop: '200px'}}>
        <div className="container mt-5 mb-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="row">
                  <div className="col-md-6">
                    <div className="images p-6">
                      <div className="text-center p-4"> <img id="main-image" src={book.linkImage} width={280} height={350} /> </div>
                      <div className="thumbnail text-center"> 
                        <img onclick="change_image(this)" src={book.linkImage} width={70} /> 
                        <img onclick="change_image(this)" src={book.linkImage} width={70} /> 
                        <img onclick="change_image(this)" src={book.linkImage} width={70} /> 
                        <img onclick="change_image(this)" src={book.linkImage} width={70} /> 
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="product p-3">                        
                      <div className="mt-4 mb-3">
                        <h5 className="text-uppercase">{book.name}</h5>
                        <div className="price d-flex flex-row align-items-center"> 
                          <span className="act-price">{book.price}</span>       
                        </div>
                      </div>
                      <p className="about">{book.description}</p>
                      <div className="sizes mt-5">
                        <h6>Thể loại: {book.genre} </h6> <br />
                        <h6>Tác giả: {book.author}</h6> <br />
                        <h6>Nhà xuất bản: {book.publisher}</h6>
                      </div>
                      <div className="cart mt-4 align-items-center"> 
                        {/* <button onClick={() => addBookToCart(book.id, book.name, book.price, book.author, book.linkImage)}  className="btn btn-danger text-uppercase mr-2 px-4" style={{color: 'white' , border: 'none'}}>
                            Add to cart
                        </button> <i className="fa fa-heart text-muted" /> <i className="fa fa-share-alt text-muted" />  */}
                        <button onClick={() => addBookToCart(book.id, book)}  className="btn btn-danger text-uppercase mr-2 px-4" style={{color: 'white' , border: 'none'}}>
                            Add to cart
                        </button> <i className="fa fa-heart text-muted" /> <i className="fa fa-share-alt text-muted" /> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{marginTop: '100px'}}>
          <div className="container mt-5">
            <div className="row">
              <div className="col-sm-4">
                <h2>Sách mới</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <div className="row">
            <div className="col-sm-2">
              <div className="card" style={{width: '200px'}}>
                <img className="card-img-top" src="../bootstrap4/img_avatar1.png" alt="Card image" style={{width: '100%'}} />
                <div className="card-body">
                  <h4 className="card-title">John Doe</h4>
                  <a href="#" className="btn btn-primary">See Profile</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    );
   
}


export default BookDetail;