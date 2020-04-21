const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const server = require('./firebase');

// Creates the Discord Client Object
const client = new Discord.Client();

// Turning the bot "ON"
client.on('ready', () => {
    console.log('Bot Up and Running');
});

// Shows users avatar and mentions them in the return.
client.on('message', message => {
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL);
    }
});

// Changes Discord Image Every Six Minutes after using command
client.on('message', message => {
    
    if (message.content === prefix + 'start') {
	console.log('Avatar Interval Started');
	setInterval(function() {
	  server.getURL().then(response => {
	      client.user.setAvatar(response)
		  .then(user => console.log('New Avatar Set'))
		  .catch(console.error);
            })
	}, 360000);
    }
});


client.login(token);
