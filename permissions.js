var config = require('./config.json');

module.exports.validate = function ( permission_level, message ) {
  if (permission_level == "@everyone")
    return true;

  if (permission_level == "@botowner")
    return message.author.id == config.botownerid;

  if (permission_level == "@DnD")
    return message.member.roles.find(r => r.name === "DnD");

};
