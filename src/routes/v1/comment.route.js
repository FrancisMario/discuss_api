const express = require('express');
const validate = require('../../middlewares/validate');
const { commentValidation } = require('../../validations'); // Import comment validation schemas
const { commentController } = require('../../controllers');

const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();

// Define routes for comments
// router.get('/', commentController.getCommentsByDomain);

// Route to create a comment with validation
router.post('/', commentController.createComment);

// Route to get a comment by ID with validation
router.get('/:commentId', commentController.getCommentReplies);

router.post('/:commentId', commentController.createReplyComment);

router.get('/:commentId/downvote', commentController.downvoteComment);

router.get('/:commentId/upvote', commentController.upvoteComment);

// Route to update a comment with validation
// router.patch('/:commentId', validate(commentValidation.updateComment), commentController.);

// Route to delete a comment with validation
router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
