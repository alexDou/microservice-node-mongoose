const mongoose = require('mongoose');

const UserModel = require('../users/model');

/**
 * Comment Schema
 */
const CommentSchema = new mongoose.Schema({
    id: {
        type: String,
        match: [/^[0-9]{10,}$/, 'Comment ID is invalid'],
        required: true
    },
    hashTags: [String],
    mentions: [String],
    text: {
        type: String,
        required: true
    },
    timestamp: Number,
    userId: {
        type: String,
        validate: {
            validator: (userId) => {
                return !!UserModel.get(userId);
            }
        }
    }
});

CommentSchema.index({ id: 1 }, { unique: true });
CommentSchema.index({ hashTags: 1 }, { background: true });
CommentSchema.index({ mentions: 1 }, { background: true });

/**
 * model statics
 */
CommentSchema.statics = {
    /**
     * Get comment
     * @param {String} id - The objectId or id of a comment.
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
     * List comments in descending order of 'timestamp'.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 10 } = {}) {
        return this.find()
            .sort({ timestamp: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    },

    /**
     * Find top 10 hashtags
     */
    top10Hashtags() {
        return this.aggregate()
            .project({_id: 0, hashTags: 1})
            .unwind({ path: '$hashTags' })
            .group({_id: "$hashTags", total: { $sum: 1 }})
            .sort({ total: -1 })
            .project({_id: 0, hashtag: "$_id", total: 1})
            .limit(10)
            .exec();
    },

    /**
     * Find top 10 mentions
     */
    top10Mentions() {
        return this.aggregate()
            .project({_id: 0, mentions: 1})
            .unwind({ path: '$mentions' })
            .group({_id: "$mentions", total: { $sum: 1 }})
            .sort({ total: -1 })
            .project({_id: 0, hashtag: "$_id", total: 1})
            .limit(10)
            .exec();
    }
};

module.exports = mongoose.model('Comment', CommentSchema);
