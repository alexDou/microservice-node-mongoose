const mongoose = require('mongoose');

const validateName = (name) => {
    const nameRx = new RegExp('^[a-z0-9\'"\._ \\u00C0-\\u017F\-]+$', 'ui');
    return nameRx.test(name);
}

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
    id: {
        type: String,
        match: [/^[0-9]{10,}$/, 'User ID is invalid'],
        required: true
    },
    username: {
        type: String,
        match: [
            /^[a-z0-9_\.:\-]{3,}$/i,
            'Invalid characters in username. Please use only alphanumerics, underscores, and dashes'
        ],
        required: true
    },
    profilePictureUrl: {
        type: String,
        required: true,
        match: [/^http[s]?:\/\/[^\s]+$/i, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
    },
    contact: {
        firstName: {
            type: String,
            validate: [validateName, 'The firstName ({VALUE}) is not a valid first name.']
        },
        lastName: {
            type: String,
            validate: [validateName, 'The firstName ({VALUE}) is not a valid last name.']
        },
        email: {
            type: String,
            required: true
        }
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.index({ id: 1 }, { unique: true, background: true });
UserSchema.index({ username: 1 }, { unique: true, background: true });

/**
 * model statics
 */
UserSchema.statics = {
    /**
     * Get user
     * @param {String} id - The objectId or id of a user.
     * @returns {Promise<User[]>}
     */
    get(id) {
        try {
            return this.findOne({ _id: mongoose.Types.ObjectId(id)})
                .exec();
        } catch (e) {
            return this.findOne({ id })
                .exec();
        }
    },

    /**
     * List users in descending order of 'updatedAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 10 } = {}) {
        return this.find()
            .sort({ updatedAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

module.exports = mongoose.model('User', UserSchema);
