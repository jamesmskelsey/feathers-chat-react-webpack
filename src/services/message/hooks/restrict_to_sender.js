'use strict';

// src\services\message\hooks\restrict_to_sender.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};
const errors = require("feathers-errors");

module.exports = function(options) {
  return function(hook) {
    const messageService = hook.app.service("messages");
    return messageService.get(hook.id, hook.params).then(message => {
      if (message.sentBy._id !== hook.params.user._id) {
        throw new errors.NotAuthenticated('Access not allowed');
      }
      return hook;
    });
  };
};
