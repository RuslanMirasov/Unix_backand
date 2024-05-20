const https = require('https');
const cheerio = require('cheerio');
const { DB_URL } = process.env;

async function fetchHeadHTML(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;

        // Проверяем, содержит ли загруженная часть закрывающий тег </head>
        if (data.includes('</head>')) {
          // Останавливаем дальнейшее получение данных
          response.destroy();

          // Извлекаем содержимое тега <head>
          const headContent = data.split('</head>')[0] + '</head>';
          resolve(headContent);
        }
      });

      response.on('end', () => {
        if (!data.includes('</head>')) {
          // Если </head> не найден, возвращаем весь HTML
          resolve(data);
        }
      });

      response.on('error', err => {
        reject(err);
      });
    });
  });
}

async function fetchMetadata(url) {
  try {
    const headHTML = await fetchHeadHTML(url);
    const head = cheerio.load(headHTML);

    //  const title = head('meta[name = "twitter:title"]').attr('content');
    const title =
      head('meta[property = "og:title"]').attr('content') ||
      head('meta[name = "og:title"]').attr('content') ||
      head('title').text() ||
      'New Project';
    const image =
      head('meta[property = "og:image"]').attr('content') ||
      head('meta[name = "og:image"]').attr('content') ||
      DB_URL + '/img/placeholder.jpg';

    return { title, image };
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return { title: null, image: null };
  }
}

module.exports = fetchMetadata;
