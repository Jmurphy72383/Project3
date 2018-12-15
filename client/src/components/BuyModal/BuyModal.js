import React from "react";
import "./BuyModal.css";

const BuyModal = (props) => (
    <div className="buy-modal">
        <h1>Transaction Successful!</h1>
        <button onClick={props.cancelOrderHandler}>Close</button>
    </div>
);

export default BuyModal;