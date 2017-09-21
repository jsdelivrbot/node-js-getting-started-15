var express = require('express');
var app = express();
var axios = require('axios')
var Slack = require('slack-node');
var WebClient = require('@slack/client').WebClient;
var tracker = require('pivotaltracker');
var client = new tracker.Client('mytoken');
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.post('/webhook', function(request, response) {
	console.log('webhook'+request.body.action);
	let webhookUri = "https://hooks.slack.com/services/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";
	let slack = new Slack();
	slack.setWebhook(webhookUri);
	slack.webhook({
	channel: "@mpramodkumar",
	icon_emoji: ":ghost:",
	username:"PR assist For PR#99",
	as_user:"true",
	link_names:"true",
	text: "This is posted to #general and comes from a bot named webhookbot for repo "+request.query.repo
	}, function(err, res) {
		//console.log(res);
	});
	
	if(request !== undefined)
	console.log('request.body'+request.body.review);
	response.status(200).send('Ok')
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
    response.status(201).send(false)
	});
} 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
