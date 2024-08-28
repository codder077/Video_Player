// src/utils/parseSRT.js
export const parseSRT = (srt) => {
    const subtitleRegex = /(\d+)\s+(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})\s+(.+?)(?=\n\n|\n*$)/gs;
    let matches;
    const subtitles = [];
  
    while ((matches = subtitleRegex.exec(srt)) !== null) {
      const [_, index, startTime, endTime, text] = matches;
      subtitles.push({ index, startTime, endTime, text: text.replace(/\n/g, ' ') });
    }
  
    return subtitles;
  };
  