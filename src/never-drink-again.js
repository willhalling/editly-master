const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

// const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');
const { fancyTimeFormat, getDurationinSeconds } = require('./utils/time');

const NAME = 'never-drink-again';
const PRIMARY_COLOUR = '#eaf3dd';
const SECONDARY_FONT_FAMILY = 'Roboto Light Italic';
const SECONDARY_FONT_URL = 'Roboto-LightItalic.ttf';
const FONT_SIZE = 80;
const AUDIO_MIX_VOLUME = 3;

async function func({ width, height, fabric, params }) {

  async function onRender(progress, canvas) {

    const percent = Math.floor(progress * 100);

    const delay = 0;
    const speedFast = 0.5;

    const fastProgress = (progress - delay - 0.05) * speedFast * 4;

    let easedProgressFast = easeOutExpo(Math.max(0, Math.min(fastProgress, 0.5)));

    if (params.fabricType === 'quote' || params.fabricType === 'credit') {
      if (percent > 50) {
        easedProgressFast = easeOutExpo(Math.max(0, easedProgressFast - progress));
      }
    }

    const min = Math.min(width, height);
    const padding = 0.1 * min;

    if (params.fabricType === 'quote') {

      // const maxWidth = 1300 - (padding * 2)

      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: "Raleway ExtraBold",
        width: width,
        left: 0,
        top: 0,
        originX: 'center',
        originY: 'center',
        textAlign: 'center',
        shadow: 'rgba(0,51,93,0.6) 2px 2px 2px'
      });
      text.set({
        opacity: 1,
      });

      let group = new fabric.Group([text]);
      group.set({
        width: width,
        height: text.height,
        left: width / 2,
        top: height / 2,
        originX: 'center',
        originY: 'center',
        textAlign: 'center',
      });
      canvas.add(group);
      canvas.renderAll(group);
    }
    if (params.fabricType === 'caption') {
      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: 'Roboto Light Italic',
        width: width - (padding * 5),
      });
      text.set({
        left: width / 2,
        top: 500,
        originX: 'center',
        originY: 'top',
        textAlign: 'left',
        opacity: easedProgressFast,
      });
      canvas.add(text);
      canvas.renderAll(text);
    }
    if (params.fabricType === 'credit') {
      const position = getPosition(width, height, params.fabricPosition, padding / 2);
      const text = new fabric.Textbox(params.fabricText, {
        fill: '#FFF',
        fontSize: 24,
        fontFamily: 'Roboto Light Italic',
        width: 960 - (padding * 4),
      });
      text.set({
        ...position,
        opacity: easedProgressFast,
      });
      canvas.add(text);
      canvas.renderAll(text);
    }
  }
  function onClose() {
    // Cleanup if you initialized anything
    // console.log('on close sajksjakjsak')
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
      name: 'fadecolor'
    },
    layer: {
      fontFamily: 'Raleway ExtraBold',
      fontPath: `../fonts/Raleway-ExtraBold.ttf`,
      zoomAmount: 0.15,
    },
  },
  loopAudio: false,
  keepSourceAudio: false,
  audioNorm: {
    enable: true,
    gaussSize: 5,
    maxGain: 50
  },
  clipsAudioVolume: 50,
  audioTracks: [
    { path: `../audio/calm-and-peace3.wav`, start: 0 },
  ],
  clips: [
    { duration: 1, layers: [{ type: 'title-background', text:' ', background: { type: 'fill-color', color: '#000' } }] },
    {
      quotes: true,
      duration: 0,
      layers: [
        /*
        {
          type: 'fabric',
          func,
          start: 2,
          stop: 8,
          fabricPosition: 'topLeft',
          fabricType: 'credit',
          fabricText: 'Videos by Tom Fisk',
        }, */
        {
          type: 'fabric',
          func,
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'I',
          fabricAuthor: '',
          firstQuote: true
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'will',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'drink',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'again',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'and',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'will',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'never',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'change',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'my',
          fabricAuthor: '',
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middle',
          fabricType: 'quote',
          fabricText: 'mind.',
          fabricAuthor: '',
        },
        // { type: 'detached-audio', path: `../assets/${NAME}/voiceover.mp3`, start: 2, mixVolume: AUDIO_MIX_VOLUME },
      ],
    },
   { duration: 1, layers: [{ type: 'title-background', text:' ', background: { type: 'fill-color', color: '#000' } }] },
  ],
  // Testing options:
  enableFfmpegLog: false,
  verbose: false,
  fast: false,
};

function updateDurations() {
  let timer = 0;
  let duration = 0;
  editSpec.clips = editSpec.clips.map((clip, index) => {
    if (clip.quotes) {
      // now lets add all layers duration
      clip.layers.forEach((layer, i) => {
        if (layer.fabricType === 'quote') {
          const clipDuration = getDurationinSeconds(layer.fabricText, 0);
          if (layer.firstQuote) {
            layer.start = 0;
            layer.stop = clipDuration;
            duration += clipDuration;
          } else {
            duration += clipDuration;
            layer.start = clip.layers[i - 1].stop
            layer.stop = clip.layers[i - 1].stop + clipDuration
          }
        }
      });
      // now lets update video duration to match all layers
      // const videoLayer = clip.layers.find(layer => layer.type === 'video')
      // videoLayer.duration = duration
    } else {
      duration = clip.duration
    }
    // const duration = index > 0 ? getDurationinSeconds(clip.layers[1].fabricText) : clip.duration
    const fancyTime = fancyTimeFormat(timer);
    console.log(' ');
    console.log(`${index}`);
    console.log(' ');
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
      duration
    }
  });
}

function createYouTubeDescription(layers) {
  console.log('----------------------------');
  console.log(`${editSpec.clips[1].layers.length - 2} quotes below:`)
  console.log('----------------------------');
  layers.forEach(layer => {
    if (layer.fabricType === 'quote') {
      // const introDuration = editSpec.clips[0].duration;
      const introDuration = 0;
      if (layer.fabricText) {
        console.log(`[${fancyTimeFormat(layer.start + introDuration)}] ${layer.fabricText} — ${layer.fabricAuthor}`)
      }
    }
  })
}

function createVideos() {
  console.log('----------------------------');
  updateDurations();
  console.log('clips', editSpec.clips[1].layers)
  createYouTubeDescription(editSpec.clips[1].layers);
  editly(editSpec).catch(console.error);
}

createVideos();
