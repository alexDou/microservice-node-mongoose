const express = require('express');
const { validate } = require('express-validation');

const paramValidation = require('./validation');
const userCtrl = require('./controller');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * Route /user-comments/users
 */
router.route('/')
    /**
     * GET Retrieve users
     */
    .get(userCtrl.list)

    /**
     * POST Create a new user
     */
    .post(validate(paramValidation.createUser), userCtrl.create);

/**
 * Route /user-comments/users/:userId
 * @param {String} userId _id, or id
 */
router.route('/:userId')
    /**
     * GET Retrieve a user
     */
    .get(userCtrl.getById)

    /**
     * PUT Update a user
     */
    .put(validate(paramValidation.updateUser), userCtrl.update)

    /**
     * DELETE Delete a user
     */
    .delete(validate(paramValidation.deleteUser),userCtrl.remove);

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userCtrl.load);

module.exports = router;
