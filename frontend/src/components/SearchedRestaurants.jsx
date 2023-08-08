import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal } from 'react-bootstrap';
import GoogleMaps from './GoogleMaps';

function SearchedRestaurants() {
  const { query } = useParams(); 
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  // Keeps track of when a new review is submitted to refresh page
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    if (selectedRestaurant) {
        fetch(`http://localhost:4000/api/review/${selectedRestaurant._id}`)
        .then(response => {
            if (!response.ok) {
                response.text().then(text => console.log(text));
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setReviews(data))
        .catch(error => console.log('Fetching reviews failed: ', error));
    }
}, [selectedRestaurant,refreshData]);


const [showReviewForm, setShowReviewForm] = useState(false);
const [reviewedRestaurant, setReviewedRestaurant] = useState(null);

const submitReview = (event) => {
    event.preventDefault();

    const ratingInput = event.target.elements[0];
    const reviewTextInput = event.target.elements[1];

    const reviewData = {
        user: '64c976aae1c690b237b3a9b2',  // HARD CODED TO USER - BINH
        restaurant: reviewedRestaurant._id,
        rating: ratingInput.value,
        reviewText: reviewTextInput.value
    };

    fetch(`http://localhost:4000/api/review/${reviewedRestaurant._id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Review successfully submitted:', data);
        setReviews(reviews => [...reviews, data]);
        setShowReviewForm(false);
        setRefreshData(!refreshData); 
        window.location.reload();
    })
    .catch(error => console.error('Posting review failed:', error));
};

const handleWriteReview = (restaurant) => {
    setReviewedRestaurant(restaurant);
    setShowReviewForm(true);

}

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/restaurant-searchbar?searchTerm=${query}`);
        const data = await response.json();
        setResults(data); 
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchResults();
  }, [query]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Search Results for "{query}"</h2>
      
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
<div className="container" style={{ padding: '5vh' }}>
            {results.map(restaurant => (
            <Card key={restaurant._id} style={{ marginBottom: "20px" }}>
                <Card.Body>
                    <Card.Title style={{ textDecoration: 'underline' }}>{restaurant.name}</Card.Title>
                    <Card.Text>{restaurant.address}</Card.Text>
                    <Card.Text>Total Reviews: {restaurant.totalReviews || 0} | Average Rating: {restaurant.averageRating ? restaurant.averageRating.toFixed(2) : 'N/A'} </Card.Text>

                    <Button variant="dark" onClick={() => setSelectedRestaurant(restaurant)}>Details</Button>
                    <Button variant="dark" onClick={() => handleWriteReview(restaurant)} style={{ marginLeft: '10px' }}>Write Review</Button>
                </Card.Body>
            </Card>
            ))}
            {selectedRestaurant && (
                <Modal show onHide={() => { setSelectedRestaurant(null); setReviews([]); }}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedRestaurant.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Address: {selectedRestaurant.address}</p>
                        <GoogleMaps address={selectedRestaurant.address} />
                        {reviews && reviews.length > 0 ? (
                            <>
                                <h5>Reviews:</h5>
                                <ul>
                                    {reviews.map((review, index) => (
                                        <li key={index}>
                                            <p><strong>Rating (out of 5):</strong> {review.rating}</p>
                                            <p><strong>Review:</strong> {review.reviewText}</p>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <p>No reviews found for this restaurant.</p>
                        )}
                    </Modal.Body>
                </Modal>
            )}

            <Modal show={showReviewForm} onHide={() => setShowReviewForm(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Write a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={submitReview}>
                        <div className="form-group">
                            <input type="number" placeholder="Rating" min="0" max="5" className="form-control mb-2" required />
                            <textarea placeholder="Review" className="form-control mb-2" required />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}

export default SearchedRestaurants;
