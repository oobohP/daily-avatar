const Discord = require('discord.js');
const { prefix, token } = require('./config.json')
const server = require('./firebase');

// Creates the Discord Client Object
const client = new Discord.Client();

// Turning the bot "ON"
client.on('ready', () => {
    console.log('Bot Up and Running');
});

client.on('message', message => {
    // Testing Avatar Function URL
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL);
    }

    // Changes currently logged in user avatar
    // TODO: 1. Pull from api or cloud storage (firebase) random jpeg every time.
    //       2. Have this automated to run twice every ten minutes by default and catch for errors if rate limited

    if (message.content === prefix + 'change') {
        server.getURL().then(response => {
            console.log(response);
            client.user.setAvatar(response)
                .then(user => console.log('New Avatar Set'))
                .catch(console.error);
        })
    }
});

client.login(token);
