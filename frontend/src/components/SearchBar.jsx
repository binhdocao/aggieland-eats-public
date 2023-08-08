import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import CreateRest from '../components/CreateRestaurant'


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState(""); // State to hold the user's inputted search query
    const nav = useNavigate();

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(searchTerm === "")
        {
            alert("Error: Empty Search Attempted.");
            return;
        }
        nav(`/search-results/${searchTerm}`);
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-danger" style={{height: '15vh'}}>
            <form className="row justify-content-center" onSubmit={handleSubmit}>
                <div>
                    <input 
                        className="form-control mr-sm-2" 
                        type="search" 
                        placeholder="Find College Station Restaurants" 
                        aria-label="Search" 
                        value={searchTerm}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="text-center">
                    <button className="btn btn-dark my-sm-0 btn-block" type="submit">Search</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;
