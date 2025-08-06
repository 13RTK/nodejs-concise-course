import validator from 'validator';
import URLRecord from '../models/urlRecordModel.js';
import { generateShortURL } from '../utils/urlHelper.js';

export async function createURLRecord(req, res) {
  const { originURL, urlCode } = req.body;

  // If originURL is not provided
  if (!originURL) {
    return res.status(400).json({ message: 'Origin URL is required' });
  }

  // If originURL is not a valid URL
  if (!validator.isURL(originURL)) {
    return res.status(400).json({ message: 'Invalid origin URL' });
  }

  const urlRecord = await URLRecord.findOne({ where: { originURL } });
  if (urlRecord) {
    return res
      .status(200)
      .json({ message: 'Origin URL already exists', data: urlRecord });
  }

  // If urlCode is provided
  if (urlCode) {
    const urlRecord = await URLRecord.findOne({ where: { urlCode } });

    // If urlCode already exists
    if (urlRecord) {
      return res.status(400).json({ message: 'URL code already exists' });
    }

    // If urlCode is not provided, generate a short URL and create a new URL record
    const shortURL = await generateShortURL(urlCode);
    console.log(shortURL);
    const createdURLRecord = await URLRecord.create({
      id: Date.now(),
      originURL,
      shortURL,
      urlCode,
    });

    return res.status(201).json({
      message: 'URL record created successfully',
      data: createdURLRecord,
    });
  }

  // If urlCode is not provided, generate a short URL and create a new URL record
  const shortURL = await generateShortURL();
  const createdURLRecord = await URLRecord.create({
    id: Date.now(),
    originURL,
    shortURL,
    urlCode: shortURL.split('/').at(-1),
  });

  return res.status(201).json({
    message: 'URL record created successfully',
    data: createdURLRecord,
  });
}
