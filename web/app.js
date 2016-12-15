var http = require('http');
var fs = require('fs');


function onRequest(request, response) {
  if (request.method == 'GET' && request.url == '/'){
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.createReadStream("./index.html").pipe(response);
  }
  else{
    show404Error(response);
  }
}

function show404Error(response){
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("Error 404: Page not found!");
  response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server is running at http://localhost:8888...");
