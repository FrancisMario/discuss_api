const Joi = require('@hapi/joi');

// Validation schema for getting comments
const getComments = {
  query: Joi.object({
    // Define query parameters if needed
  }),
};

// Validation schema for creating a comment
const createComment = {
  body: Joi.object({
    text: Joi.string().required(), // Assuming 'text' is required for comment creation
    domain: Joi.string().optional(),
    isReply: Joi.string().optional(),
    parent: Joi.string().optional(),
    // Add other required fields for comment creation
  }),
};

// Validation schema for getting a comment by ID
const getComment = {
  params: Joi.object({
    commentId: Joi.string().required(), // Assuming 'commentId' is a required parameter
  }),
};

// Validation schema for updating a comment
const updateComment = {
  params: Joi.object({
    commentId: Joi.string().required(), // Assuming 'commentId' is a required parameter
  }),
  body: Joi.object({
    // Define fields that can be updated in the request body
    // Example: text: Joi.string().optional(),
  }),
};

// Validation schema for deleting a comment
const deleteComment = {
  params: Joi.object({
    commentId: Joi.string().required(), // Assuming 'commentId' is a required parameter
  }),
};

module.exports = {
  getComments,
  createComment,
  getComment,
  updateComment,
  deleteComment,
};
