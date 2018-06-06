const express = require('express');
const router = express.Router();
const responseMiddleware = require('../middleware/response');
const validate = require('../middleware/validation');

/****************************************
 * Businesses Routes
 ****************************************/
const businessesController = require('../controllers/businesses');
router
  .route('/businesses')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusinesses'),
    businessesController.fetchBusinesses)
  .post(
    responseMiddleware.addCallingMethodToResponse('addBusiness'),
    businessesController.addBusiness)
  ;
router
  .route('/businesses/:businessId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchBusiness'),
    validate.hasValidObjectId('businessId'),
    businessesController.fetchBusiness)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateBusiness'),
    businessesController.updateBusiness)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteBusiness'),
    businessesController.deleteBusiness)
  ;

/****************************************
 * Categories Routes
 ****************************************/
const categoriesController = require('../controllers/categories');
router
  .route('/categories')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategories'),
    categoriesController.fetchCategories)
  .post(
    responseMiddleware.addCallingMethodToResponse('addCategory'),
    categoriesController.addCategory)
  ;
router
  .route('/categories/:businessId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchCategory'),
    categoriesController.fetchCategory)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateCategory'),
    categoriesController.updateCategory)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteCategory'),
    categoriesController.deleteCategory)
  ;

/****************************************
 * Ratings Routes
 ****************************************/
const ratingsController = require('../controllers/ratings');
router
  .route('/ratings')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRatings'),
    ratingsController.fetchRatings)
  .post(
    responseMiddleware.addCallingMethodToResponse('addRating'),
    ratingsController.addRating)
  ;
router
  .route('/ratings/:ratingId')
  .get(
    responseMiddleware.addCallingMethodToResponse('fetchRating'),
    ratingsController.fetchRating)
  .put(
    responseMiddleware.addCallingMethodToResponse('updateRating'),
    ratingsController.updateRating)
  .delete(
    responseMiddleware.addCallingMethodToResponse('deleteRating'),
    ratingsController.deleteRating)
  ;

module.exports = router;