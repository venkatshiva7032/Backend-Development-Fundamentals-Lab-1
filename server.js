const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Hello');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please stop the other server and try again.`);
  } else {
    console.error('Server error:', error.message);
  }
  process.exit(1);
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Native HTTP server listening on http://localhost:${PORT}`);
  });
}

module.exports = server;
