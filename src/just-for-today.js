const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');

const NAME = 'just-for-today';
const PRIMARY_COLOUR = '#FFF';
const FONT_FAMILY = 'Playfair Display';
const FONT_SIZE = 52;
const AUDIO_START_TIME = 4;
const AUDIO_MIX_VOLUME = 2;
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
  keepSourceAudio: false,
  audioNorm: {
    enable: true,
    gaussSize: 5,
    maxGain: 50
  },
  clipsAudioVolume: 50,
  audioTracks: [
    { path: '../audio/drama-piano2.mp3', start: 0, mixVolume: 0.5 },
  ],
  clips: [
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/intro.mp4`, zoomDirection: 'in' },
      ],
    },
    {
      duration: 0,
      layers: [
        { type: 'image', path: `../assets/${NAME}/just-for-today-bg-1.jpg` },
        { type: 'fabric',
          func,
          start: TEXT_START_TIME,
          fabricPosition: 'middleLeft',
          fabricType: 'caption',
          fabricText: 'Just for today I will try to live through this day only, and not tackle my whole life problem at once. I can do something for twelve hours that would appal me if I felt that I had to keep it up for a lifetime.'
        },
        { type: 'detached-audio', path: `../assets/${NAME}/audio/1_01.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
      ],
    },
    {
      duration: 0,
      layers: [
        { type: 'image', path: `../assets/${NAME}/just-for-today-bg-2.jpg` },
        { type: 'fabric',
          func,
          start: TEXT_START_TIME,
          fabricPosition: 'middleRight',
          fabricType: 'caption',
          fabricText: 'Just for today I will be happy. Most folks are as happy as they make up their minds to be.'
        },
        { type: 'detached-audio', path: `../assets/${NAME}/audio/2.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
      ],
    },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-3.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleLeft',
         fabricType: 'caption',
         fabricText: 'Just for today I will adjust myself to what is, and not try to adjust everything to my own desires. I will take my ‘luck’ as it comes, and fit myself to it.'
       },
       { type: 'detached-audio', path: `../assets/${NAME}/audio/3_01.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
     ],
    },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-4.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleRight',
         fabricType: 'caption',
         fabricText: 'Just for today I will try to strengthen my mind. I will study. I will learn something useful. I will not be a mental loafer. I will read something that requires effort, thought and concentration.'},
       { type: 'detached-audio', path: `../assets/${NAME}/audio/4.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
     ],
    },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-5.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleLeft',
         fabricType: 'caption',
         fabricText: 'Just for today I will exercise my soul in three ways: I will do somebody a good turn, and not get found out; if anybody knows of it, it will not count. I will do at least two things I don’t want to do —just for exercise. I will not show anyone that my feelings are hurt; they may be hurt, but today I will not show it.' },
       { type: 'detached-audio', path: `../assets/${NAME}/audio/5.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
       ]
     },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-6.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleRight',
         fabricType: 'caption',
         fabricText: 'Just for today I will be agreeable. I will look as well as I can, dress becomingly, talk low, act courteously, criticise not one bit, not find fault with anything and not try to improve or regulate anybody except myself.' },
       { type: 'detached-audio', path: `../assets/${NAME}/audio/6_02.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
       ]
     },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-7.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleLeft',
         fabricType: 'caption',
         fabricText: 'Just for today I will have a programme. I may not follow it exactly, but I will have it. I will save myself from two pests: hurry and indecision.' },
       { type: 'detached-audio', path: `../assets/${NAME}/audio/7_01.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
       ]
     },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-8.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleRight',
         fabricType: 'caption',
         fabricText: 'Just for today I will have a quiet half hour all by myself, and relax. During this half hour, sometime, I will try to get a better perspective of my life.'},
       { type: 'detached-audio', path: `../assets/${NAME}/audio/8_01.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
       ]
     },
    {
     duration: 0,
     layers: [
       { type: 'image', path: `../assets/${NAME}/just-for-today-bg-9.jpg` },
       { type: 'fabric',
         func,
         start: TEXT_START_TIME,
         fabricPosition: 'middleLeft',
         fabricType: 'caption',
         fabricText: 'Just for today I will be unafraid. Especially I will not be afraid to enjoy what is beautiful, and to believe that as I give to the world, so the world will give to me.' },
         { type: 'detached-audio', path: `../assets/${NAME}/audio/9.wav`, start: AUDIO_START_TIME, mixVolume: AUDIO_MIX_VOLUME },
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
           fabricText: 'The Just For Today card is a small piece of literature that we can find in almost every Alcoholics Anonymous (AA) meeting.\n\nThank you for watching. Visit www.grateful.today for more content on gratitude, and subscribe to see more videos like this.' },
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
  updateDurations();
  editly(editSpec).catch(console.error);
}

createVideos();
