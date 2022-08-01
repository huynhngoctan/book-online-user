import React, { PureComponent, useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import './assets/bootstrap/css/bootstrap.min.css';
import './assets/css/main.css';
import './font-awesone/css/font-awesome.min.css';
import './assets/css/noscript.css';
import { createContext } from 'react';
import { cartQuantityContext } from '~/App';
import styles from './menu.css';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Menu = () => {
    const url = 'http://localhost:8080/api/v1/products/search?q=';
    const [searchItem, setlistSearch] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [userStored, setUserStored] = useState({});
    const [isShow, setIsShow] = useState(false);
    const navigate = useNavigate();

    //context
    const { user, setUser } = useContext(cartQuantityContext);

    const { quantity, setQuantity } = useContext(cartQuantityContext);
    const { listCartItem, setListCartItem } = useContext(cartQuantityContext);
    const { removeCartItem } = useContext(cartQuantityContext);

    useEffect(() => {
        if (inputSearch.length > 0) {
            sessionStorage.setItem('input-search', inputSearch);
            axios
                .get(url + inputSearch)
                .then((res) => {
                    setlistSearch(res.data.data);
                    setIsShow(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setlistSearch([]);
        }

        //get back from session storage
        var cartQuantityClone = sessionStorage.getItem('cart-quantity');
        if (cartQuantityClone !== null) {
            var listCartItemClone = JSON.parse(
                sessionStorage.getItem('cart-list'),
            );
            setQuantity(cartQuantityClone);
            setListCartItem(listCartItemClone);
        }

        //get user from session
        const userClone = JSON.parse(sessionStorage.getItem('user'));

        if (userClone !== null) {
            setUser(userClone);
        }
    }, [inputSearch]);

    return (
        <div id="wrapper">
            <header id="header">
                <div className="inner">
                    {/* Logo */}
                    <Link to={'/'} className="logo">
                        <span className="fa fa-book" />{' '}
                        <span className="title">BookOnline</span>
                    </Link>
                    {/* Search */}
                    <div className="header__search">
                        <input
                            value={inputSearch}
                            onChange={autoSearch}
                            className="header__search-input"
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search by product name, author"
                            onFocus={() => setIsShow(true)}
                        />
                        <button onClick={() => {
                            navigate('/search')
                        }} className="header__search-button">
                            <i className="fa fa-search" />
                        </button>
                        <div
                            className={cx('header__search-result', {
                                show: isShow,
                            })}
                        >
                            <p className="header__search-title">Result</p>
                            {searchItem.length > 0 ? (
                                <ul className="header__search-list">
                                    {searchItem &&
                                        searchItem.map((item) => (
                                            <li
                                                key={item.id}
                                                className="header__search-item"
                                            >
                                                <a className="header__search-link">
                                                    <img
                                                        className="header__search-image"
                                                        src={item.linkImage}
                                                        alt="product"
                                                    />
                                                    <div
                                                        onClick={() => {
                                                            setIsShow(false);
                                                            navigate(
                                                                '/books/' +
                                                                    item.id,
                                                            );
                                                        }}
                                                        className="header__search-body"
                                                    >
                                                        <p className="header__search-body-name">
                                                            {item.name}
                                                        </p>
                                                        <p className="header__search-body-author">
                                                            {item.author}
                                                        </p>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                            ) : (
                                <p style={{ marginTop: 20 }}>No Book Found</p>
                            )}
                        </div>
                    </div>
                    {/* Nav */}
                    <div className="header__right">
                        <div className="header__cart-wrapper">
                            <span className="header__cart-icon">
                                <i className="fa fa-shopping-cart" />
                            </span>
                            <span className="header__cart-bag">{quantity}</span>
                            <div className="header__cart-list">
                                <ul className="header__cart-list-product">
                                    {listCartItem &&
                                        listCartItem.map((item) => (
                                            <li
                                                key={item.book.id}
                                                className="header__cart-item"
                                            >
                                                <a className="header__cart-link">
                                                    <img
                                                        onClick={() => {
                                                            
                                                            navigate(
                                                                '/books/' +
                                                                    item.book
                                                                        .id,
                                                            );
                                                        }}
                                                        className="header__cart-image"
                                                        src={
                                                            item.book.linkImage
                                                        }
                                                        alt="product"
                                                    />
                                                    <div className="header__cart-body">
                                                        <div className="header__cart-body-top">
                                                            <span className="header__cart-body-name">
                                                                {item.book.name}
                                                            </span>
                                                            <span className="header__cart-body-price">
                                                                {
                                                                    item.book
                                                                        .price
                                                                }{' '}
                                                                VND x{' '}
                                                                {item.quantity}
                                                            </span>
                                                        </div>

                                                        <div className="header__cart-body-bottom">
                                                            <span className="header__cart-body-author">
                                                                {
                                                                    item.book
                                                                        .author
                                                                }
                                                            </span>
                                                            <span
                                                                onClick={() =>
                                                                    removeCartItem(
                                                                        item
                                                                            .book
                                                                            .id,
                                                                    )
                                                                }
                                                                className="header__cart-body-remove"
                                                            >
                                                                Delete
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </li>
                                        ))}
                                </ul>
                                {listCartItem.length > 0 ? (
                                    <a>
                                        <Link to={'/order'}>
                                            <button
                                                style={{
                                                    marginTop: '10px',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                Create Order
                                            </button>
                                        </Link>
                                    </a>
                                ) : (
                                    ''
                                )}
                            </div>
                        </div>
                        <nav>
                            <ul>
                                <li>
                                    <Link to="/">Home</Link>
                                </li>
                                <li>
                                    <Link to="/books">Books</Link>
                                </li>
                                <li>
                                    <Link to="/books">Contact</Link>
                                </li>
                                {Object.keys(user).length === 0 ? (
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                ) : (
                                    <li>
                                        <a>{user.fullname}</a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );

    function autoSearch(event) {
        setInputSearch(event.target.value);
    }
};

export default Menu;
