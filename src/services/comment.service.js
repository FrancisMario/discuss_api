const { Op } = require('sequelize');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const db = require('../db/models');
/**
 * Get a comment by its ID
 * @param {number} commentId - The ID of the comment to retrieve
 * @returns {Promise<Object>} The comment object
 */
async function getCommentById(commentId) {
  const comment = await db.comment.findOne({
    where: { id: commentId },
  });

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  return comment;
}

/**
 * Get replies for a specific comment
 * @param {number} commentId - The ID of the comment
 * @returns {Promise<Array>} An array of reply comment objects
 */
async function getCommentReplies(parent_id) {
  const replies = await db.comment.findAll({
    where: { parent_id },
  });

  return replies;
}

/**
 * Create a new comment
 * @param {string} text - The text of the comment
 * @param {number} domainId - The ID of the domain associated with the comment
 * @returns {Promise<Object>} The created comment object
 */
async function createComment(text, domain_id, user, is_reply = false, parent_id = 0) {
  const comment = await db.comment.create({ text, domain_id, user, is_reply, parent_id });
  return comment;
}

/**
 * Create a new comment reply
 * @param {string} text - The text of the comment
 * @param {number} parent_id - The ID of the domain associated with the comment
 * @returns {Promise<Object>} The created comment object
 */
async function createCommentReply(text, parent_id) {
  const comment = await db.comment.create({ text, isReply: true, parent_id });

  return comment;
}

/**
 * Get all comments for a specific domain
 * @param {number} domainId - The ID of the domain
 * @returns {Promise<Array>} An array of comment objects
 */
async function getCommentsByDomain(domain_id) {
  console.log('domainID: ', domain_id)
  const comments = await db.comment.findAll({
    where: {
      domain_id,
      is_reply: false,
    },
  });

  return comments;
}

/**
 * Delete a comment by its ID
 * @param {number} commentId - The ID of the comment to delete
 * @returns {Promise<number>} The number of deleted comments (0 or 1)
 */
async function deleteCommentById(commentId) {
  const deletedCommentCount = await db.comment.destroy({
    where: { id: commentId },
  });

  if (deletedCommentCount === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  return deletedCommentCount;
}

async function upvoteComment(commentId) {
  // Find the comment by ID
  const comment = await getCommentById(commentId);

  if (!comment) {
    throw new Error('Comment not found');
  }

  // Perform the downvote logic, e.g., increment the downvote count
  const updatedComment = await comment.increment('upvote', { by: 1 });

  return updatedComment;
}

async function downvoteComment(commentId) {
  // Find the comment by ID
  const comment = await getCommentById(commentId);

  if (!comment) {
    throw new Error('Comment not found');
  }

  // Perform the downvote logic, e.g., increment the downvote count
  const updatedComment = await comment.increment('downvote', { by: 1 });

  return updatedComment;
}


module.exports = {
  getCommentById,
  createComment,
  getCommentsByDomain,
  deleteCommentById,
  getCommentReplies,
  upvoteComment,
  downvoteComment,
  createCommentReply,
};
