import React from "react";
import "./Table.css";

const StockTable = props => (
    <table className="stockList">
        <thead className="stock-thead">
            <tr>
                <th>Symbol</th>
                <th className="cname">Company</th>
            </tr>
        </thead>
        <tbody className="stock-tbody">
            {props.stocks.map(stocks => (
                <tr key={stocks.id}>
                    <button className="table-btn" onClick={props.stockQueryHandler} value={stocks.symbol}>{stocks.symbol}</button>
                    <td className="cname">{stocks.company_name}</td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default StockTable;