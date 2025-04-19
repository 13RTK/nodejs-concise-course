import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const server = createServer(async (req, res) => {
  // Get URL
  // /hina
  const { url } = req;

  // Read data
  const idolDataText = await readFile('./data.json', 'utf-8');
  const idolData = JSON.parse(idolDataText);

  // Get param from URL
  const idolName = url.split('/').at(-1);

  // Without param
  if (!idolName) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('400 Bad Request');
    return;
  }

  // Find matched data
  const resultIdol = idolData.find(
    (idol) => idol.name.toLowerCase() === idolName.toLowerCase()
  );

  // Without matched data
  if (!resultIdol) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
    return;
  }

  // Response matched data
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(resultIdol));
});

server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
