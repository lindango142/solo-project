const Restaurant = require('../models/restaurantModel');

const restaurantController = {};

restaurantController.getAllRestaurants = (req, res, next) => {
  Restaurant.find({}, (err, restaurants) => {
    // if a database error occurs, call next with the error message passed in
    // for the express global error handler to catch
    if (err) return next('Error in userController.getAllUsers: ' + JSON.stringify(err));
    
    // store retrieved users into res.locals and move on to next middleware
    res.locals.restaurants = restaurants;
    return next();
  });
};

restaurantController.addRestaurant = (req, res, next) => {
  // console.log(JSON.stringify(req.body))
  Restaurant.create(req.body, (err, restaurants) => {
    if (err) return next(err);
    return next();
  })
}

restaurantController.updateRestaurant = (req, res, next) => {
  // console.log(req.body)
  Restaurant.findOneAndUpdate({ name: req.body.name }, { review: req.body.review, status: req.body.status }, (err, updated) => {
    if (err) return next(err);
    return next();
  })
}

restaurantController.deleteRestaurant = (req, res, next) => {
  console.log(req.body, 'delete')
  console.log('hi');
  Restaurant.findOneAndDelete({ name: req.body.name }, (err, updated) => {
    if (err) return next(err);
    return next();
  })
}

module.exports = restaurantController;