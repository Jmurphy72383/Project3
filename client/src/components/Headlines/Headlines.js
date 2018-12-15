import React from "react";
import "./Headlines.css";

const Headlines = props => (
    <div className="headlines-div">
        <h2>Latest Headlines</h2>
        {props.news.map(news => (
        <a href={news.url} target="_blank" rel="noopener"><h5 key={news.datetime}>{news.headline}</h5></a>
    ))}

    <button onClick={props.showQuoteHandler}>Show Quote</button>
    </div>
);

export default Headlines;