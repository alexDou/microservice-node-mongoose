const Joi = require('joi');

module.exports = {
    // POST /user-comments/users
    createUser: {
        body: Joi.object({
            id: Joi.string()
                .regex(/^[0-9]{10,}$/)
                .required(),
            username: Joi.string()
                .min(2)
                .max(200)
                .required(),
            profilePictureUrl: Joi.string()
                .regex(/^http[s]?:\/\/[^\s]+$/)
                .required(),
            contact: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string().email().required()
            }).or('firstName', 'lastName'),
            updatedAt: Joi.date()
        })
    },

    // UPDATE /user=comments/users/:userId
    updateUser: {
        body: Joi.object({
            id: Joi.string(),
            username: Joi.string()
                .max(200),
            profilePictureUrl: Joi.string()
                .regex(/^http[s]?:\/\/[^\s]+$/),
            contact: Joi.object({
                firstName: Joi.string(),
                lastName: Joi.string(),
                email: Joi.string().email()
            }),
            updatedAt: Joi.date()
        }),
        params: Joi.object({
            userId: Joi.string()
                .regex(/^[a-f0-9]{10,}/i) // hex(_id) or id([0-9])
                .required()
        })
    },

    // DELETE /user-comments/users/:userId
    deleteUser: {
        params: Joi.object({
            userId: Joi.string()
                .regex(/^[a-f0-9]{10,}/i)
                .required()
        })
    }
}
