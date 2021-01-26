const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position_animated');
const { fancyTimeFormat, getDurationinSeconds } = require('./utils/time');

const NAME = 'jene-alfredo-batiste';
const PRIMARY_COLOUR = '#eaf3dd';
const SECONDARY_COLOUR = '#FFF';
const BACKGROUND_COLOUR = '#004764';

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

    const captionEasedProgress = easeOutExpo(Math.min(progress, 1));
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

      const maxWidth = 1200 - (padding * 2)

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
        left: 1920 - padding,
        top: 1080 / 2,
        originX: 'right',
        originY: 'center',
        textAlign: 'right',
      });
      canvas.add(group);
      canvas.renderAll(group);
    }
    if (params.fabricType === '') {
      const text = new fabric.Textbox(params.fabricText, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: "Raleway ExtraBold",
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
    if (params.fabricType === 'caption') {
      // console.log('params.fabricType', params.fabricType);
      const position = getPosition(width, height, params.fabricPosition, padding, captionEasedProgress);
      const captionGroupParams = {
        title: params.fabricText,
        angle: 0,
        align: position.textAlign,
        fontSize: 56,
        fontFamily: "Raleway ExtraBold",
        primaryColour: SECONDARY_COLOUR,
        secondaryColour: SECONDARY_COLOUR,
        backgroundColour: BACKGROUND_COLOUR,
      };
      const titleGroup = titleBackgroundText(progress, width, height, fabric, captionGroupParams);
      // console.log('position', position);
      titleGroup.set({
        ...position,
        opacity: captionEasedProgress,
      });
      canvas.add(titleGroup);
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
    duration: 4,
    transition: {
      duration: 0.5,
      name: 'fadecolor'
    },
    layer: {
      fontFamily: 'Raleway ExtraBold',
      fontPath: `../fonts/Raleway-ExtraBold.ttf`,
      zoomAmount: 0.15,
    },
  },
  loopAudio: false,
  keepSourceAudio: true,
  audioNorm: {
    enable: true,
    gaussSize: 5,
    maxGain: 50
  },
  clipsAudioVolume: 50,
  audioTracks: [
    { path: `../assets/${NAME}/jene-alfredo-batiste_mixdown2.wav`, start: 0 },
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
          fabricText: 'In Memory of\nSergeant First Class\nJene Alfredo Batiste',
          fabricAuthor: 'Sunrise: February 01, 1967\nSunset: November 25, 2020',
          start: 0,
          stop: 8
        }
      ],
    },
    { duration: 5, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_01.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'Early Years of a Vibrant Life' }
      ]
    },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_02.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_03.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_04.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_05.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_06.jpg`}] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_07.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'Destined, Purpose-Driven, Mission Bound' }
      ]
    },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_08.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_09.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_10.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_11.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_12.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_13.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_14.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_15.jpg`}] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_16.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'In Loving Memory of Husband & Father' }
      ]
    },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_17.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_18.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_19.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_20.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_21.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_22.jpg`}] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_23.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'The Unbroken Family Circle' }
      ]
    },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_24.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_25.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_26.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_27.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_28.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_29.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_30.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_31.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_32.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_33.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_34.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_35.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_36.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_37.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_38.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_39.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_40.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_41.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_42.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_43.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_44.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_45.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_46.jpg`}] },
    // { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_47.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_48.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_49.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_50.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_51.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_52.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_53.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_54.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_55.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_56.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_57.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_58.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_59.jpg`}] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_60.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'Retirement Of A Blessed Life: 21 Years Of Service' }
      ]
    },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_61.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_62.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_63.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_64.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_65.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_66.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_67.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_68.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_69.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_70.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_71.jpg`}] },
    // { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_72.jpg`}] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_73.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'Karaoke in Paradise' }
      ]
    },
    { duration: 10, layers: [{ type: 'video', path: `../assets/${NAME}/media/74.mp4` }] },
    { duration: 14, layers: [{ type: 'video', path: `../assets/${NAME}/media/74b.mp4`}]},
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_75.jpg`}] },
    { duration: 15, layers: [{ type: 'video', path: `../assets/${NAME}/media/75.mp4` }] },
    { duration: 10, layers: [{ type: 'video', path: `../assets/${NAME}/media/76.mp4` }] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_78.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_79.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_80.jpg`}] },
    { duration: 4, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_81.jpg`}] },
    { duration: 20, layers: [{ type: 'video', path: `../assets/${NAME}/media/93.mp4` }] },
    { duration: 4, layers: [
        { type: 'image', path: `../assets/${NAME}/media/cropped_84.jpg`},
        { type: 'fabric', func, fabricType: 'caption', fabricText: 'A Blessing From God: 19,641 Days With You' }
      ]
    },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_85.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_86.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_87.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_88.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_89.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_90.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_91.jpg`}] },
    { duration: 7, layers: [ { type: 'image', path: `../assets/${NAME}/media/cropped_92.jpg`}] },
    {
      duration: 34,
      layers: [
        { type: 'fill-color', color: '#000' },
        {
          type: 'title',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          text: 'In Memory of\nSergeant First Class\nJene Alfredo Batiste',
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


function createVideos() {
  editly(editSpec).catch(console.error);
}

createVideos();
