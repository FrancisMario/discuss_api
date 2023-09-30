const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const roleRoute = require('./role.route');
const commentRoute = require('./comment.route');
const domainRoute = require('./domain.route');
const docsRoute = require('./docs.route');
const publicRoute = require('./public.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/roles', roleRoute);
router.use('/docs', docsRoute);
router.use('/comments', commentRoute);
router.use('/domains', domainRoute);
router.use('/public', publicRoute);


module.exports = router;
