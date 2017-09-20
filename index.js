var express = require('express');
var app = express();
var axios = require('axios')
var Slack = require('slack-node');
var WebClient = require('@slack/client').WebClient;
var tracker = require('pivotaltracker');
var client = new tracker.Client('mytoken');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/webhook', function(request, response) {
    console.log('webhook');
	response.status(200).send('Trade Finance Client')
});

app.post('/login', function(request, response) {
	console.log(request.query.username);
	getGithupApiUsers(request.query.username,response);
});

function getGithupApiUsers(username,response){
      console.log(username);
      axios({
	      method: 'GET',
	      url: 'https://api.github.com/orgs/CognizantStudio/memberships/'+username,
	      headers: {
		Authorization: 'Basic bXByYW1vZGt1bWFyOnZpY3RvcnkyOQ==',
		'Content-Type': 'application/json',
	      },
    })
	  .then(function(res){
		console.log('success'+res);
		response.status(200).send(true)
	})
	.catch(function (error) {
    console.log('fail'+error);
    response.status(200).send(false)
	});
} 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
