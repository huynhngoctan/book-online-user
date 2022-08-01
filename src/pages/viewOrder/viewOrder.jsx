import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const ViewOrder = () => {
    const url = 'http://localhost:8080/api/v1/orders/getLast';
    const [listOrder, setListOrder] = useState({});
    const [listDetail, setListDetail] = useState([]);

    useEffect(() => {
        axios
        .get(url).then(res => {
            console.log(res);
            setListOrder(res.data.data);
            setListDetail(res.data.data.orderDetailList);
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div style={{paddingTop: '200px', paddingBottom: '100px', width: '80%', margin: '0 auto'}}>
            <h2 style={{textAlign: 'center', color: 'green'}}>Your order has been placed successfully </h2>
            <table className="table">
            <thead>
            <tr>
                <th scope="row"></th>
                <td colSpan={2}>Order ID: {listOrder.id}</td>
                </tr>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                </tr>              
            </thead>
            <tbody>
            
                {listDetail.map(item => (
                    <tr key={item.id}>
                    <th scope="row">1</th>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.orderDetailPrice}</td>
                    </tr>
                ))}
                
                <tr>
                <th scope="row"></th>
                <td colSpan={2}>Total</td>
                <td>{listOrder.totalPriceOrderDetail}</td>
                </tr>
            </tbody>
            </table>

        </div>
    );
};

export default ViewOrder;