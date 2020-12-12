const { easeOutExpo } = require('../../transitions');

/**
 * Text Util
 */

function titleBackgroundText(progress, width, height, fabric, params) {
  const fontSize = 200;
  const fontFamily = 'Futura Medium';
  const primaryColour = '#f3d549';
  const secondaryColour = '#e57a94';

  let text;
  let rectPadding;
  let rectMargin;
  const { title, angle, align } = params;
  // Create the text measuring node - not added to the canvas !
  const textMeasure = new fabric.IText(title, {
    fontFamily,
    fontSize,
    left: 0,
    top: 0,
    fill: '#FFF',
    stroke: '',
    textBackgroundColor: '#000',
  });

  let theText;
  let textHeight;
  let top = 0;
  let group = {};
  const shapes = [];

  const pos = {
    padding: {
      left: 10,
      top: 5,
      bottom: 5,
      right: 10,
    },
    margin: {
      left: 0,
      top: 5,
      bottom: 5,
      right: 0,
    },
    angle,
  };

  for (let i = 0; i < textMeasure._textLines.length; i += 1) {
    theText = textMeasure._textLines[i].join('');
    textHeight = Math.floor(textMeasure.lineHeight * textMeasure.fontSize); // textMeasure.getHeightOfLine(i)

    console.log('theText', theText);

    // change colour of "born word"
    const secondLinestyles = {
      0: {
        5: { fill: secondaryColour },
        6: { fill: secondaryColour },
        7: { fill: secondaryColour },
        8: { fill: secondaryColour },
        9: { fill: secondaryColour },
        10: { fill: secondaryColour },
        11: { fill: secondaryColour },
        12: { fill: secondaryColour },
        13: { fill: secondaryColour },
      },
    };

    // Make the text node for line i
    text = new fabric.IText(theText, {
      fontFamily,
      fontSize,
      left: 0,
      top,
      fill: primaryColour,
      stroke: '',
      styles: i === 0 ? secondLinestyles : null,
    });


    // create the outer 'margin' rect, note the position is negatively offset for padding & margin
    // and the width is sized from the dimensions of the text node plus 2 x (padding + margin).
    rectMargin = new fabric.Rect({
      left: -1 * (pos.padding.left + pos.margin.left),
      top: top - (pos.padding.top + pos.margin.top),
      width: text.width + ((pos.padding.left + pos.padding.right) + (pos.margin.left + pos.margin.right)),
      height: textHeight + ((pos.padding.top + pos.padding.bottom) + (pos.margin.top + pos.margin.bottom)),
      fill: 'transparent',
    });
    shapes.push(rectMargin);

    let rectPaddingLeft;

    if (align === 'right') {
      rectPaddingLeft = group.width - rectMargin.width;
      rectMargin.left = rectPaddingLeft;
      text.left = rectPaddingLeft + ((pos.padding.left) + (pos.margin.left));
    } else if (align === 'center') {
      rectPaddingLeft = (group.width - rectMargin.width) / 2;
      rectMargin.left = rectPaddingLeft;
      text.left = rectPaddingLeft + ((pos.padding.left) + (pos.margin.left));
    } else {
      rectPaddingLeft = -1 * pos.padding.left;
    }

    // create the inner 'padding' rect, note the position is offset for padding only
    // and the width is sized from the dimensions of the text node plus 2 x padding.
    rectPadding = new fabric.Rect({
      width: text.width + (pos.padding.left + pos.padding.right),
      height: textHeight + (pos.padding.top + pos.padding.bottom),
      left: rectPaddingLeft,
      top: top - pos.padding.top,
      fill: '#132b37',
    });
    shapes.push(rectPadding);
    shapes.push(text);

    top = top - 1 + textHeight + pos.padding.top + pos.margin.top + pos.padding.bottom + pos.margin.bottom;
  }


  const easedProgress = easeOutExpo(Math.min(progress, 1));

  group = new fabric.Group(shapes, {
    // left: width / 2 - group.width,
    // top: 100 - (pos.padding.top - pos.margin.top),
    angle: pos.angle,
    opacity: easedProgress,
  });

  return group;
}

module.exports = {
  titleBackgroundText,
};
