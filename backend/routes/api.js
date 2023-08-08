const express = require('express');
const User = require('../models/User');
const Restaurant = require('../models/Restaurants');
const Review = require('../models/Reviews');
const router = express.Router();
const mongoose = require('mongoose');



router.post('/signup', async (req, res) => {
console.log('Received signup request:', req.body);
  const { username, email, password } = req.body;

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or email already exists.' });
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'An error occurred during signup.' });
  }
});

router.get('/restaurant', async function(req, res) {
  try {
      const aggregatedRestaurants = await Restaurant.aggregate([
          {
              $lookup: {
                  from: 'reviews',
                  localField: '_id',
                  foreignField: 'restaurant',
                  as: 'restaurantReviews'
              }
          },
          {
              $addFields: {
                  totalReviews: { $size: "$restaurantReviews" },
                  averageRating: {
                      $cond: [
                          { $eq: [{ $size: "$restaurantReviews" }, 0] },
                          0,
                          { $avg: "$restaurantReviews.rating" }
                      ]
                  }
              }
          },
          {
              $project: {
                  restaurantReviews: 0 // Exclude the 'restaurantReviews' field from the final output
              }
          }
      ]);

      res.json(aggregatedRestaurants);
  } catch (error) {
      console.log('Fetching restaurants with reviews data failed: ', error);
      res.status(500).json({ message: 'Fetching restaurants failed.' });
  }
});


router.get('/review/:restaurantId', async function (req, res) {
    try {
      const restaurantId = req.params.restaurantId;
      const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'username');
      res.json(reviews);
    } catch (error) {
      console.log('Fetching reviews failed: ', error);
      res.status(500).json({ message: 'Fetching reviews failed.' });
    }
  });
  
//Synchronizes restarauntid with their reviews
router.post('/review/:restaurantId', async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const { user, rating, reviewText } = req.body;

        // Check if the restaurantId is valid
        if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
            return res.status(400).json({ message: 'Invalid restaurant id' });
        }

        // Create and save the review to the database
        const review = new Review({
            user: user,
            restaurant: restaurantId,
            rating: rating,
            reviewText: reviewText
        });
        await review.save();

        return res.status(201).json(review);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

//Checks to create a new restaraunt
router.post('/restaurant', async (req, res) => {
    const { name, address, cuisine } = req.body;
  
    try {
      // Check if a restaurant with the same name already exists in the database
      const existingRestaurant = await Restaurant.findOne({ name });
      if (existingRestaurant) {
        return res.status(409).json({ message: 'Restaurant with the same name already exists.' });
      }
  
      // Create a new restaurant
      const newRestaurant = new Restaurant({ name, address, cuisine });
      await newRestaurant.save();
  
      res.status(201).json({ message: 'Restaurant added successfully.', restaurant: newRestaurant });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred while adding the restaurant.' });
    }
  });

  router.get('/restaurant-searchbar', async function(req, res) {
    try {
        // Check if search term exists in query parameters
        let matchStage = {};
        if (req.query.searchTerm) {
            matchStage.name = new RegExp(req.query.searchTerm, 'i');  // 'i' makes it case-insensitive
        }
  
        const aggregatedRestaurants = await Restaurant.aggregate([
            { $match: matchStage }, // Integrate the search term here
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'restaurant',
                    as: 'restaurantReviews'
                }
            },
            {
                $addFields: {
                    totalReviews: { $size: "$restaurantReviews" },
                    averageRating: {
                        $cond: [
                            { $eq: [{ $size: "$restaurantReviews" }, 0] },
                            0,
                            { $avg: "$restaurantReviews.rating" }
                        ]
                    }
                }
            },
            {
                $project: {
                    restaurantReviews: 0 // Exclude the 'restaurantReviews' field from the final output
                }
            }
        ]);
  
        res.json(aggregatedRestaurants);
    } catch (error) {
        console.log('Fetching restaurants with search functionality failed: ', error);
        res.status(500).json({ message: 'Fetching restaurants failed.' });
    }
  });



module.exports = router;




