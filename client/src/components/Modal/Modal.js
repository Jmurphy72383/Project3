import React from "react";
import "./Modal.css";

const Modal = props => (
    <div className="modal">
        <h1>Confirm Order</h1>
        <h3>Buy {props.shares} shares of {props.company} for ${props.total}?</h3>
        <button onClick={props.buyStockHandler}>BUY!</button>
        <button onClick={props.cancelOrderHandler}>Cancel</button>
    </div>
);

export default Modal;