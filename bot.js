var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var http = require("http");
import { createStore } from 'redux';
import reducer from 'reducers';
import actions from '../actions';

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// setInterval(function() {
//     http.get("https://tama-gotchu-jfhpzgldwt.now.sh/");
//     logger('Keeping my self alive');
// }, 300000);


// Initialize Bot
let store = createStore(reducer)

store.subscribe(() =>
  console.log(store.getState())
);

setInterval(function() {
    logger('tick tock');
    logger(store.getState());
}, 300000);

// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
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
                })
            break;
            case 'status':
                state = store.getState();
                bot.sendMessage({
                    to: channelID,
                    message: 'Health: ' + state.health + '\n' + 'Feed: ' + state.feed + '\n' + 'Watered: ' + state.watered + '\n'
                })
            break;
            case 'feed':
                bot.sendMessage({
                    to: channelID,
                    message: 'You just feed the bot'
                })
                store.dispatch(actions.feed);
            break;
            case 'water':
                bot.sendMessage({
                    to: channelID,
                    message: 'You just watered the bot'
                })
                store.dispatch(actions.water);
            break;
            default:
              bot.sendMessage({
                to: channelID,
                message: 'I am currently a work in progress, forgive me'
              })
            break;
         }
     }
});