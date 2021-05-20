// @flow
const express = require('express');
const {Router} = require('express');
const logger = require('../../config/winston-logger');
const {CommonErrors} = require('../common/_errors/common-errors');
const AuthController = require('../controllers/auth.controller');
const {AuthService} = require('../services/auth.service');
const router: Router = express.Router();

/**
 * Authenticate users
 */
router.post('/oauth2/token', async (req, res, next: Function) => {
  if (!req.body && !req.body.username || !req.body.password) {
    return res.status(CommonErrors.InvalidInput).json({
      success: false,
      error: {
        statusCode: CommonErrors.Forbidden,
        message: 'INPUTS_MISSING',
      },
    });
  }
  const username: string = req.body.username;
  const password: string = req.body.password;
  try {
    const token: string = await AuthController.signIn(username, password);
    logger.info('oauth2_token', {username});
    return res.status(200).json({token});
  } catch (e) {
    logger.error('oauth2_token_failed', {username, error: e});
    return next(e)
  }
});


module.exports = router;
