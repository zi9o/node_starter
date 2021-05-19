//@flow
const version = require('../../package.json').version;
const express = require('express');
const {Router} = require('express');

const router: Router = express.Router();

/* GET */
router.get('/', function(req, res) {
  res.status(501).send({ title: 'TEST-STARTER' });
});

/* GET API version*/
router.get('/version', function(req, res) {
  res.status(200).send({ version });
});

router.get('/health-check', (req, res) => {
  // console.log(`[${process.pid}]` ,new Date(), 'they check my health');
  res.send('all good!\n');
});


module.exports = router;
