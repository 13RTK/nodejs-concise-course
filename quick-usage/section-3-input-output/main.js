import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

const readLine = createInterface({
  input: stdin,
  output: stdout,
});

const name = await readLine.question("What's your name?\n");
const age = await readLine.question('How old are you?\n');

const birthYear = new Date().getFullYear() - age;

const answer = await readLine.question(
  `Welcome ${name}, your birth year is ${birthYear} right?(y/n)\n`
);

if (answer[0].toUpperCase() !== 'Y') {
  console.log(`I know, you were born at ${birthYear - 1}!`);
}

readLine.close();
