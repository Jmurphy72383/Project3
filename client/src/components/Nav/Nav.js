import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
    <div className="nav-div">
        <Link className="navbar-a" to="/">HOME</Link>
        
        <nav>
            <Link className="navbar-a" to="/nyse">NYSE</Link>
            <Link className="navbar-a" to="/nasdaq">NASDAQ</Link>
            <Link className="navbar-a" to="/crypto">CRYPTO</Link>
            <Link className="navbar-a" to="/portfolio">PORTFOLIO</Link>
        </nav>
    </div>
);

export default Nav;