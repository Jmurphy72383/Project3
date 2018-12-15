import React from 'react';
import './Banner.css';

const Banner = (props) => (
    <div className="banner-div">
        <h1>{props.exchange}</h1>
        <p>{props.info}</p>
    </div>
);

export default Banner;