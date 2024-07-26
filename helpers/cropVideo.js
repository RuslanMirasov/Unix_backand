const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const { Readable } = require('stream');

// Устанавливаем путь к ffmpeg
ffmpeg.setFfmpegPath(ffmpegPath);

const cropVideo = (buffer, outputPath, width, height) => {
  return new Promise((resolve, reject) => {
    const stream = Readable.from(buffer);

    ffmpeg(stream)
      .videoFilters([
        `scale=${width}:${height}:force_original_aspect_ratio=increase`, // Масштабирование с сохранением пропорций
        `crop=${width}:${height}`, // Обрезка до нужных размеров
      ])
      .output(outputPath)
      .on('end', () => {
        resolve(outputPath);
      })
      .on('error', err => {
        reject(err);
      })
      .run();
  });
};

module.exports = cropVideo;
