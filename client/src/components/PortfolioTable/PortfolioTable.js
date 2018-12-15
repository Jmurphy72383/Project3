import React from "react";
import "./PortfolioTable.css";

const PortfolioTable = (props) => (
    <div>
        <table>
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Company Name</th>
                    <th>Market</th>
                    <th>Shares</th>
                    <th>Buy Date</th>
                    <th>Buy Price</th>
                    <th>Current Price</th>
                    <th>Total Invested</th>
                    <th>Net Gain/Loss</th>
                    <th>Update</th>
                    <th>Sell</th>
                </tr>
            </thead>
            <tbody>
                {props.owns.map(owns => (
                    <tr className="port-rows" key={owns.id}>
                        <td>{owns.symbol}</td>
                        <td>{owns.company_name}</td>
                        <td>{owns.market}</td>
                        <td>{owns.shares}</td>
                        <td>{owns.buy_date}</td>
                        <td>{owns.buy_price}</td>
                        <td>{owns.current_price}</td>
                        <td>{owns.buy_price * owns.shares}</td>
                        <td>{owns.net_total}</td>
                        <td><button onClick={props.updatePriceHandler} value={owns.id} name={owns.symbol}>Update</button></td>
                        <td><button onClick={props.sellStockHandler} value={owns.id}>Sell</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default PortfolioTable;