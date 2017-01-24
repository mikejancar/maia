'use strict'
var Alexa = require('alexa-sdk');
var appId = 'amzn1.ask.skill.d4d48ef2-469f-446b-9047-838a74759dcc';

var skillName = 'Maia';
var helpMessage = 'You can say what NBA team does LeBron James play for or who does Tom Brady play for or other similar questions';
var helpReprompt = 'What can I help you with?';
var stopMessage = 'See ya!';

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context);
  alexa.APP_ID = appId;
  alexa.registerHandlers(handlers);
  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.emit('AMAZON.HelpIntent');
  },
  'GetPlayerTeamIntent': function(athlete, sport) {
    this.emit('GetPlayerTeam', athlete, sport);
  },
  'GetPlayerTeam': function(athlete, sport) {
    var speechOutput = (athlete || 'Lebron James') + ' plays ' + (sport || 'basketball');
    this.emit(':tellWithCard', speechOutput, skillName, speechOutput);
  },
  'AMAZON.HelpIntent': function () {
    var speechOutput = helpMessage;
    var reprompt = helpReprompt;
    this.emit(':ask', speechOutput, reprompt);
  },
  'AMAZON.CancelIntent': function () {
    this.emit(':tell', stopMessage);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', stopMessage);
  }
};