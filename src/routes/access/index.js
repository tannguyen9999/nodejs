'use strict';
const express = require('express');
const { authentication, authenticationV2 } = require('../../auth/authUtils');
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../helpers/check.connect');
const router = express.Router()
router.post('/shop/signup',asyncHandler(accessController.signUp))
router.post('/shop/login',asyncHandler(accessController.login))

router.use(authenticationV2)
router.post('/shop/logout',asyncHandler(accessController.logout))
router.post('/shop/handleRefreshToken',asyncHandler(accessController.handleRefreshToken))




module.exports = router