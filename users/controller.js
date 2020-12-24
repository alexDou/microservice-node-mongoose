const userModel = require('./model');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    userModel.get(id)
        .then((user) => {
            req.user = user; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user by _id, or id
 * @returns {User}
 */
function getById(req, res) {
    return res.json(req.user);
}

/**
 * Create new user
 * @returns {User}
 */
function create(req, res, next) {
    const user = new userModel(req.body);
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

/**
 * Update existing user
 * @returns {User}
 */
function update(req, res, next) {
    const user = req.user;
    userModel.findOneAndUpdate(
        { id: user.id },
        req.body,
        { new: true },
        (err, updatedUser) => {
        return err ? next(err) : res.json(updatedUser);
    });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    userModel.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
    const user = req.user;
    user.remove()
        .then(deletedUser => res.json(deletedUser))
        .catch(e => next(e));
}



module.exports = { load, getById, create, update, list, remove };
