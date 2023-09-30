const express = require('express');
const validate = require('../../middlewares/validate');
const { domainValidation } = require('../../validations'); // Import domain validation schemas
const { domainController } = require('../../controllers');
const { commentController } = require('../../controllers');

const { grantAccess } = require('../../middlewares/validateAccessControl');
const { resources } = require('../../config/roles');

const router = express.Router();


router.get('/domain/:domainId', domainController.getDomain);

router.get('/domain/:domainId/comments', commentController.getCommentsByDomain);

router.get('/domain/:domainId/comment/:commentId', commentController.getCommentReplies);

module.exports = router;
