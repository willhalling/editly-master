const fs = require('fs');
const process = require('process');
const { orderBy } = require('natural-orderby');
const editly = require('../index');
const { easeOutExpo } = require('../transitions');

const { titleBackgroundText } = require('./utils/text');
const { getPosition } = require('./utils/position');

const FOLDER_NAME = 'marie';
const PRIMARY_COLOUR = '#FFF';
const SECONDARY_COLOUR = '#FFF';
const BACKGROUND_COLOUR = '#000';
const FONT_FAMILY = 'Playfair Display';

async function func({ width, height, fabric, canvas, params }) {
  console.log('fabric params', params);

  async function onRender(progress) {
    const easedProgress = easeOutExpo(Math.min(progress, 1));
    const easedProgressRounded = Math.round(easedProgress * 10) / 10;
    const min = Math.min(width, height);
    const padding = 0.05 * min;

    if (params.fabricType === 'title') {
      const titleGroupParams = {
        title: params.fabricText,
        angle: 0,
        align: 'left',
        fontSize: 200,
        fontFamily: FONT_FAMILY,
        primaryColour: PRIMARY_COLOUR,
        secondaryColour: SECONDARY_COLOUR,
        backgroundColour: BACKGROUND_COLOUR,
      };
      const titleGroup = titleBackgroundText(progress, width, height, fabric, titleGroupParams);
      const position = getPosition(width, height, params.fabricPosition, padding, 1);
      titleGroup.set({
        ...position,
        opacity: easedProgressRounded > 1.0 ? 1.0 : easedProgress,
      });
      console.log('easedProgressRounded', easedProgressRounded);
      canvas.add(titleGroup);
      // canvas.centerObject(titleGroup);

      // add full HD logo
      const hdSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" viewBox="0 0 290.262 290.262"><path d="M278.743 29.29H11.519C5.157 29.29 0 34.447 0 40.809V249.454c0 6.361 5.157 11.519 11.519 11.519h267.225c6.361 0 11.519-5.157 11.519-11.519V40.809c-.001-6.362-5.159-11.519-11.52-11.519zM56.563 185.959H33.751v15.375H54.19v4.813H33.751v18.748h-4.996v-43.748h27.809v4.812zm43.127 20.936c0 11.375-6.875 18.252-18.313 18.252-11.5 0-18.436-6.877-18.436-18.252v-25.748h5v25.748c0 8.5 5.122 13.439 13.436 13.439 8.313 0 13.313-4.939 13.313-13.439v-25.748h5v25.748zm36.44 18h-24.188v-43.748h5v39.002h19.188v4.746zm32.314 0h-24.187v-43.748h4.998v39.002h19.189v4.746zm46.249 0h-11.126v-16.998h-18.121v16.998h-11.127v-43.748h11.127v18h18.121v-18h11.126v43.748zm27.129 0h-18.376v-25.201h11.125v16.33h7.939c6.811 0 11.688-5.254 11.688-12.939 0-7.754-5.126-13.063-12.189-13.063h-18.563v-8.875h18.813c13.75 0 23.248 8.875 23.248 21.873 0 12.937-9.625 21.875-23.685 21.875zm25.403-66.96H23.037V52.327h244.188v105.608z"/><path d="M53.415 128.666h13.177V76.775H43.866v10.588h9.549zM99.901 129.037c14.656 0 22.873-9.404 22.873-26.354 0-16.877-8.217-26.279-22.873-26.279-14.805 0-23.021 9.402-23.021 26.279 0 16.95 8.217 26.354 23.021 26.354zm0-43.008c6.514 0 9.4 4.813 9.4 16.654s-2.887 16.729-9.4 16.729c-6.664 0-9.475-4.887-9.475-16.729s2.811-16.654 9.475-16.654zM128.401 114.232c0 9.178 8.29 15.025 21.246 15.025 12.951 0 21.243-5.922 21.243-15.25 0-5.771-3.552-10.732-9.253-13.102 4.072-2.221 6.514-6.217 6.514-10.734 0-8.512-7.18-13.914-18.58-13.914-11.25 0-18.505 5.258-18.505 13.549 0 4.512 2.814 8.656 7.18 11.1-5.995 2.369-9.845 7.401-9.845 13.326zm21.246-29.314c4.811 0 7.475 2.148 7.475 5.994 0 3.703-2.664 5.777-7.475 5.777-4.813 0-7.477-2.074-7.477-5.777 0-3.846 2.665-5.994 7.477-5.994zm0 21.246c5.697 0 8.881 2.441 8.881 6.736 0 4.441-3.184 6.811-8.881 6.811-5.701 0-8.809-2.445-8.809-6.811.001-4.295 3.108-6.736 8.809-6.736zM199.466 129.037c14.655 0 22.872-9.404 22.872-26.354 0-16.877-8.217-26.279-22.872-26.279-14.805 0-23.023 9.402-23.023 26.279 0 16.95 8.218 26.354 23.023 26.354zm0-43.008c6.514 0 9.398 4.813 9.398 16.654s-2.885 16.729-9.398 16.729c-6.662 0-9.475-4.887-9.475-16.729s2.813-16.654 9.475-16.654zM234.948 121.119h4.865c6.857 0 10.803-3.641 10.803-9.924 0-5.973-3.945-9.346-10.803-9.346h-11.682v26.816h6.816v-7.546zm0-13.906h4.521c2.987 0 4.712 1.414 4.712 4.217 0 2.832-1.725 4.326-4.712 4.326h-4.521v-8.543z"/></svg>';
      fabric.loadSVGFromString(hdSvg, (objects, options) => {
        const obj = fabric.util.groupSVGElements(objects, options);
        obj.set(
          {
            left: (width - padding) - (-1 + easedProgress) * padding,
            top: height - padding,
            opacity: easedProgressRounded > 0.6 ? 0.6 : easedProgress,
            originX: 'right',
            originY: 'bottom',
          },
        );
        // console.log('obj', obj)
        canvas.add(obj)
          .renderAll();
      });
    } if (params.fabricType === 'caption') {
      console.log('params.fabricType', params.fabricType);
      const position = getPosition(width, height, params.fabricPosition, padding, easedProgress);
      const captionGroupParams = {
        title: params.fabricText,
        angle: 0,
        align: position.textAlign,
        fontSize: 72,
        fontFamily: FONT_FAMILY,
        primaryColour: PRIMARY_COLOUR,
        secondaryColour: SECONDARY_COLOUR,
        backgroundColour: BACKGROUND_COLOUR,
      };
      const titleGroup = titleBackgroundText(progress, width, height, fabric, captionGroupParams);
      console.log('position', position);
      titleGroup.set({
        ...position,
        opacity: easedProgress,
      });
      canvas.add(titleGroup);
    }
  }
  function onClose() {
    // Cleanup if you initialized anything
  }

  return { onRender, onClose };
}

