import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const server = createServer(async (request, response) => {
  const { url } = request;
  console.log(url);

  // Read file
  const idolGroupsDataText = await readFile('./data.json', 'utf-8');
  const idolGroupsData = JSON.parse(idolGroupsDataText);

  if (url === '/') {
    // Response default data
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(idolGroupsData[0]));
  }

  if (url.includes('/idol')) {
    // Get group name
    const encodedGroupName = url.split('/').at(-1);
    const groupName = encodedGroupName.replaceAll('%20', ' ');

    // Find matched data
    const resultIdolGroup = idolGroupsData.find(
      (group) => group.groupName.toLowerCase() === groupName.toLowerCase()
    );

    console.log(groupName);
    console.log(resultIdolGroup);

    // Response matched data
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(resultIdolGroup));
  }
});

server.listen(3000, '127.0.0.1', () => {
  // TODO: add http prefix
  console.log('Listening on 127.0.0.1:3000');
});
