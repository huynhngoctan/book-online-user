import React, { createContext, useState } from "react";
import {Routes, Route} from "react-router-dom";
import { Helmet } from "react-helmet";
// import './global_style/assets/bootstrap/css/bootstrap.min.css';
// import './global_style/assets/css/main.css';
// import './global_style/font-awesone/css/font-awesome.min.css';
// import './global_style/assets/css/noscript.css';
import Home from "./pages/home/home";
import Search from "./pages/search/search";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./pages/header/menu";
import Footer from './pages/footer/footer';
import BookDetail from "./pages/book-detail/bookDetail";
import Order from "./pages/order/order";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ViewOrder from "./pages/viewOrder/viewOrder";
import CheckEmail from "./pages/recovery/checkEmail";
import CheckCode from "./pages/recovery/checkCode";
import CheckPassword from "./pages/recovery/checkPassword";
import Product from "./pages/products/products";
import $ from 'jquery';


export const cartQuantityContext = createContext();
    
function App() {
    const [quantity, setQuantity] = useState(0);
    const [listCartItem, setListCartItem] = useState([]);
    const [user, setUser] = useState({});
    const [response, setResponse] = useState('');
    const valuePass = {user, setUser, quantity, listCartItem, setListCartItem, setQuantity, addBookToCart, removeCartItem, response, setResponse}

    return (
        <div>
            <cartQuantityContext.Provider value={valuePass}>
            <Menu/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/search" element={<Search/>}/>
                    <Route path="/books" element={<Product/>}/>
                    <Route path="/books/:bookID" element={<BookDetail/>}/>
                    <Route path="/order" element={<Order/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/viewOrder" element={<ViewOrder/>}/>
                    <Route path="/recovery/email" element={<CheckEmail/>}/>
                    <Route path="/recovery/authen" element={<CheckCode/>}/>
                    <Route path="/recovery/updatePassword" element={<CheckPassword/>}/>
                </Routes>
            <Footer/>
            </cartQuantityContext.Provider>
       </div>
    );

    function addBookToCart(id, book) {
        let updateQuantity = parseInt(quantity) + 1
        setQuantity(parseInt(quantity) + 1);

        if(checkArrayContainedObject(listCartItem, id)){
            let item = listCartItem.find(obj => obj.book.id === id);
            console.log('item2: ', item)
            item.quantity = parseInt(item.quantity) + 1;
            setListCartItem(listCartItem);
        }
        else {
            // listCartItem.push({'id': id, 'name': name, 'price': price, 'author': author, 'link': link, 'quantity': 1});
            listCartItem.push({'book': book, 'quantity': 1});
            setListCartItem(listCartItem);
        }
        console.log('cart:', listCartItem)
        listCartItem.map((item) => {
            console.log('item ', item.book.id)
        })

        sessionStorage.setItem('cart-quantity', updateQuantity);
        sessionStorage.setItem('cart-list', JSON.stringify(listCartItem));
       
    } 

    function checkArrayContainedObject(array, objectID){
        for(var i = 0; i < array.length; i++) {
            if (array[i].book.id === objectID) {
                return true;
            }
        }
        return false;
    }

    function removeCartItem(id){
        let item = listCartItem.find(obj => obj.book.id === id);
        let updateQuantity = parseInt(quantity) - parseInt(item.quantity);
        setQuantity(parseInt(quantity) - parseInt(item.quantity));
        listCartItem.splice(listCartItem.findIndex(obj => obj.book.id === id), 1);
        setListCartItem(listCartItem);

        sessionStorage.setItem('cart-quantity', updateQuantity);
        sessionStorage.setItem('cart-list', JSON.stringify(listCartItem));
    }
}

export default App;
