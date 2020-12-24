const mongoose = require('mongoose');

const commentModel = require('./model');

/**
 * Load comment and append to req.
 */
function load(req, res, next, id) {
    commentModel.get(id)
        .then((comment) => {
            req.comment = comment; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get comment
 * @returns {Comment}
 */
function get(req, res) {
    return res.json(req.comment);
}

/**
 * Create new comment
 * @returns {Comment}
 */
function create(req, res, next) {
    const comment = new commentModel(req.body);
    comment.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Get comments list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Comment[]}
 */
function list(req, res, next) {
    const { limit = 10, skip = 0 } = req.query;
    commentModel.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Get all user's comment
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {Comment[]}
 */
function listAllByUser(req, res, next) {
    const { limit = 10, skip = 0 } = req.query;
    const id = req.params.userId;

    commentModel.find({ userId: id })
        .sort({ timestamp: -1 })
        .skip(+skip)
        .limit(+limit)
        .exec()
        .then(comments => res.json(comments))
        .catch(e => next(e));
}

/**
 * Update existing comment
 * @returns {User}
 */
function update(req, res, next) {
    const comment = req.comment;
    commentModel.findOneAndUpdate(
        { id: comment.id },
        req.body,
        { new: true },
        (err, updatedComment) => {
            return err ? next(err) : res.json(updatedComment);
        });
}

/**
 * Delete comment.
 * @returns {Comment}
 */
function remove(req, res, next) {
    const comment = req.comment;
    comment.remove()
        .then(deletedComment => res.json(deletedComment))
        .catch(e => next(e));
}

/**
 * Delete all user comments
 * @returns {{result: 'ok'}}
 */
function removeAllByUserId(req, res, next) {
    const id = req.params.userId;
    commentModel.remove({ userId: id })
        .then(_ => res.json({ result: 'ok' }))
        .catch(e => next(e));
}

/**
 * Retrieve top 10 hashtags
 * @returns {{hashtag: String, total: Number}[]}
 */
function topHashtags(req, res, next) {
    commentModel.top10Hashtags()
        .then(hashtags => res.json(hashtags))
        .catch(e => next(e));
}

/**
 * Retrieve top 10 mentions
 * @returns {{mention: String, total: Number}[]}
 */
function topMentions(req, res, next) {
    commentModel.top10Mentions()
        .then(mentions => res.json(mentions))
        .catch(e => next(e))
}

module.exports = {
    load,
    get,
    create,
    list,
    listAllByUser,
    update,
    remove,
    removeAllByUserId,
    topHashtags,
    topMentions
}
