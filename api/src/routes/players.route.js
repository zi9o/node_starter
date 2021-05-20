// @flow
const express = require('express');
const {Router} = require('express');
const logger = require('../../config/winston-logger');
const {CommonErrors} = require('../common/_errors/common-errors');
const {addPlayer} = require('../controllers/player.controller');
const {AuthService} = require('../services/auth.service');
const router: Router = express.Router();

/**
 * Create a player
 */
router.post('/', async (req, res, next: Function) => {
  if (!req.body && !req.body.name || !req.body.score) {
    return res.status(CommonErrors.InvalidInput).json({
      success: false,
      error: {
        statusCode: CommonErrors.InvalidInput,
        message: 'INPUTS_MISSING',
      },
    });
  }
  try {
    return res.status(200).json(await addPlayer(req.user, req.body));
  } catch (e) {
    logger.error('player_creation_failed', {id: req.user.userId, error: e});
    return next(e)
  }
});


module.exports = router;
