'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/query', controller.query);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.patch('/me', auth.isAuthenticated(), controller.updateMe);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.post('/reset', controller.requestResetPassword);
router.put('/reset', controller.resetPassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
