import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
    return (
        <nav className="navbar fixed-bottom bg-light justify-content-center">
            <a className="navbar-brand text-black text-bold " href="/"> Copyright © 2023</a>
        </nav>
    )
}

export default Footer
