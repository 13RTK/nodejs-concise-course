import app from './app.js';

const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`API Docs: http://localhost:${port}/api-docs`);
});
