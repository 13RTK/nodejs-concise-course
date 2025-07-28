import * as fsCallBack from 'node:fs';
import * as fsPromise from 'node:fs/promises';

const data = fsCallBack.readFileSync('./data.json', 'utf-8');

console.log(data);
console.log('Other things');

fsCallBack.readFile('./data.json', 'utf-8', (error, data) => {
  if (error) {
    console.log(error.message);
  }
  console.log(data);
});

console.log('Other things');
