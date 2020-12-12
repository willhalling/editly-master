const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');

const NAME = 'gabor-mate';
const PRIMARY_COLOUR = '#FFF';
const FONT_FAMILY = 'Playfair Display';
const FONT_SIZE = 52;
const AUDIO_START_TIME = 4;
const AUDIO_MIX_VOLUME = 5;
const TEXT_START_TIME = 2;

async function func({ width, height, fabric, params }) {

  async function onRender(progress, canvas) {

    const percent = Math.floor(progress * 100);

    // const fadeInEasedProgress = easeOutExpo(progress);

    console.log('Percent', `${percent}%`);

    console.log('progress', progress);

    // revers for fade out %, e.g: https://stackoverflow.com/a/35821905
    // const percentageDecrease = 1.0 - progress;
    // const fadeOutEasedProgress = easeOutExpo(Math.min(percentageDecrease, threeQuartersTime));

    // const easedProgress = easeInOutCubic(progress);

    const delay = 0;
    const speed = 1;

    const easedProgress = easeOutExpo(Math.max(0, Math.min((progress - delay) * speed * 3, 1)));

    // console.log('fadeOutEasedProgress', fadeOutEasedProgress);
    const min = Math.min(width, height);
    const padding = 0.05 * min;

    if (params.fabricType === 'caption') {
      const position = getPosition(width, height, params.fabricPosition, padding);
      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: FONT_FAMILY,
        width: 960 - (padding * 2),
      });
      text.set({
        ...position,
        opacity: easedProgress,
      });
      canvas.add(text);
      canvas.renderAll(text);
    }
  }
  function onClose() {
    // Cleanup if you initialized anything
  }

  return { onRender, onClose };
}

const editSpec = {
  outPath: `../dist/${NAME}.mp4`,
  width: 1920,
  height: 1080,
  defaults: {
    duration: 5,
    transition: {
      duration: 2,
      name: 'fadecolor',
    },
    layer: {
      fontPath: '../fonts/PlayfairDisplay.ttf',
      zoomAmount: 0.15,
      // ...more layer defaults
    },
  },
  // audioFilePath: '../audio/drama-piano.mp3',
  loopAudio: false,
  keepSourceAudio: true,
  audioNorm: {
    enable: true,
    gaussSize: 5,
    maxGain: 50
  },
  // clipsAudioVolume: 50,
  /*
  audioTracks: [
    { path: '../audio/drama-piano2.mp3', start: 0 },
  ], */
  clips: [
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/intro.mp4`, zoomDirection: 'in' },
      ],
    },
    {
      layers: [
        { type: 'video', path: `../assets/${NAME}/talk.mp4` },
      ]
    },
    {
       duration: 0,
       layers: [
         { type: 'video', path: `../assets/${NAME}/outro.mp4` },
         { type: 'fabric',
           func,
           start: TEXT_START_TIME,
           fabricPosition: 'middleLeft',
           fabricType: 'caption',
           fabricText: 'Thank you for watching. Visit www.grateful.today for more content on gratitude, and subscribe to see more videos like this.' },
       ],
     },
     { duration: 1, layers: [{ type: 'title-background', text:' ', background: { type: 'fill-color', color: '#000' } }] },
  ],
  // Testing options:
  enableFfmpegLog: false,
  verbose: false,
  fast: false,
};

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

function getDurationinSeconds(fabricText) {
  const wordsPerMinute = 110;
  const wordsPerSecond = wordsPerMinute / 60;
  const totalWords = fabricText.trim().split(' ').length;
  const additionalSeconds = AUDIO_START_TIME; // additional seconds to include animation
  const seconds = Math.floor(totalWords / wordsPerSecond + additionalSeconds);
  return seconds;
}

function updateDurations() {
  let timer = 0;
  let duration = 0;
  editSpec.clips = editSpec.clips.map((clip, index) => {
    // if duration is first (intro) or last (outro) we don't want to set duration
    if (index > 0 && index !== editSpec.clips.length - 1) {
      duration = getDurationinSeconds(clip.layers[1].fabricText)
    } else {
      duration = clip.duration
    }
    // const duration = index > 0 ? getDurationinSeconds(clip.layers[1].fabricText) : clip.duration
    const fancyTime = fancyTimeFormat(timer);
    console.log(' ');
    console.log(`${index}`);
    console.log(' ');
    if (clip.layers[1]) {
      console.log(clip.layers[1].fabricText);
    }
    console.log(`Starts at`, fancyTime, duration, 'seconds');
    console.log(' ');
    console.log('----------------------------');
    timer = timer + duration;
    // if end
    if (index === editSpec.clips.length - 1) {
      console.log(' ');
      console.log('Video length:', fancyTimeFormat(timer));
      console.log(' ');
      console.log('----------------------------');
    }
    return {
      ...clip,
      duration,
    }
  });
}

function createVideos() {
  console.log('----------------------------');
  // updateDurations();
  editly(editSpec).catch(console.error);
}

createVideos();
