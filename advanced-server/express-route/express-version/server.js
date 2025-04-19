import express from 'express';
import { readFile } from 'node:fs/promises';

const app = express();
const port = 3000;

app.get('/:idolName', async (request, response) => {
  // Get param from URL
  const idolName = request.params.idolName;

  const idolDataText = await readFile('./data.json', 'utf-8');
  const idolData = JSON.parse(idolDataText);

  // Find matched data
  const resultIdol = idolData.find(
    (idol) => idol.name.toLowerCase() === idolName.toLowerCase()
  );

  if (!resultIdol) {
    return response.status(404).send('404 Not Found');
  }

  return response.status(200).json(resultIdol);
});

app.listen(port, () => {
  console.log(`Example app listening on http://127.0.0.1:${port}`);
});
