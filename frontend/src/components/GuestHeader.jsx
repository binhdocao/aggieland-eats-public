import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";

const GuestHeader = () => {
    return (
        <nav className="navbar sticky-top bg-light bg-gradient">
            <div className="container-fluid">
                <a className="navbar-brand text-black text-bold" href="/">Aggieland Eats</a>
                <div class="d-flex justify-content-between">

                <Link role="button" to="/" class="btn btn-dark me-3">Home</Link>
                <Link role="button" to="/about" class="btn btn-dark me-3">About</Link>
                </div>
            </div>
        </nav>
    )
}

export default GuestHeader;