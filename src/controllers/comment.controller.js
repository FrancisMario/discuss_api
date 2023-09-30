const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ApiError = require('../utils/ApiError');
const { commentService } = require('../services');
const { URL } = require('url');

const getCommentById = catchAsync(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await commentService.getCommentById(commentId);

  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  res.send({ comment });
});

const createComment = catchAsync(async (req, res) => {
  const { text, domain_id } = req.body;
  const createdComment = await commentService.createComment(text, domain_id, req.decodedTokenUser.userId);
  res.status(httpStatus.CREATED).send({ comment: createdComment });
});

const createReplyComment = catchAsync(async (req, res) => {
  const { text, domain_id, parent_id } = req.body;
  const createdComment = await commentService.createComment(text, domain_id, req.decodedTokenUser.userId, true, parent_id);
  res.status(httpStatus.CREATED).send({ comment: createdComment });
});

const getCommentsByDomain = catchAsync(async (req, res) => {
  const domainId = req.params.domainId;

  const comments = await commentService.getCommentsByDomain(domainId);
  res.send({ comments });
});

const deleteComment = catchAsync(async (req, res) => {
  const commentId = req.params.commentId;
  await commentService.deleteCommentById(commentId);
  res.send({ success: true });
});

const upvoteComment = catchAsync(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await commentService.upvoteComment(commentId);
  res.send({ success: true, comment });
});

const downvoteComment = catchAsync(async (req, res) => {
  const commentId = req.params.commentId;
  const comment = await commentService.downvoteComment(commentId);
  res.send({ success: true, comment });
});


const getCommentReplies = catchAsync(async (req, res) => {
  const parentCommentId = req.params.commentId;
  const replies = await commentService.getCommentReplies(parentCommentId);

  if (!replies) {
    res.send({ replies: [] });
    return;
    throw new ApiError(httpStatus.NOT_FOUND, 'Replies not found');
  }

  res.send({ replies });
});

module.exports = {
  getCommentById,
  createComment,
  getCommentsByDomain,
  deleteComment,
  getCommentReplies,
  downvoteComment,
  upvoteComment,
  createReplyComment,
};
