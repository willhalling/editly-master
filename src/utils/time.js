function fancyTimeFormat(duration) {
  // Hours, minutes and seconds
  // ~~ short hand for Math.floor
  const hrs = ~~(duration / 3600);
  const mins = ~~((duration % 3600) / 60);
  const secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = '';

  if (hrs > 0) {
    ret += '' + hrs + '' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':'+ (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
}


function getDurationinSeconds(fabricText, additionalSeconds = 10) {
  const wordsPerMinute = 110;
  const wordsPerSecond = wordsPerMinute / 60;
  const totalWords = fabricText.trim().split(' ').length;
  let seconds = Math.floor(totalWords / wordsPerSecond + additionalSeconds);
  seconds = Math.max(1, seconds)
  console.log('seconds', seconds)
  return seconds;
}

module.exports = {
  fancyTimeFormat,
  getDurationinSeconds
};
