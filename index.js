const Discord = require('discord.js');
const { prefix, token } = require('./config.json')

// Creates the Discord Client Object
const client = new Discord.Client();

// Turning the bot "On"
client.on('ready', () => {
    console.log('Bot Up and Running');
});

client.on('message', message => {
    // Testing Avatar Function URL
    if (message.content === prefix + 'avatar') {
        message.reply(message.author.avatarURL);
    }

    // Changes currently logged in user avatar
    // TODO: Pull from api or cloud storage (firebase) random png every time.
    if (message.content === prefix + 'trigger') {
        client.user.setAvatar('./ayumu.png')
            .then(user => console.log('New Avatar Set'))
            .catch(console.error);
    }

});

client.login(token);
