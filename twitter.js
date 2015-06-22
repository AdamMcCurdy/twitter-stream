var TwitterStreamChannels = require('twitter-stream-channels');
var credentials = require('./twitter.creds.json');
var io = require('socket.io')(3000);

var client = new TwitterStreamChannels(credentials);

var channels = {
 "languages" : [
<<<<<<< HEAD
		'#AdidasRunning',
		'#adidasrunning',
		'#Adidasrunning
		'#BostonRunbase',
		'#bostonrunbase',
		'#Bostonrunbase',
		'#BostonMarathon',
		'#bostonmarathon'
=======
		'#adidas',
		'#Adidas',
		'#AdidasRunning', 
		'#adidasrunning', 
		'#bostonmarathon',
		'#BostonMarathon',
		'#Bostonmarathon', 
		'#BOSTONMARATHON',
		'#bostonrunbase',
		'#BostonRunbase',
		'#BostonRunBase',
		'#BOSTONRUNBASE'
>>>>>>> 558d042
		]
};
var blackList = [
'anwar',
'tamerlan',
'dzhokhar',
'tsarnaev',
'attack',
'kill',
'trial',
'sentenc'
'murder',
'explo',
'bomb'
];

function isBlackListed(str, arr)
{
  for (var i=0; i<arr.length; i++) {
    console.log(arr[i])
    if (str.indexOf(arr[i]) === -1) {
      return true;
    }
  }
}

var stream = client.streamChannels({track:channels});

stream.on('channels/languages',function(tweet){
  if(isBlackListed(tweet.text.toLowerCase(), blackList) == true) {
    console.log("black listed tweet")
    return;
  }
  else {
      if(tweet.entities.media)
    {
      io.emit('languages', tweet.user.profile_image_url.toString(),
                           tweet.user.screen_name.toString(),
                           tweet.text,
                           tweet.entities.media[0].media_url.toString());
      console.log('>languages',tweet.entities.media[0].media_url.toString());
    }
    else{
       io.emit('languages', tweet.user.profile_image_url.toString(),
                           tweet.user.screen_name.toString(),
                           tweet.text,
                           'none');
        console.log('>languages',tweet.text);
    }
  }
});

