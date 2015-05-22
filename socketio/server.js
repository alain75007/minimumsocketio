var connect = require('connect');
var http = require('http');
var fs = require('fs');
var app = connect();
var io;

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: false
}));

// respond to all requests
app.use(function(req, res){
  var filename;
  if (req.method == "GET") {
      var url = (req.url == '/') ? '/index.html' : req.url;
      filename =  __dirname + '/public' + url;
    console.log(req.method + ' ' + req.url + '=>' + filename);
    fs.readFile(filename, "utf8", function(err, data) {
      if (err) {
        res.writeHeader(404);
        res.end("Page non trouvé!");
      }
      else {
        res.end(data);
      }
    });
  }
  else {
    res.end('Ceci n\'est pas un GET! (' + req.method + ')\n');
  }
});

//create node.js http server and listen on port
var httpServer = http.createServer(app).listen(3001);
io = require('./lib/socketio.js')(httpServer);

//io.listen(httpServer);
/*
for (var prop in io)
  console.log(prop + '=>' + io[prop]);*/
console.log("Serveur démarré");
