exports.run = (client, message, args) => {
    const Discord = require("discord.js")

 var request = require("request");

function secondsToDhms(seconds) {
seconds = Number(seconds);
var d = Math.floor(seconds / (3600*24));
var h = Math.floor(seconds % (3600*24) / 3600);
var m = Math.floor(seconds % 3600 / 60);
var s = Math.floor(seconds % 60);

var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
return dDisplay + hDisplay + mDisplay + sDisplay;
}

var options = { method: 'POST',
  url: 'https://api.uptimerobot.com/v2/getMonitors',
  headers:
   { 'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: { api_key: 'ur860204-abac669d1329e81066d2392c', format: 'json', logs: '1' } };
          
request(options, function (error, response, body) {
  if (error) throw new Error(error);
          
  var res = JSON.parse(body)
  var moni = res.monitors[0]
  var lastLog = moni.logs[0];
  var logDuration = lastLog.duration
  var emb = new Discord.RichEmbed()
    .setTitle("Uptime")
    .setColor("RANDOM")
    .setDescription(secondsToDhms(logDuration))
  message.channel.send(emb).catch(console.error);
});
}