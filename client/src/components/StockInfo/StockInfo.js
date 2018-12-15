import React from 'react';
import './StockInfo.css';

const StockInfo = props => (
    <div className="info-div">
        <h2>{props.company}</h2>
        <h3><span>Latest Price</span>: ${props.latestPrice}</h3>
        <h3><span>As of</span>: {props.latestTime}</h3>
        <h3><span>Open Price</span>: ${props.open}</h3>
        <h3><span>52 Week High</span>: ${props.high}</h3>
        <h3><span>52 Week Low</span>: ${props.low}</h3>
        <div className="stockInfo-btn-div">
            <button className="stockInfo-btn" onClick={props.newsHeadlinesHandler}>Latest Headlines</button>
        </div>
        
        <hr />

        <h2>Buy Shares</h2>
        <div className="buy-div">
            <input className="buy-div-input" 
                   type="number" 
                   name="shares" 
                   min="1" 
                   max="100" 
                   placeholder="Shares" 
                   value={props.shares}
                   onChange={props.sharesInputHandler}
            />
            <button className="buy-div-btn" onClick={props.sharesPurchaseHandler}>Submit</button>
        </div>

        
    </div>
);

export default StockInfo;