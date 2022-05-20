var pubSubHubbub = require("pubsubhubbub");
const Discord = require("discord.js");
const dotenv = require("dotenv");
const config  = require("./config.json");
const client = new Discord.Client();
const YouTubeNotifier = require('youtube-notification');

dotenv.config();

client.once("ready", async () => {
    console.log('discord bot ready to send notifications')
});

client.login(process.env.DISCORD_BOT);

const notifier = new YouTubeNotifier({
  hubCallback: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`,
  port: process.env.PORT,
  Secret: 'scoot doo',
  path: '/youtube'
});

notifier.setup();
 
notifier.on('notified', data => {
  console.log(data)
  let Channel = message.client.channels.cache.find(channel => channel.name == config.discord_channel);
  Channel.send(`${data.channel.name} just uploaded a new video titled: ${data.video.title}. watch it at: ${data.video.link}`)
});
 
notifier.subscribe(config.subs);

