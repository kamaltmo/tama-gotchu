var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var http = require("http");
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

setInterval(function() {
    http.get("https://tama-gotchu-jfhpzgldwt.now.sh/");
    logger('Keeping my self alive');
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
            default:
              bot.sendMessage({
                to: channelID,
                message: 'I am currently a work in progress, forgive me'
              })
            break;
         }
     }
});