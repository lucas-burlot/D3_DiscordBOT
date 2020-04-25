/* Module importation */
const DiscordInc = require('discord.js');
const fetch = require('node-fetch');
const getJSON = require('get-json');

/* variables */
const client = new DiscordInc.Client();
const prefix = "+";
const DISCORD_TOKEN = 'YOUR DISCORD TOKEN';
const BATTLENET_TOKEN = 'YOUR BATTLENET TOKEN;

/* when the bot is ready */
client.on('ready', () => {
    console.log('[BOT] - Connection successful ');
});

/*  When bot receive specific message with prefix */
client.on('message', async message => {

    /* variable args
     * .slice(prefix.length) -> remove the prefix
     * .trim() -> ensures there's no extra spaces before/after the text
     * .split(/ +/g) -> splits the string by one or many spaces
    */
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    //shift() - >remove one element from the array (for having like args[0], args[1] ...) 
    const command = args.shift().toLowerCase(); //

    /* COMMANDE ACCOUNT */
    if(command == 'profile'){
        if(args[0] != null && args[1] != null){
            getJSON('https://eu.api.blizzard.com/d3/profile/' + args[0] + '%23' + args[1] + '/?locale=fr_FR&access_token=' + BATTLENET_TOKEN , function(error, response){
                if(response != null){

                    /* Embed menu message */
                    const menuEmbed = new DiscordInc.MessageEmbed()
                    .setColor('#EFFF00')
                    .setAuthor(response.battleTag + ' account', 'https://lh3.googleusercontent.com/proxy/lq-Vfl07B2FhkgiKv7oxzCbB2u2gu4PIKkUCbbzcTwSKXOdfEoo2xD_gsqwlEznFI8wz_j2--__-6LmK556F3lTidedTz7UC-0q4uiw_4XjON9oQnv0')
                    .addFields(
                        {name: '**Informations section**', value : 'Account name : ' +  response.battleTag
                        + '\n Guild Name : ' + response.guildName
                        + '\n Number of characters : ' + response.heroes.length },

                        {name: '**Paragon section**', value: 'Total Paragon level: ' + response.paragonLevel 
                        + '\n Hardcore Paragon : '  + response.paragonLevelHardcore
                        + '\n Season Paragon : '  + response.paragonLevelSeason
                        + '\n Hardcore Season Paragon : '  + response.paragonLevelSeasonHardcore },


                        {name: '**Monsters section**',  value : ' Number of monsters killed : ' + response.kills.monsters 
                        + '\n Number of elites  killed : ' +response.kills.elites },
                    );
                    message.channel.send(menuEmbed);
                    //message.channel.send('Paragon level : ' + response.paragonLevel);
                }else{
                    const errorAccountEmbed = new DiscordInc.MessageEmbed()
                    .setTitle('Account error')
                    .setDescription('The account does not exist, check the syntax')
                    .setColor('#ff0000');
                    message.channel.send(errorAccountEmbed);
                }
                
            });
        }else{
            const syntaxErrorEmbed = new DiscordInc.MessageEmbed()
                    .setTitle('Syntax error')
                    .setDescription('**Syntax** : +account __<name of account>__ __<battletag without #>__')
                    .setColor('#ff0000');
                    message.channel.send(syntaxErrorEmbed);
        }
    }

    /* COMMANDE ACCOUNT */
    if(command == 'character'){
        if(args[0] != null && args[1] != null){
            getJSON('https://eu.api.blizzard.com/d3/profile/' + args[0] + '%23' + args[1] + '/?locale=en_US&access_token=' + BATTLENET_TOKEN , function(error, response){
                if(response != null){
                    /* Embed menu message */
                    const menuEmbed = new DiscordInc.MessageEmbed()
                    .setColor('#EFFF00')
                    .setAuthor(response.battleTag + ' account', 'https://lh3.googleusercontent.com/proxy/lq-Vfl07B2FhkgiKv7oxzCbB2u2gu4PIKkUCbbzcTwSKXOdfEoo2xD_gsqwlEznFI8wz_j2--__-6LmK556F3lTidedTz7UC-0q4uiw_4XjON9oQnv0')
                    .setDescription('Your have ' + response.heroes.length + ' characters on your account');
                    for(var i = 0; i < response.heroes.length; i++){
                        menuEmbed.addField('**Character '+ parseInt(i+1) + '**', 'Character ID : ' + response.heroes[i].id
                        + '\n Character name : ' + response.heroes[i].name
                        + '\n Character class : ' + response.heroes[i].class
                        + '\n Character level : ' + response.heroes[i].level
                        + '\n Character paragon : ' + response.heroes[i].paragonLevel
                        + '\n Elites killed : ' + response.heroes[i].kills.elites
                        + '\n Seasonal character ?  : ' + response.heroes[i].seasonal);
                        
                    }
                    message.channel.send(menuEmbed);
                    //message.channel.send('Paragon level : ' + response.paragonLevel);
                }else{
                    const errorAccountEmbed = new DiscordInc.MessageEmbed()
                    .setTitle('Account error')
                    .setDescription('The account does not exist, check the syntax')
                    .setColor('#ff0000');
                    message.channel.send(errorAccountEmbed);
                }
                
            });
        }else{
            const syntaxErrorEmbed = new DiscordInc.MessageEmbed()
                    .setTitle('Syntax error')
                    .setDescription('**Syntax** : +account __<name of account>__ __<battletag without #>__')
                    .setColor('#ff0000');
                    message.channel.send(syntaxErrorEmbed);
        }
    }
});

/* TOKENNNNNNNNNNNNN */
client.login(DISCORD_TOKEN);
