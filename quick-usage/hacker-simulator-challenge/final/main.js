import { readFile, writeFile } from 'node:fs/promises';

/*
  1. Read files
  2. Decrypt data
  3. Write it into a new file
*/

// 1. Read files
const keychain = await readFile('./keychain.txt', 'utf-8');
const data = await readFile('./data.txt', 'utf-8');

// 2. Decrypt data

// Move right side
// const rightMoveDecryptedData = data
//   .split('')
//   .map((currentChar) => {
//     const decryptedCharCode = currentChar.charCodeAt(0) + keychain;
//     return String.fromCharCode(decryptedCharCode);
//   })
//   .join('');

// console.log(rightMoveDecryptedData);

// Move left side
const leftMoveDecryptedData = data
  .split('')
  .map((currentChar) => {
    const decryptedCharCode = currentChar.charCodeAt(0) - keychain;
    return String.fromCharCode(decryptedCharCode);
  })
  .join('');

// console.log(leftMoveDecryptedData);

// 3. Write decrypted data into a new file
await writeFile('./decrypted-data.txt', leftMoveDecryptedData, 'utf-8');
