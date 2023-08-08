import React from 'react'
import GuestHeader from '../components/GuestHeader'
import SearchBar from '../components/SearchBar'
import Footer from '../components/Footer'
import FeaturedRestaurants from '../components/FeaturedRestaraunts'
import CriteriaBar from '../components/CriteriaBar'

//Home Landing Page
function Home() {
    return (
        <div>
            <GuestHeader/>
            <SearchBar/>
            <CriteriaBar/>
            <FeaturedRestaurants/>
            <Footer/>

        </div>
    )
}

export default Home;