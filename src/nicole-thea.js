const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

// const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');
const { fancyTimeFormat, getDurationinSeconds } = require('./utils/time');

const NAME = 'nicole-thea';
const PRIMARY_COLOUR = '#FFFFFF';
const FONT_FAMILY = 'Futura Medium';
const SECONDARY_FONT_FAMILY = 'Roboto Light Italic';
const SECONDARY_FONT_URL = 'Roboto-LightItalic.ttf';
const FONT_SIZE = 92;
// const AUDIO_START_TIME = 4;
const AUDIO_MIX_VOLUME = 3;
// const TEXT_START_TIME = 2;

async function func({ width, height, fabric, params }) {

  async function onRender(progress, canvas) {

    const percent = Math.floor(progress * 100);

    // const fadeInEasedProgress = easeOutExpo(progress);

    // revers for fade out %, e.g: https://stackoverflow.com/a/35821905
    const decreaseProgress = 1.0 - progress;
    const delay = 0;
    const speedFast = 0.5;
    const speedSlow = 0.1;

    const fastProgress = (progress - delay - 0.05) * speedFast * 4;
    const slowProgress = (progress - delay - 0.1) * speedSlow * 4;

    let easedProgressFast = easeOutExpo(Math.max(0, Math.min(fastProgress, 0.5)));
    // let easedProgressSlow = easeOutExpo(Math.max(0, Math.min(slowProgress, 1)));

    // console.log('Percent', `${percent}%`);
    // console.log('Progress', `${progress}%`);
    // console.log('easedProgressFast', easedProgressFast);
    // console.log('easedProgressSlow', easedProgressSlow);
    // console.log('decreaseProgress', decreaseProgress);


    const min = Math.min(width, height);
    // const padding = 2 * min;
    const padding = 0.1 * min;

    const position = getPosition(width, height, params.fabricPosition, padding);

    if (params.fabricType === 'quote') {

      const maxWidth = 960 - (padding * 2)

      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: "Raleway ExtraBold",
        width: maxWidth,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
        textAlign: 'center',
        shadow: 'rgba(0,0,0,0.6) 2px 2px 2px'
      });
      text.set({
        opacity: easedProgressFast,
      });

      const author = new fabric.Text(params.fabricAuthor, {
        fill: '#FFFFFF',
        fontSize: 46,
        fontFamily: 'Roboto Light Italic',
        width: text.width,
        left: maxWidth / 2,
        top: text.height + (padding / 2),
        originX: 'center',
        originY: 'top',
        textAlign: 'center'
      });
      author.set({
        opacity: easedProgressFast,
      });

      let group = new fabric.Group([text, author]);
      group.set({
        width: maxWidth,
        height: (author.height + text.height + padding),
        left: 1920 - padding,
        top: 1080 / 2,
        originX: 'right',
        originY: 'center',
        textAlign: 'right',
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
      duration: 0.5,
      name: 'LinearBlur'
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
    { path: `../assets/${NAME}/soundtrack.wav`, start: 0 },
  ],
  clips: [
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/intro.mp4`, zoomDirection: 'in' },
        {
          type: 'fabric',
          func,
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          fabricPosition: 'middleRight',
          fabricType: 'quote',
          fabricText: 'In Memory of\nNicole Thea\n&\nReign Tecruz',
          fabricAuthor: 'July 29, 1995 - July 11, 2020',
          start: 0,
          stop: 8
        }
      ],
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 1129, cutTo: 1132, path: `../assets/${NAME}/1.mp4`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_1.jpg`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_2.jpg`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_3.jpg`},
      ]
    },
    {
      duration: 12,
      layers: [
        { type: 'video', path: `../assets/${NAME}/1d.mp4`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_4.jpg`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_5.jpg`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_6.jpg`},
      ]
    },
    {
      duration: 10,
      layers: [
        { type: 'video', path: `../assets/${NAME}/1e.mp4`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_7.jpg`},
      ]
    },
    {
      duration: 3,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_8.jpg`},
      ]
    },
    {
      duration: 4,
      layers: [
        { type: 'image', path: `../assets/${NAME}/jpegs/cropped_img_9.jpg`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 11, cutTo: 14, path: `../assets/${NAME}/1g.mp4`},
      ]
    },
    {
      duration: 8,
      layers: [
        { type: 'video', cutFrom: 19, cutTo: 27, path: `../assets/${NAME}/2.mp4`},
      ]
    },
    {
      duration: 8,
      layers: [
        { type: 'video', cutFrom: 19, cutTo: 27, path: `../assets/${NAME}/2.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 5, cutTo: 11, path: `../assets/${NAME}/3.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 330, cutTo: 336, path: `../assets/${NAME}/3.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 399, cutTo: 405, path: `../assets/${NAME}/3.mp4`},
      ]
    },
    {
      duration: 20,
      layers: [
        { type: 'video', cutFrom: 374, cutTo: 394, path: `../assets/${NAME}/new_launch_party.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 0, cutTo: 6, path: `../assets/${NAME}/4.mp4`},
      ]
    },
    {
      duration: 8,
      layers: [
        { type: 'video', cutFrom: 28, cutTo: 36, path: `../assets/${NAME}/4.mp4`},
      ]
    },
    {
      duration: 2,
      layers: [
        { type: 'video', cutFrom: 57, cutTo: 59, path: `../assets/${NAME}/4.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 110, cutTo: 116, path: `../assets/${NAME}/4.mp4`},
      ]
    },
    {
      duration: 8,
      layers: [
        { type: 'video', cutFrom: 169, cutTo: 177, path: `../assets/${NAME}/4.mp4`},
      ]
    },
    {
      duration: 2,
      layers: [
        { type: 'video', cutFrom: 38, cutTo: 41, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 2,
      layers: [
        { type: 'video', cutFrom: 56, cutTo: 59, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 2,
      layers: [
        { type: 'video', cutFrom: 64, cutTo: 65, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 6,
      layers: [
        { type: 'video', cutFrom: 67, cutTo: 70, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 4,
      layers: [
        { type: 'video', cutFrom: 70, cutTo: 74, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 2,
      layers: [
        { type: 'video', cutFrom: 71, cutTo: 72, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 4,
      layers: [
        { type: 'video', cutFrom: 103, cutTo: 105, path: `../assets/${NAME}/5.mp4`},
      ]
    },
    {
      duration: 8,
      layers: [
        { type: 'fill-color', color: '#000' },
        {
          type: 'title',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          text: 'In Memory of\nNicole Thea\n&\nReign Tecruz',
          position: 'middle'
        },
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
          const clipDuration = getDurationinSeconds(layer.fabricText);
          if (layer.firstQuote) {
            layer.start = 2;
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
      const videoLayer = clip.layers.find(layer => layer.type === 'video')
      videoLayer.duration = duration
    } else {
      duration = clip.duration
    }
    // const duration = index > 0 ? getDurationinSeconds(clip.layers[1].fabricText) : clip.duration
    const fancyTime = fancyTimeFormat(timer);
    console.log(' ');
    console.log(`${index}`);
    console.log(' ');
    console.log(`Starts at`, fancyTime, duration, 'seconds');
    console.log(`Starts at layers`, clip.layers);
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
