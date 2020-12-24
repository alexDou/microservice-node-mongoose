const express = require('express');
const { validate } = require('express-validation');

const paramValidation = require('./validation');
const commentCtrl = require('./controller');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * Route /user-comments/comments
 */
router.route('/')
    /**
     * GET Retrieve comments
     */
    .get(commentCtrl.list)

    /**
     * POST Create a new user
     */
    .post(validate(paramValidation.createComment), commentCtrl.create);

/**
 * Route /user-comments/comments/:commentId
 * @param {String} commentId _id, or id
 */
router.route('/:commentId')
    /**
     * GET Retrieve a comment
     */
    .get(commentCtrl.get)

    /**
     * PUT Update a user
     */
    .put(validate(paramValidation.updateComment), commentCtrl.update)

    /**
     * DELETE Delete a user
     */
    .delete(validate(paramValidation.deleteComment), commentCtrl.remove);

/**
 * Route /user-comments/comments/user/:userId
 * @param {String} commentId _id, or id
 */
router.route('/user/:userId')
    /**
     * GET Retrieve all comments by userId
     */
    .get(commentCtrl.listAllByUser)

    /**
     * DELETE delete all comments of a user found by userId
     */
    .delete(validate(paramValidation.deleteCommentsByUserId), commentCtrl.removeAllByUserId)

/**
 * Route /user-comments/comments/stats/top-hashtags
 */
router.route('/stats/top-hashtags')
    /**
     * GET Retrieve a certain number of mostly used hashtags
     */
    .get(commentCtrl.topHashtags)

/**
 * Route /user-comments/comments/stats/top-mentions
 */
router.route('/stats/top-mentions')
    /**
     * GET Retrieve a certain number of mostly used mentions
     */
    .get(commentCtrl.topMentions)

/**
 * Load comment when API with commentId route parameter is hit
 */
router.param('commentId', commentCtrl.load);

module.exports = router;
