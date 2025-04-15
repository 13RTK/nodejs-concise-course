import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

function insertIdolGroupData(idolGroupData, htmlFile) {
  const memberItems = new Array(idolGroupData.memberCount)
    .fill('')
    .map((_, idx) => {
      const memberItem = idolGroupData.members[idx];

      return `<li className="list-row">
      <div>
        <img className="h-30" src="${memberItem.avatar}" />
      </div>
      <div>
        <div>${memberItem.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          ${memberItem.position}
        </div>
      </div>
    </li>`;
    });

  const result = htmlFile
    .replace('%GroupImage%', idolGroupData.avatar)
    .replace('%GroupName%', idolGroupData.groupName)
    .replace('%MemberList%', memberItems.join(''));

  return result;
}

const server = createServer(async (request, response) => {
  const { url } = request;

  // Read file
  const idolGroupsDataText = await readFile('./data.json', 'utf-8');
  const idolGroupsData = JSON.parse(idolGroupsDataText);

  // Read HTML template
  const htmlFile = await readFile('./info.html', 'utf-8');

  if (url.includes('/idol')) {
    // Get group name
    const encodedGroupName = url.split('/').at(-1);
    const groupName = encodedGroupName.replaceAll('%20', ' ');

    // Find matched data
    const resultIdolGroup =
      idolGroupsData.find(
        (group) => group.groupName.toLowerCase() === groupName.toLowerCase()
      ) || idolGroupsData[0];

    console.log(groupName);
    console.log(resultIdolGroup);

    // Response matched data
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.end(insertIdolGroupData(resultIdolGroup, htmlFile));
    return;
  }

  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.end(insertIdolGroupData(idolGroupsData[0], htmlFile));
});

server.listen(3000, '127.0.0.1', () => {
  // TODO: add http prefix
  console.log('Listening on 127.0.0.1:3000');
});
