'use strict';

var _discord = require('discord.io');

var _discord2 = _interopRequireDefault(_discord);

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _redux = require('redux');

var _reducers = require('./reducers');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Create a redux store for the bot
var store = (0, _redux.createStore)(_reducers.reducer);

store.subscribe(function () {
    return _winston2.default.info(store.getState());
});

// Configure logger settings
_winston2.default.remove(_winston2.default.transports.Console);
_winston2.default.add(_winston2.default.transports.Console, {
    colorize: true
});
_winston2.default.level = 'debug';
// Initialize Discord Bot
var bot = new _discord2.default.Client({
    token: _auth2.default.token,
    autorun: true
});
bot.on('ready', function (evt) {
    _winston2.default.info('Connected');
    _winston2.default.info('Logged in as: ');
    _winston2.default.info(bot.username + ' - (' + bot.id + ')');
});

//Start clock
setInterval(function () {
    _winston2.default.info('tick tock');
    store.dispatch((0, _actions.idle)());
    _winston2.default.info(store.getState());
}, 60000);

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch (cmd) {
            // !Live
            case 'LIVE':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello, world 0.0!'
                });
                break;
            // Just add any case commands if you want to..
            case 'master':
                bot.sendMessage({
                    to: channelID,
                    message: 'I was created by kamal osman'
                });
                break;
            case 'status':
                var state = store.getState();
                if (state.health > 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Health: ' + state.health + '\n' + 'Fed: ' + state.fed + '\n' + 'Watered: ' + state.watered + '\n'
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Its dead, you killed and now it is dead'
                    });
                }
                break;
            case 'feed':
                bot.sendMessage({
                    to: channelID,
                    message: 'You just fed the bot'
                });
                store.dispatch((0, _actions.feed)());
                break;
            case 'water':
                bot.sendMessage({
                    to: channelID,
                    message: 'You just watered the bot'
                });
                store.dispatch((0, _actions.water)());
                break;
            case 'DeveloperStateInfo':
                var CState = store.getState();
                bot.sendMessage({
                    to: channelID,
                    message: JSON.stringify(CState)
                });
                break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: 'I am currently a work in progress, forgive me'
                });
                break;
        }
    }
});