const editSpec = {
  outPath: `../dist/${FOLDER_NAME}.mp4`,
  width: 1920,
  height: 1080,
  defaults: {
    duration: 7,
    transition: {
      duration: 1,
      name: 'LinearBlur',
    },
    layer: {
      fontPath: '../assets/funeral/fonts/PlayfairDisplay-VariableFont_wght.ttf',
      // ...more layer defaults
    },
  },
  // audioFilePath: `../assets/${FOLDER_NAME}/audio/No_2_Remembering_Her.mp3`,
  clips: [],
  /*
  clips: [
    { duration: 23, layers: [{ type: 'video', path: '../assets/funeral/videos/intro.mp4' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_01.jpg' }, { type: 'fabric', func, fabricType: 'caption', fabricText: 'Portugal, 2005' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_02.jpg' }, { type: 'fabric', func, fabricType: 'caption', fabricText: 'He will be sorely missed.' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_03.jpg' }, { type: 'fabric', func, fabricType: 'caption', fabricText: 'Last time we were all together.' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_04.jpg' }, { type: 'fabric', func, fabricType: 'caption', fabricText: 'Dad\'s favourite place to relax.' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_05.jpg' }, { type: 'fabric', func, fabricType: 'caption', fabricText: 'Will never be forgotten.' }] },
    { layers: [{ type: 'image', path: '../assets/funeral/maria/cropped_06.jpg' }, { type: 'fabric', func, fabricText: 'Thanks for watching.\nSorry for your loss.', fabricType: 'caption', fabricPosition: 'middle' }] },
  ],
   */
  // Testing options:
  enableFfmpegLog: false,
  verbose: false,
  fast: false,
};

function contains(target, pattern) {
  let value = 0;
  pattern.forEach((word) => {
    value += target.includes(word);
  });
  return (value === 1);
}

async function ls(path) {
  return new Promise(((resolve) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
      }
      // files.sort();
      console.log('files', files);
      let orderedFiles = orderBy(files);
      // Add only images files to arry
      orderedFiles = orderedFiles.filter((file) => contains(file, ['mp4', 'jpg', 'jpeg']));
      orderedFiles.forEach((file, index) => {
        const ext = file.split('.').pop();
        const type = ext === 'mp4' ? 'video' : 'image';
        console.log('ext', index, ext);
        console.log('type', type);
        console.log('file', file);
        const subfolder = 'media';
        editSpec.clips.push({
          layers: [
            {
              type,
              path: `../assets/${FOLDER_NAME}/${subfolder}/cropped_Marie000${index + 1 > 9 ? index + 1 : `0${index + 1}`}.${ext}`,
            },
          ],
        });
        /*
        console.log('ext', ext);
        console.log('file', file);
        console.log('index', index);
        console.log('files.length', files.length); */
        if (orderedFiles.length - 1 === index) {
          // editSpec.clips.sort();
          console.log('editSpec.clips', editSpec.clips);
          resolve();
        }
      });
    });
  }));
}

function createVideos() {
  editly(editSpec).catch(console.error);
}

ls(`../assets/${FOLDER_NAME}/media/`)
  .then(() => {
    // console.log('editSpec', editSpec);
    createVideos();
  }).catch(console.error);
