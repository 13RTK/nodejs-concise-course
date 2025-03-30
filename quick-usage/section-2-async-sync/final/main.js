// import { readFile } from 'node:fs/promises';
import { readFile as readFileSync } from 'node:fs';

// const data = await readFile('./data.json', 'utf8');
// console.log(data);

readFileSync('./data.json', 'utf8', (error, data) => {
  if (error) {
    console.log(error.message);
  }

  console.log(data);
});
