import { Link } from "react-router-dom";
import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import CreateRestaurant from "./CreateRestaurant";

const CriteriaBar = () => {
    return (
        <nav className="navbar sticky-top bg-light bg-gradient">
                <div class="d-flex justify-content-center">
                    <CreateRestaurant/>
                </div>
        </nav>
    )
}

export default CriteriaBar;