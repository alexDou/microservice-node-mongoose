const Joi = require('joi');

module.exports = {
    // POST /user-comments/comments
    createComment: {
        body: Joi.object({
            id: Joi.string()
                .regex(/^[0-9]{10,}$/)
                .required(),
            hashTags: Joi.array().items(Joi.string()),
            mentions: Joi.array().items(Joi.string()),
            text: Joi.string().required(),
            timestamp: Joi.number().required(),
            userId: Joi.string()
                .regex(/^[0-9]{10,}$/)
                .required()
        })
    },

    // PUT /user-comments/comments
    updateComment: {
        body: Joi.object({
            id: Joi.string()
                .regex(/^[0-9]{10,}$/),
            hashTags: Joi.array().items(Joi.string()),
            mentions: Joi.array().items(Joi.string()),
            text: Joi.string(),
            timestamp: Joi.number(),
            userId: Joi.string()
                .regex(/^[0-9]{10,}$/)
        }),
        params: Joi.object({
            commentId: Joi.string()
                .regex(/^[a-f0-9]{10,}/i)
                .required()
        })
    },

    // DELETE /user-comments/comments/:commentId
    deleteComment: {
        params: Joi.object({
            commentId: Joi.string()
                .regex(/^[a-f0-9]{6,}/i)
                .required()
        })
    },

    // DELETE /user-comments/comments/user/:userId
    deleteCommentsByUserId: {
        params: Joi.object({
            userId: Joi.string()
                .regex(/^[a-f0-9]{6,}/i)
                .required()
        })
    }
}
