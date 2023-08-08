import React, { useState } from 'react'
import GuestHeader from '../components/GuestHeader'
import '../components/about.css'
import Footer from '../components/Footer'

//About Landing Page
function About() {


    return (
        <div>
            <GuestHeader/>
            <div>
                <div className="container-fluid bg-danger">
                    <center>
                        <h2>About Aggieland Eats!</h2>
                    
                    </center>
                </div>
                
                <div class= "aboutTextContainer">
                    <h4>
                        College Station is a huge town and is constantly growing. For incoming
                        students and residents moving here it can be incredibly daunting to aptly
                        explore all the great dining options that this town has to offer. New
                        restaurants are constantly popping up, reviews are spread through various websites, 
                        and overall, it is just hard to find reliable and up to date information about
                        restaurants. Our website aims to be a solution to this by providing users with a
                        College Station specific service that allows residents to discover restaurants and
                        be able to find/write reviews in a very simplistic manner. 
                    </h4>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default About;
