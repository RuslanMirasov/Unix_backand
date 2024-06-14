const https = require('https');
const cheerio = require('cheerio');
const { DB_URL } = process.env;
const HttpError = require('./HttpError');

async function fetchHeadHTML(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, response => {
        let data = '';
        response.on('data', chunk => {
          data += chunk;
          if (data.includes('</head>')) {
            response.destroy();
            const headContent = data.split('</head>')[0] + '</head>';
            resolve(headContent);
          }
        });
        response.on('end', () => {
          if (!data.includes('</head>')) {
            reject(new Error('Head tag not found'));
          }
        });
      })
      .on('error', err => {
        reject(err);
      });
  });
}

async function fetchMetadata(url) {
  try {
    const headHTML = await fetchHeadHTML(url);
    const head = cheerio.load(headHTML);
    const title =
      head('meta[name="twitter:title"]').attr('content') ||
      head('meta[property="og:title"]').attr('content') ||
      head('meta[name="og:title"]').attr('content') ||
      head('title').text() ||
      'New Project';
    const image =
      head('meta[property="og:image"]').attr('content') ||
      head('meta[name="og:image"]').attr('content') ||
      '';

    return { title, image };
  } catch (error) {
    HttpError(500, 'Link is not valid');
  }
}

module.exports = fetchMetadata;
