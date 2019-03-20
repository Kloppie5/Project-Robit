var config = require('./config.json');

module.exports.validate = {
  "@everyone": function ( message ) {
    return true;
  },
  "@botowner": function ( message ) {
    return message.author.id == config.botownerid;
  }
};
