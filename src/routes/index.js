'use strict';
const express = require('express');
const { apiKey, checkPermission,  } = require('../auth/checkAuth');
const { asyncHandler } = require('../helpers/check.connect');
const router = express.Router();

// check API key
router.use(asyncHandler(apiKey))
router.use(checkPermission('0000'))
// check permissions

router.use('/v1/api',require('./access'))

module.exports = router