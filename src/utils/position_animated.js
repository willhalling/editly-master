/**
 * Position Util
 */

function getPosition(
  width,
  height,
  position = 'bottomLeft',
  padding,
  easedProgress,
  left = 'left',
  top = 'top',
) {
  // console.log('getPosition position', position);
  let newPosition = {};
  switch (position) {
    case 'topLeft':
      newPosition = {
        [left]: padding + (-1 + easedProgress) * padding,
        [top]: padding,
        originX: 'left',
        originY: 'top',
        textAlign: 'left',
      };
      break;
    case 'topMiddle':
      newPosition = {
        [left]: width / 2 + (-1 + easedProgress) * padding,
        [top]: padding,
        originX: 'center',
        originY: 'top',
        textAlign: 'left',
      };
      break;
    case 'topRight':
      newPosition = {
        [left]: (width - padding) - (-1 + easedProgress) * padding,
        [top]: padding,
        originX: 'right',
        originY: 'top',
        textAlign: 'right',
      };
      break;
    case 'middleLeft':
      newPosition = {
        [left]: padding + (-1 + easedProgress) * padding,
        [top]: height / 2,
        originX: 'left',
        originY: 'center',
        textAlign: 'left',
      };
      break;
    case 'middle':
      newPosition = {
        [left]: width / 2 + (-1 + easedProgress) * padding,
        [top]: height / 2,
        originX: 'center',
        originY: 'center',
        textAlign: 'center',
      };
      break;
    case 'middleRight':
      newPosition = {
        [left]: (width - padding) - (-1 + easedProgress) * padding,
        [top]: height / 2,
        originX: 'right',
        originY: 'center',
        textAlign: 'right',
      };
      break;
    case 'bottomMiddle':
      newPosition = {
        [left]: width / 2 + (-1 + easedProgress) * padding,
        [top]: height - padding,
        originX: 'center',
        originY: 'bottom',
        textAlign: 'center',
      };
      break;
    case 'bottomRight':
      newPosition = {
        [left]: (width - padding) - (-1 + easedProgress) * padding,
        [top]: height - padding,
        originX: 'right',
        originY: 'bottom',
        textAlign: 'right',
      };
      break;
    case 'bottomLeft':
      newPosition = {
        [left]: padding + (-1 + easedProgress) * padding,
        [top]: height - padding,
        originX: 'left',
        originY: 'bottom',
        textAlign: 'left',
      };
      break;
    default:
      // default to set position using x/y coordinates
      newPosition = {
        [left]: padding + (-1 + easedProgress) * padding,
        [top]: height - padding,
        originX: 'left',
        originY: 'bottom',
        textAlign: 'left',
      };
  }
  return newPosition;
}

module.exports = {
  getPosition,
};
