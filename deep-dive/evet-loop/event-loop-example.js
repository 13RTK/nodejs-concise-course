import * as fsCallBack from 'node:fs';
import * as fsPromise from 'node:fs/promises';

// 1. Sync, execute in order
const data = fsCallBack.readFileSync('./data.json', 'utf-8');

console.log(data);
console.log('Other things');

// 2. Async Callback
// fsCallBack.readFile('./data.json', 'utf-8', (error, data) => {
//   if (error) {
//     console.log(error.message);
//   }
//   console.log(data);
// });

// console.log('Other things');

// 3. Microtask
// setTimeout(() => {
//   console.log('timeout');
// }, 10);

// Promise.resolve().then(() => console.log('Promise'));

// console.log('Other things');

// 4. Special case(I/O)
