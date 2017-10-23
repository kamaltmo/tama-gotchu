import Discord from 'discord.io';
import logger from 'winston';
import auth from './auth';
import { createStore } from 'redux';
import { reducer } from './reducers';
import { idle, feed, water } from './actions';

//Create a redux store for the bot
let store = createStore(reducer)

store.subscribe(() =>
  logger.info(store.getState())
)

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
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

//Start clock
setInterval(function() {
  logger.info('tick tock');
  store.dispatch(idle());
}, 60000);

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
              const state = store.getState();
              if (state.health > 0) {
                bot.sendMessage({
                  to: channelID,
                  message: 'Health: ' + state.health + '\n' + 'Fed: ' + state.fed + '\n' + 'Watered: ' + state.watered + '\n'
                })
              } else {
                bot.sendMessage({
                  to: channelID,
                  message: 'Its dead, you killed and now it is dead'
                })
              } 
          break;
          case 'feed':
              bot.sendMessage({
                  to: channelID,
                  message: 'You just fed the bot'
              })
              store.dispatch(feed());
          break;
          case 'water':
              bot.sendMessage({
                  to: channelID,
                  message: 'You just watered the bot'
              })
              store.dispatch(water());
          break;
          case 'DeveloperStateInfo':
            const CState = store.getState();
            bot.sendMessage({
                to: channelID,
                message: JSON.stringify(CState)
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