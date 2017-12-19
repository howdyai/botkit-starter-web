var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var debug = require('debug')('botkit:db');
module.exports = function(config) {


  mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
  });

  mongoose.Promise = global.Promise;

  // mongoose.set('debug', true);


  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    debug('CONNECTED TO DB!!!');
  });


  var userSchema = new Schema({
    id: {
      type: String,
      index: true,
    },
    name: String,
    attributes: {},
  })

  var users = mongoose.model('user', userSchema);


  var historySchema = new Schema({
    userId: {
      type: String,
      index: true,
    },
    message: {},
    date: {
      type: Date,
      default: new Date,
    }
  })

  var history = mongoose.model('history', historySchema);



  return {
    type: 'mongo+history',
    teams: {
      get: function(id, cb) {
      },
      save: function(data, cb) {
      },
      all: function(cb) {
      },
      count: function(cb) {
      },
      find: function(data, cb) {
      }
    },
    users: {
      get: function(id, cb) {
        return teams.findOne({
          id: id
        }, cb);

      },
      save: function(data, cb) {
        users.findOne({
          id: data.id
        }, function(err, user) {
          if (err) {
            if (cb) return cb(err);
          }
          if (!user) {
            user = new teams(data);
          }

          // copy values
          for (var key in data) {
            user[key] = data[key];
          }
          user.save(function(err) {
            if (cb) cb(err, user);
          });
        });
      },
      all: function(cb) {
        return users.find({}, cb);
      },
      find: function(data, cb) {
        return users.find(data, cb);
      }
    },
    history: {
      addToHistory: function(message, user) {

      },
      getHistoryForUser: function(user, limit) {

      }
    },
    channels: {
      get: function(id, cb) {
      },
      save: function(data, cb) {
      },
      all: function(cb) {
      },
      find: function(data, cb) {
      }
    }
  }

}
