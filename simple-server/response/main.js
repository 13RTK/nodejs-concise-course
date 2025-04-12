import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';

const server = createServer(async (request, response) => {
  // Response plain
  // response.writeHead(200, { 'Content-Type': 'text/plain' });
  // response.end('Hello World!\n');
  // ==================================================
  // Response HTML
  // response.writeHead(200, { 'Content-Type': 'text/html' });
  // const htmlFile = await readFile('./index.html', 'utf-8');
  // response.end(htmlFile);
  // ==================================================
  // Response JSON
  const jsonFile = await readFile('./data.json', 'utf-8');

  // response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(jsonFile);
});

// Port, hostname(IP Address)
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
