const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

// const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');
const { fancyTimeFormat, getDurationinSeconds } = require('./utils/time');

const NAME = 'gratitude-quotes';
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

      const maxWidth = 1300 - (padding * 2)

      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: "Raleway ExtraBold",
        width: maxWidth,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
        textAlign: 'left',
        shadow: 'rgba(0,51,93,0.6) 2px 2px 2px'
      });
      text.set({
        opacity: easedProgressFast,
      });

      const author = new fabric.Text(params.fabricAuthor, {
        fill: '#ffd200',
        fontSize: 46,
        fontFamily: 'Roboto Light Italic',
        width: maxWidth,
        left: 0,
        top: text.height + (padding / 2),
        originX: 'left',
        originY: 'top',
        textAlign: 'left'
      });
      author.set({
        opacity: easedProgressFast,
      });

      let group = new fabric.Group([text, author]);
      group.set({
        width: maxWidth,
        height: (author.height + text.height + padding),
        left: width / 2,
        top: height / 2,
        originX: 'center',
        originY: 'center',
        textAlign: 'left',
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
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/intro.mp4`, zoomDirection: 'in' },
      ],
    },
    {
      quotes: true,
      duration: 0,
      layers: [
        { type: 'video', path: `../assets/${NAME}/background-video.mp4` },
        {
          type: 'fabric',
          func,
          start: 2,
          stop: 8,
          fabricPosition: 'topLeft',
          fabricType: 'credit',
          fabricText: 'Videos by Tom Fisk',
        },
        {
          type: 'fabric',
          func,
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'In daily life we must see that it is not happiness that makes us grateful, but gratefulness that makes us happy.',
          fabricAuthor: 'David Steindl-Rast',
          firstQuote: true
        },
        {
          type: 'fabric',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Walk as if you are kissing the Earth with your feet.',
          fabricAuthor: 'Thich Nhat Hanh',
        },
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.',
  fabricAuthor: 'Epictetus',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'Silent gratitude isn’t very much to anyone.',
  fabricAuthor: 'Gertrude Stein',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'Be grateful for every single person who was part of your story. The ones that hurt you. The ones that helped you. Because they all taught you.',
  fabricAuthor: 'Yasmin Mogahed',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'When eating bamboo sprouts, remember the man who planted them.',
  fabricAuthor: 'Chinese Proverb',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'Appreciation can make a day, even change a life. Your willingness to put it into words is all that is necessary.',
  fabricAuthor: 'Margaret Cousins',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'Saying thank you is more than good manners. It is good spirituality.',
  fabricAuthor: 'Alfred Painter',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'Happiness is in itself a kind of gratitude.',
  fabricAuthor: 'Joseph Wood Krutch',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'There is a calmness to a life lived in gratitude, a quiet joy.',
  fabricAuthor: 'Ralph H. Blum',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'When you practice gratefulness, there is a sense of respect toward others.',
  fabricAuthor: 'Dalai Lama',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'The root of joy is gratefulness.',
  fabricAuthor: 'David Steindl-Rast',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'If you want to be happy, be.',
  fabricAuthor: 'Leo Tolstoy',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.',
  fabricAuthor: 'Helen Keller',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'I cannot tell you anything that, in a few minutes, will tell you how to be rich. But I can tell you how to feel rich, which is far better, let me tell you firsthand, than being rich. Be grateful.',
  fabricAuthor: 'Ben Stein',
},
{
  type: 'fabric',
  func,
  fabricPosition: 'middleLeft',
  fabricType: 'quote',
  fabricText: 'If the only prayer you said in your whole life was, “thank you,” that would suffice.',
  fabricAuthor: 'Meister Eckhart',
},
        { type: 'detached-audio', path: `../assets/${NAME}/voiceover.mp3`, start: 2, mixVolume: AUDIO_MIX_VOLUME },
      ],
    },
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/outro.mp4` },
        {
          type: 'title',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          text: 'Subscribe & Be Grateful Today',
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
