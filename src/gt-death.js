const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');

const NAME = 'gt-death';
const PRIMARY_COLOUR = '#FFF';
const FONT_FAMILY = 'Playfair Display';
const SECONDARY_FONT_FAMILY = 'Roboto Thin';
const FONT_SIZE = 72;
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
    const speedFast = 0.1;
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

    // once we are greater than a certain XX% we start to fade quote out
    // easedProgressFast - progress because we are decreasing from fadeIn point
    if (params.fabricType === 'quote') {
      if (percent > 50) {
        easedProgressFast = easeOutExpo(Math.max(0, easedProgressFast - progress));
        // console.log('easedProgressFast', easedProgressFast);
      }
    }

    /*
    if (percent > 50) {
      easedProgressSlow = easeOutExpo(Math.max(0, easedProgressSlow - progress));
      console.log('easedProgressSlow', easedProgressSlow);
    } */

    const min = Math.min(width, height);
    // const padding = 2 * min;
    const padding = 0.1 * min;

    const position = getPosition(width, height, params.fabricPosition, padding);

    if (params.fabricType === 'quote') {

      const maxWidth = 1200 - (padding * 2)


      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        width: maxWidth,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
        textAlign: 'left',
      });
      text.set({
        opacity: easedProgressFast,
      });

      const author = new fabric.Text(params.fabricAuthor, {
        fill: '#ffcc33',
        fontSize: 46,
        fontFamily: SECONDARY_FONT_FAMILY,
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
        left: padding,
        top: height / 2,
        originX: 'left',
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
        fontFamily: SECONDARY_FONT_FAMILY,
        width: width - (padding * 5),
      });
      text.set({
        left: width / 2,
        top: 500,
        originX: 'center',
        originY: 'top',
        textAlign: 'center',
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
      fontPath: '../fonts/PlayfairDisplay.ttf',
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
    { path: '../audio/death-quotes-sound-track_mixdown.mp3', start: 0 },
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
        { type: 'video', path: `../assets/${NAME}/candle-alt2.mp4` },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Death smiles at us all, but all a man can do is smile back.',
          fabricAuthor: 'Marcus Aurelius'
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Shrinking away from death is something unhealthy and abnormal which robs the second half of life of its purpose.',
          fabricAuthor: 'Carl Jung',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'I do not fear death. I had been dead for billions and billions of years before I was born, and had not suffered the slightest inconvenience from it.',
          fabricAuthor: 'Mark Twain',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Our dead are never dead to us, until we have forgotten them.',
          fabricAuthor: 'George Eliot',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Death is not the opposite of life but an innate part of it. By living our lives, we nurture death.',
          fabricAuthor: 'Haruki Murakami',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Death ends a life, not a relationship.',
          fabricAuthor: 'Morrie Schwartz',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'I’m not afraid of death because I don’t believe in it. It’s just getting out of one car, and into another.',
          fabricAuthor: 'John Lennon',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'So it’s true, when all is said and done, grief is the price we pay for love.',
          fabricAuthor: 'E.A. Bucchianeri',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Sometimes, only one person is missing, and the whole world seems depopulated.',
          fabricAuthor: 'Alphonse de Lamartine',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'If life must not be taken too seriously, then so neither must death.',
          fabricAuthor: 'Samuel Butler',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Why should I fear death? If I am, death is not. If death is, I am not. Why should I fear that which cannot exist when I do?',
          fabricAuthor: 'Epicurus',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'How can the dead be truly dead when they still live in the souls of those who are left behind?',
          fabricAuthor: 'Carson McCullers',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Life is pleasant. Death is peaceful. It’s the transition that’s troublesome.',
          fabricAuthor: 'Isaac Asimov',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Grief is not a disorder, a disease or a sign of weakness. It is an emotional, physical and spiritual necessity, the price you pay for love. The only cure for grief is to grieve.',
          fabricAuthor: 'Earl Grollman',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'Given a choice between grief and nothing, I’d choose grief.',
          fabricAuthor: 'William Faulkner',
        },
        {
          type: 'fabric',
          func,
          fabricPosition: 'middleLeft',
          fabricType: 'quote',
          fabricText: 'The life of the dead is placed in the memory of the living.',
          fabricAuthor: 'Cicero',
        },
        { type: 'detached-audio', path: `../assets/${NAME}/voiceover3.mp3`, start: 2, mixVolume: AUDIO_MIX_VOLUME },
      ],
    },
    {
      duration: 8,
      layers: [
        { type: 'video', path: `../assets/${NAME}/outro.mp4` },
        { type: 'fabric',
          func,
          fontPath: '../fonts/Roboto-Thin.ttf',
          fabricType: 'caption',
          fabricText: 'Thanks for watching.\n\nSubscribe to watch more videos like this.',
          fabricPosition: 'bottomMiddle'
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
  const additionalSeconds = 10; // additional seconds to include transition and text fade
  const seconds = Math.floor(totalWords / wordsPerSecond + additionalSeconds);
  return seconds;
}

function updateDurations() {
  let timer = 0;
  let duration = 0;
  editSpec.clips = editSpec.clips.map((clip, index) => {
    const secondClip = index === 1;
    // if second clip, loop through layers
    if (secondClip) {
      // now lets add all layers duration
      clip.layers.forEach((layer, i) => {
        if (layer.fabricType === 'quote') {
          const clipDuration = getDurationinSeconds(layer.fabricText);
          console.log('clipDuration', clipDuration, 'for', layer.fabricText);
          if (i === 1) {
            layer.start = 2;
            layer.stop = clipDuration;
            duration += clipDuration;
          } else {
            duration += clipDuration;
            layer.start = clip.layers[i - 1].stop
            layer.stop = clip.layers[i - 1].stop + clipDuration
          }
        }
        console.log('duration', duration);
      });
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
    const introDuration = editSpec.clips[0].duration;
    if (layer.fabricText) {
      console.log(`[${fancyTimeFormat(layer.start + introDuration)}] ${layer.fabricText} — ${layer.fabricAuthor}`)
    }
  })
}

function createVideos() {
  console.log('----------------------------');
  updateDurations();
  // console.log('clips', editSpec.clips)
  createYouTubeDescription(editSpec.clips[1].layers);
  // editly(editSpec).catch(console.error);
}

createVideos();
