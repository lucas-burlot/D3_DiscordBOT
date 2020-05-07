/* Module importation */
const DiscordInc = require('discord.js');
const fetch = require('node-fetch');
const getJSON = require('get-json');

/* variables */
const client = new DiscordInc.Client();
const prefix = "+";
const DISCORD_TOKEN = 'NjkxNjU5ODAzNjUwNjg3MDI3.XqQRow.3eBE1W6I3abW_1e_VYPJWO7btlw';
const BATTLENET_TOKEN = 'USSuxAbnty7lSAp1lXyiIFU3YuaGAYgU7b';



/* when the bot is ready */
client.on('ready', () => {
    console.log('[BOT] - Connection successful ');
});

/*  When bot receive specific message with prefix */
client.on('message', async message => {


    /* Functions */
    function errorEmbedMessage(){
        const errorAccountEmbed = new DiscordInc.MessageEmbed()
        .setTitle(':x: Account error :x:')
        .setDescription('The account does not exist, check the syntax')
        .setColor('#ff0000');
        message.channel.send(errorAccountEmbed);
    }
    

    /* variable args
     * .slice(prefix.length) -> remove the prefix
     * .trim() -> ensures there's no extra spaces before/after the text
     * .split(/ +/g) -> splits the string by one or many spaces
    */
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    //shift() - >remove one element from the array (for having like args[0], args[1] ...) 
    const command = args.shift().toLowerCase(); //

    /* COMMANDE profile */
    if(command == 'profile'){
        if(args[0] != null && args[1] != null){
            getJSON('https://eu.api.blizzard.com/d3/profile/' + args[0] + '%23' + args[1] + '/?locale=en_US&access_token=' + BATTLENET_TOKEN, function(error, response){
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
                    errorEmbedMessage();
                }
                
            });
        }else{
            const syntaxErrorEmbed = new DiscordInc.MessageEmbed()
                    .setTitle(':x: Syntax error :x:')
                    .setDescription('**Syntax** : +account __<name of account>__ __<battletag without #>__')
                    .setColor('#ff0000');
                    message.channel.send(syntaxErrorEmbed);
        }
    }

    /* COMMANDE character */
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
                        if((response.heroes[i].seasonal) == false){
                            response.heroes[i].seasonal == "No";
                        }else{
                            response.heroes[i].seasonal == "Yes";
                        }
                        menuEmbed.addField('**Character '+ parseInt(i+1) + '**', 'Character ID : ' + response.heroes[i].id
                        + '\n Character name : ' + response.heroes[i].name
                        + '\n Character class : ' + response.heroes[i].class
                        + '\n Character level : ' + response.heroes[i].level
                        + '\n Character paragon : ' + response.heroes[i].paragonLevel
                        + '\n Elites killed : ' + response.heroes[i].kills.elites
                        + '\n Seasonal character ?  : ' + (response.heroes[i].seasonal ? 'Yes' : 'No'));
                        
                    }
                    message.channel.send(menuEmbed);
                    //message.channel.send('Paragon level : ' + response.paragonLevel);
                }else{
                    errorEmbedMessage();
                }
                
            });
        }else{
            const syntaxErrorEmbed = new DiscordInc.MessageEmbed()
                    .setTitle(':x: Syntax error :x:')
                    .setDescription('**Syntax** : +character __<name of account>__ __<battletag without #>__')
                    .setColor('#ff0000');
                    message.channel.send(syntaxErrorEmbed);
        }
    }


        /* COMMANDE leader */
        if(command == 'leader'){
            if(args[0] != null && args[1] != null && args[2] != null){
                getJSON('https://eu.api.blizzard.com/data/d3/season/20/leaderboard/rift-' + args[0] + '?access_token=' + BATTLENET_TOKEN , function(error, response){
                    if(response != null){

                    const menuEmbed = new DiscordInc.MessageEmbed()
                    .setColor('#EFFF00')
                    .setAuthor("🍃 [SEASON "+ response.season + "] - " + response.title.en_US  + ' TOP ' + args[1] + ' to TOP '+ args[2] + '🍃')
                    
                    for(var i = args[1]-1; i < args[2]; i++){
                        var timeNumberMinute = parseInt(response.row[i].data[2].timestamp*0.0000167);
                        menuEmbed.addField('**:star: TOP '+ parseInt(i+1) + ' :star:** ', 'Profile : ' + response.row[i].player[0].data[0].string
                        + '\n Class : ' + response.row[i].player[0].data[2].string
                        + '\n Level : ' + response.row[i].player[0].data[4].number
                        + '\n Paragon Level : ' + response.row[i].player[0].data[5].number
                        + '\n Max RIFT : ' + response.row[i].data[1].number
                        + '\n Time : ' + timeNumberMinute+" mn " + parseInt((response.row[i].data[2].timestamp*0.0000167-timeNumberMinute)*60)+"s");
                    }
                    message.channel.send(menuEmbed);
                    }else{
                        errorEmbedMessage();
                    }
                    
                });
            }else{
                const syntaxErrorEmbed = new DiscordInc.MessageEmbed()
                        .setTitle(':x: Syntax error :x:')
                        .setDescription('**Syntax** : +leader __<class name>__ __<Start Number of TOP>__ __<End Number of TOP>__')
                        .setColor('#ff0000')
                        .addField('**The different class names :**',
                        "- Barbarian"
                        + "\n - Crusader"
                        + "\n - dh (for deamon hunter)"
                        + "\n - Monk"
                        + "\n - wd (for Witch doctor)"
                        + "\n - Wizard");
                        syntaxErrorEmbed.addField('**Number of top :**', 'Maximum of 25 in 25 (Like TOP1 to TOP25 or TOP5 to TOP30');
                        message.channel.send(syntaxErrorEmbed);
            }
        }


});

/* TOKENNNNNNNNNNNNN */
client.login(DISCORD_TOKEN);