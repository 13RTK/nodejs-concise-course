import { readFile, writeFile, appendFile } from 'node:fs/promises';

const data = await readFile('./data.json', 'utf8');

// await writeFile("./data.json", "alex-john", "utf8");

await appendFile('./data.json', 'alex-john', 'utf8');

console.log(data);
