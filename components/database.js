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
    attributes: {
      type: Object,
      default: {},
    },
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
      default: Date.now,
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
        return users.findOne({
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
            user = new users(data);
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
      },
      remember: function(userId, fields) {
        return new Promise(function(resolve, reject) {
          users.findOne({id: userId}, function(err, user) {
            if (!user) {
              user = new users({id: userId, attributes: {}});
            }

            for (var field in fields) {
              user.attributes[field] = fields[field];
            }

            user.markModified('attributes');

            user.save(function(err) {

              if (err) {
                return reject(err);
              }
              resolve(user);
            });
          });
        });
      }
    },
    history: {
      addToHistory: function(message, user) {
        return new Promise(function(resolve, reject) {
          var hist = new history({userId: user, message: message});
          hist.save(function(err) {
            if (err) { return reject(err) }
            resolve(hist);
          });
        });
      },
      getHistoryForUser: function(user, limit) {
        return new Promise(function(resolve, reject) {
          history.find({userId: user}).sort({date: -1}).limit(limit).exec(function(err, history) {
            if (err) {  return reject(err) }
            resolve(history.reverse());
          });
        });
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
