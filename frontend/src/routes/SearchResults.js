import React from 'react'
import GuestHeader from '../components/GuestHeader'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import SearchedRestaurants from '../components/SearchedRestaurants'
import CriteriaBar from '../components/CriteriaBar'

//Home Landing Page
function SearchResults() {
    return (
        <div>
            <GuestHeader/>
            <SearchBar/>
            <CriteriaBar/>
            <SearchedRestaurants/>
            <Footer/>

        </div>
    )
}

export default SearchResults;