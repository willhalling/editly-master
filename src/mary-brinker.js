const editly = require('../index');

const { easeOutExpo, easeInOutCubic } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position_animated');
const { fancyTimeFormat, getDurationinSeconds } = require('./utils/time');

const NAME = 'mary-brinker';
const PRIMARY_COLOUR = '#FFF';
const SECONDARY_COLOUR = '#FFF';
const BACKGROUND_COLOUR = '#004764';

const FONT_FAMILY = 'Futura Medium';
const SECONDARY_FONT_FAMILY = 'Cinzel';
const SECONDARY_FONT_URL = 'Cinzel-VariableFont_wght.ttf';
const FONT_SIZE = 96;
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

    if (params.fabricType === 'intro') {

      const maxWidth = 960 - (padding * 2)

      const heading = new fabric.Textbox(params.fabricHeading, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE - FONT_SIZE * 0.25,
        fontFamily: "Cinzel",
        width: maxWidth,
        left: 0,
        top: 0,
        originX: 'left',
        originY: 'top',
        textAlign: 'left',
        // shadow: 'rgba(0,0,0,0.6) 2px 2px 2px'
      });
      heading.set({
        opacity: easedProgressFast,
      });

      const name = new fabric.Textbox(params.fabricName, {
        fill: PRIMARY_COLOUR,
        fontSize: FONT_SIZE,
        fontFamily: "Cinzel",
        width: maxWidth,
        left: 0,
        top: heading.height + (padding / 2),
        originX: 'left',
        originY: 'top',
        textAlign: 'left',
        // shadow: 'rgba(0,0,0,0.6) 2px 2px 2px'
      });
      name.set({
        opacity: easedProgressFast,
      });

      const date = new fabric.Text(params.fabricDate, {
        fill: '#FFFFFF',
        fontSize: 46,
        fontFamily: 'Cinzel',
        width: name.width,
        left: 0,
        top: heading.height + name.height + (padding / 2) + (padding / 2),
        originX: 'left',
        originY: 'top',
        textAlign: 'left'
      });
      date.set({
        opacity: easedProgressFast,
      });

      let group = new fabric.Group([heading, name, date]);
      group.set({
        width: maxWidth,
        height: (heading.height + name.height + date.height + padding),
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
      fontFamily: 'Cinzel',
      fontPath: `../fonts/Cinzel-VariableFont_wght.ttf`,
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
    { path: `../assets/${NAME}/amazing-grace_mixdown.wav`, start: 0 },
  ],
  clips: [
    {
      duration: 8,
      layers: [
        { type: 'image', path: `../assets/${NAME}/background.jpeg`, zoomDirection: 'in' },
        {
          type: 'fabric',
          func,
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          fabricPosition: 'middleRight',
          fabricType: 'intro',
          fabricHeading: 'Celebration of Life',
          fabricName: 'Mary Suzanna\nBrinker',
          fabricDate: 'February 23, 1938 - January 6, 2021',
          start: 0,
          stop: 8
        }
      ],
    },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_1.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_2.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_3.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_4.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_5.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_6.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_7.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_8.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_9.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_10.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_11.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_12.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_13.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_14.jpg`}] },
    { duration: 2766, layers: [ { type: 'video', path: `../assets/${NAME}/funeral.mp4`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_15.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_16.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_17.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_18.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_19.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_20.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_21.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_22.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_23.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_24.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_25.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_26.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_27.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_28.jpg`}] },
    { duration: 6, layers: [ { type: 'image', path: `../assets/${NAME}/photos/cropped_photo_29.jpg`}] },
    {
      duration: 8,
      layers: [
        { type: 'image', path: `../assets/${NAME}/sky.jpg`, zoomDirection: 'in' },
        {
          type: 'title',
          fontFamily: SECONDARY_FONT_FAMILY,
          fontPath: `../fonts/${SECONDARY_FONT_URL}`,
          text: 'In Memory of\nMary Suzanna\nBrinker',
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
