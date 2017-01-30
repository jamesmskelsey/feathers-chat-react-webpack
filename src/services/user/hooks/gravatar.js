'use strict';

// src\services\user\hooks\gravatar.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};
const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = `s=60`;

const gravatarImage = email => {
  const hash = crypto.createHash('md5').update(email).digest('hex');

  return `${gravatarUrl}/${hash}?${query}`;
}

module.exports = function(options) {
  return function(hook) {
    hook.data = Object.assign({}, hook.data, {
      avatar: gravatarImage(hook.data.email)
    });
  };
};
