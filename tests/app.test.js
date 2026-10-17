const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../app');

const PORT = 3001;
let server;

function request(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: PORT,
      path,
      method: 'GET'
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(PORT, resolve);
  });
});

test.after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) return reject(error);
      resolve();
    });
  });
});

test('GET / returns welcome message with 200 status', async () => {
  const result = await request('/');
  assert.equal(result.statusCode, 200);
  assert.match(result.body, /Welcome to Backend Development Fundamentals Lab 1!/);
});

test('GET /about returns exact name and section with 200 status', async () => {
  const result = await request('/about');
  assert.equal(result.statusCode, 200);
  assert.equal(result.body, '{"name":"V.Venkatshiva","section":"CSE-GAI-2c"}');
});

test('GET /time returns timestamp JSON with 200 status', async () => {
  const result = await request('/time');
  assert.equal(result.statusCode, 200);
  const parsed = JSON.parse(result.body);
  assert.ok(parsed.timestamp);
  assert.ok(!Number.isNaN(Date.parse(parsed.timestamp)));
});

test('Unknown route returns 404 JSON error', async () => {
  const result = await request('/unknown');
  assert.equal(result.statusCode, 404);
  const parsed = JSON.parse(result.body);
  assert.match(parsed.error, /Route not found/i);
});
