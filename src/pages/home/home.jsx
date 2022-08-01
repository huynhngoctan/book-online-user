import React, {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css'
import bg from './bg1.jpg';
import GetAllFunction from "~/function/getAllFunction";
import { useNavigate } from "react-router-dom";
import { cartQuantityContext } from '~/App';

const Home = () => {
  const url = 'http://localhost:8080/api/v1/products';
  const [news, setNews] = useState([]);

  //context
  const {addBookToCart} = useContext(cartQuantityContext);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios
        .get(url + "/news").then(res => {
            console.log(res);
            setNews(res.data.data);
        })
        .catch(err => {
            console.log(err)
        });
  }, [])


  return(
    <div>

        <div style={{height: '400px'}} id="carouselExampleInterval" className="carousel slide" data-mdb-ride="carousel">
                    <div className="carousel-inner" style={{height: '400px'}}>
                      <div className="carousel-item active" data-mdb-interval={10000}>
                        <img src={bg} className="d-block w-100" alt="Wild Landscape" />
                      </div>
                    </div>
                  </div>

                  <div>
          <div style={{marginTop: '50px'}}>
            <div className="container mt-5">
              <div className="row">
                <div className="col-sm-4">
                  <h2>Hot Sale</h2>
                </div>
              </div>
            </div>
          </div>
      
              <GetAllFunction/>
            
          <div style={{marginTop: '50px'}}>
            <div className="container mt-5">
              <div className="row">
                <div className="col-sm-4">
                  <h2>New Coming</h2>
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

export default Home;