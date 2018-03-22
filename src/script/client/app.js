import '../../swag/main.scss';

import * as DrawText from './draw/canvas';

(() => {
  DrawText.drawStroked('canvas', 'THIS\nIS THE\nTEXT', 100, '#000', 0, 0);
})();
