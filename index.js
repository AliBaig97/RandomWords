const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", function(){
  console.log("Ready");
});

const prefix = "_";

const randomWord = require("random-word");

var interval; //a random word every 5 or 10 seconds?
var seconds = 8;
var wrongServer = false;

client.on("message", function(message){
  if(message.author.equals(client.user)) return;
  
  if(message.content.startsWith(prefix + "words") && !wrongServer){
    message.channel.send("Starting Random Word Generator.. Do _end to end it. Have Fun!");

    message.channel.send(randomWord()); //first randomWord before the interval
    interval = setInterval(function(){
      message.channel.send(randomWord());
    }, seconds * 1000);
  }

  if(message.content.startsWith(prefix + "end")){ //stop the words
    console.log("Ending words");
    clearInterval(interval);
    message.channel.send("Ending Random Word Generator.. Goodbye!");
  }

  if(message.content.startsWith(prefix + "settings")){
    var settingsOutput = "---------------\n"
                       + "THE OPTIONS\n"
                       + "---------------\n"
                       + "_change seconds - Adjust the speed of the words spitting out\n"
                       + "--------------- \n";

    message.channel.send(settingsOutput);
  }
  
  if(message.content.startsWith(prefix + "help")){ //_help info
    var helpOutput = "to be implemented";

    message.channel.send(helpOutput);
  }

});

client.login(process.env.BOT_TOKEN);
