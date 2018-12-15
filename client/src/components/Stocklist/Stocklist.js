import React from 'react';
import './Stocklist.css';

const Stocklist = props => (
    <div className="list-div">
        <h2>Marketplace</h2>
        <input
            onChange={props.inputChangeHandler}
            value={props.search}
            name="search"
            type="text"
            placeholder="Search for company..."
            id="search"
        />
        <button onClick={props.stockSearchHandler}>Search</button>
        
        <button onClick={props.allStocks}>Browse All {props.exchange} Stocks</button>
    </div>
    
);

export default Stocklist;