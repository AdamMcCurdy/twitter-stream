var TwitterStreamChannels = require('twitter-stream-channels');
var credentials = require('./twitter.creds.json');
var io = require('socket.io')(3000);

var client = new TwitterStreamChannels(credentials);

var channels = {
 "languages" : [
		'#AdidasRunning', 
		'#adidasrunning', 
		'#bostonmarathon',
		'#BostonMarathon', 
		'#bostonrunbase',
		'#BostonRunbase',
		'#BostonRunBase'
		]
};

var stream = client.streamChannels({track:channels});

stream.on('channels/languages',function(tweet){
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
});

