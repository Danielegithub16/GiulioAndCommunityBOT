const Discord = require('discord.js');
const client = new Discord.Client();
var request = require('request');
client.login(process.env.token);

client.on("ready", () => {
    console.log("ONLINE")
})


//CANCELLARE COMANDO IN CANALE SBAGLIATO
client.on("message", (message) => {
    //Non ho aggiunto KitRobit, AXVin, Sesh, Serverstats, Xenon, 
    var BOT = {
        mee6: {
            comandi: ["!lastvideo", "!youtube", "!ban", "!tempban", "!clear", "!nfractions", "!kick", "!mute", "!tempmute", "!slowmode", "!unban", "!unmute", "!warm"],
            id: "159985870458322944",
            canaliPermessi: ["801019779480944660"]
        },
        voiceMaster: {
            comandi: ["%voice", "%voice lock", "%voice unlock", "%voice name", "%voice limit", "%voice permit", "%voice reject", "%voice claim", "@voicemaster myprefix", "%aboutme", "%stats", "%ping", "%invite"],
            id: "472911936951156740",
            canaliPermessi: ["801019779480944660"]
        },
        plasma: {
            comandi: ["$ranks", "$inviteinfo", "$invites"],
            id: "716967712844414996",
            canaliPermessi: ["801019779480944660"]
        },
        arcane: {
            comandi: ["+leaderboard", "+rank", "+level", "+rewards", "+userinfo", "+serverinfo"],
            id: "437808476106784770",
            canaliPermessi: ["801019779480944660"]
        },
        suggester: {
            comandi: [".suggest"],
            id: "564426594144354315",
            canaliPermessi: ["793781901688963104"]
        },
        carlBot: {
            comandi: ["?aesthetics", "?clap", "?double", "?clap", "?fancy", "?fraktur", "?smallcaps", "?clap", "?double"],
            id: "235148962103951360",
            canaliPermessi: ["801019779480944660"]
        },
        couting: {
            comandi: ["c!server", "c!cs", "c!slb", "c!user"],
            id: "510016054391734273",
            canaliPermessi: ["801019779480944660", "793781899796938802"]
        },
        dankMemer: {
            comandi: ["pls"],
            id: "270904126974590976",
            canaliPermessi: ["800040259983376414"]
        },
        ticket: {
            comandi: ["t!open"],
            id: "508391840525975553",
            canaliPermessi: ["801019779480944660"]
        },
        groovy: {
            comandi: ["-play", "-play file", "-join", "-queue", "-p", "-q", "-pf", "-f", "-j", "-nest", "-n", "-skip", "-back", "-b", "-previous", "-prev", "-clear", "-jump", "-j", "-goto", "-loop", "-lt", "-ls", "-lq", "-lyrics", "-ly", "-pause", "-resume", "-unpause", "-remove", "-r", "-rm", "-delete", "-del", "-rr", "-disconnect", "-dc", "-leave", "-reset", "-shuffle", "-shuff", "-shuf", "-randomize", "-randomise", "-song", "-nowplayling", "-np", "-reset effects", "-fast forward", "-ff", "-fwd", "-rewind", "-rw", "-search", "-s", "-seek", "-stop", "-move", "-m", "-prefix", "-announce", "-perms"],
            id: "234395307759108106",
            canaliPermessi: ["799969723776892969"]
        }

    }

    var canaleNonConcesso = new Discord.MessageEmbed()
        .setTitle(":no_entry_sign: Canale non concesso :no_entry_sign: ")
        .setColor("ff0000")

    if (message.author.bot) return;
    if (message.author != "793768313934577664") return //DA TOGLIERE
    var trovato = false;
    var id;
    for (var i = 0; i < Object.keys(BOT).length; i++) {
        for (var x = 0; x < eval("BOT." + Object.keys(BOT)[0]).comandi.length; x++) {
            if (message.content.startsWith(eval("BOT." + Object.keys(BOT)[i]).comandi[x])) {
                if (!eval("BOT." + Object.keys(BOT)[i]).canaliPermessi.includes(message.channel.id)) {
                    id = eval("BOT." + Object.keys(BOT)[i]).id;
                    trovato = true;
                }
            }
        }
    }
    if (trovato && !message.member.hasPermission("ADMINISTRATOR")) {
        canaleNonConcesso.setDescription(message.author.toString() + " non puoi utilizzare i comandi di <@" + id + "> in questo canale!");
        message.channel.send(canaleNonConcesso)
            .then(msg => {
                msg.delete({ timeout: 5000 })
            })
        message.delete({ timeout: 5000 })
        return
    }
})

//YOUTUBE API
var id = "UCK6QwAdGWOWN9AT1_UQFGtA";
var key = "AIzaSyAoPIQMri9i6iqvJKZX5rulsM3LWYyCjsk";

var url = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=" + id + "&key=" + key;
var subscriptions, view, video
request({
    method: 'GET',
    url: url
}, function (err, response, text) {
    if (err) {

        return;
    }

    var json = JSON.parse(text);
    subscriptions = json.items[0].statistics.subscriberCount;
    view = json.items[0].statistics.viewCount;
    video = json.items[0].statistics.videoCount;
});
//Counter subscriptions
setInterval(function () {
    var canale = client.channels.cache.get("801717800137129994")
    canale.setName("🎬│subscribers: " + subscriptions);
}, 1000)
//Counter member
client.on("guildMemberAdd", member => {
    var canale = client.channels.cache.get("800802386587287562")
    canale.setName("👾│members: " + member.guild.memberCount)
    console.log(member.guild.memberCount)
});
client.on("guildMemberRemove", member => {
    var canale = client.channels.cache.get("800802386587287562")
    canale.setName("👾│members: " + member.guild.memberCount)
    console.log(member.guild.memberCount)
});

client.on("message", (message) => {
    var youtubeinfo = new Discord.MessageEmbed()
        .setTitle("\:projector: GiulioAndCode \:projector:")
        .setThumbnail("https://i.postimg.cc/3JsT2km4/Profilo2-PNG.png")
        .setDescription("Tutte le statistiche sul canale youtube di **GiulioAndCode**")
        .setColor("#41A9F6")
        .addField("Subscriptions", "```" + subscriptions + "```", true)
        .addField("View", "```" + view + "```", true)
        .addField("Video", "```" + video + "```", true)

    if (message.content == "!youtubeinfo") {
        message.channel.send(youtubeinfo)
    }
})