const http = require('http');
const PORT = 7777;

http.createServer((req, res) => {
  console.log(req.url);
  
  if (req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>SPEED SERVER</h1><p>Owner: monoporlil9-rgb</p><p>Port: 7777</p><a href="/download/10">Download 10MB</a>');
  } 
  else if (req.url.startsWith('/download/')) {
    const mb = parseInt(req.url.split('/')[2]);
    const size = mb * 1048576;
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'application/octet-stream'
    });
    
    const chunk = Buffer.alloc(1048576, 'A');
    for(let i = 0; i < mb; i++) {
      res.write(chunk);
    }
    res.end();
    console.log('Downloaded: ' + mb + 'MB');
  }
  else {
    res.end('monoporlil9-rgb Speed Server');
  }
}).listen(PORT, () => {
  console.log('SPEED SERVER PORT ' + PORT);
  console.log('Owner: monoporlil9-rgb');
  console.log('Ready!');
});
