// OPTIMIZED SPEED SERVER
// Owner: monoporlil9-rgb
// Date: 2025-11-07 19:51

const http = require('http');
const { Worker, isMainThread, parentPort } = require('worker_threads');
const PORT = 7777;
const CHUNK_SIZE = 8 * 1024 * 1024; // 8MB chunks

if (isMainThread) {
  const server = http.createServer((req, res) => {
    const time = new Date().toLocaleString('th-TH');
    console.log(`[${time}] ${req.url}`);
    
    if (req.url === '/') {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>⚡ Optimized Speed Server</title>
          <style>
            body { font-family: Arial; padding: 20px; background: #1a1a1a; color: #0f0; }
            h1 { color: #0ff; text-shadow: 0 0 10px #0ff; }
            .btn { display: inline-block; padding: 10px 20px; background: #0f0; color: #000; text-decoration: none; margin: 5px; font-weight: bold; }
            .info { background: #000; padding: 15px; border: 1px solid #0f0; margin: 10px 0; }
          </style>
        </head>
        <body>
          <h1>⚡ OPTIMIZED SPEED SERVER</h1>
          <div class="info">
            <div>👤 Owner: monoporlil9-rgb</div>
            <div>📡 Port: ${PORT}</div>
            <div>🕐 Time: ${time}</div>
            <div>⚙️ Chunk: ${CHUNK_SIZE/1024/1024}MB</div>
            <div>✅ Status: OPTIMIZED</div>
          </div>
          <div>
            <a class="btn" href="/download/10">📥 10 MB</a>
            <a class="btn" href="/download/100">📥 100 MB</a>
            <a class="btn" href="/download/500">📥 500 MB</a>
          </div>
        </body>
        </html>
      `);
    }
    else if (req.url.startsWith('/download/')) {
      const mb = parseInt(req.url.split('/')[2]) || 10;
      const size = mb * 1024 * 1024;
      
      // Optimized headers
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="test-${mb}mb.bin"`,
        'Cache-Control': 'no-cache',
        'X-Optimized': 'true'
      });
      
      // Fast streaming
      let sent = 0;
      const chunk = Buffer.alloc(CHUNK_SIZE, 0);
      
      function sendData() {
        while (sent < size) {
          const remaining = size - sent;
          const toSend = Math.min(CHUNK_SIZE, remaining);
          const data = toSend === CHUNK_SIZE ? chunk : chunk.slice(0, toSend);
          
          if (!res.write(data)) {
            res.once('drain', sendData);
            return;
          }
          sent += toSend;
        }
        res.end();
        console.log(`✅ Downloaded ${mb}MB - Speed optimized`);
      }
      
      sendData();
    }
    else if (req.url === '/api/status') {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({
        status: 'online',
        owner: 'monoporlil9-rgb',
        port: PORT,
        version: 'optimized',
        chunkSize: CHUNK_SIZE,
        time: new Date().toISOString()
      }, null, 2));
    }
    else {
      res.end('Optimized Server - monoporlil9-rgb');
    }
  });
  
  // Socket optimization
  server.on('connection', (socket) => {
    socket.setNoDelay(true);
    socket.setKeepAlive(true, 1000);
  });
  
  server.maxHeadersCount = 0;
  server.timeout = 0;
  
  server.listen(PORT, '0.0.0.0', () => {
    console.log('╔════════════════════════════════════════╗');
    console.log('║   ⚡ OPTIMIZED SPEED SERVER            ║');
    console.log('╠════════════════════════════════════════╣');
    console.log('║   👤 Owner: monoporlil9-rgb            ║');
    console.log('║   📡 Port: ' + PORT + '                        ║');
    console.log('║   ⚙️  Chunk: ' + (CHUNK_SIZE/1024/1024) + 'MB                      ║');
    console.log('║   🕐 ' + new Date().toLocaleString('th-TH') + '        ║');
    console.log('╠════════════════════════════════════════╣');
    console.log('║   📱 http://localhost:' + PORT + '             ║');
    console.log('╚════════════════════════════════════════╝');
  });
}
