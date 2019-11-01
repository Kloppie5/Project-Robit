var config = require('./config.json');

module.exports.validate = {
  "@everyone": function ( message ) {
    return true;
  },
  "@botowner": function ( message ) {
    return message.author.id == config.botownerid;
  },
  "@DnD": function ( message ) {
    return message.member.roles.find(r => r.name === "DnD");
  }
};
