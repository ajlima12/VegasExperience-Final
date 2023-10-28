export function getImagemPlacas(nomePlacas) {
  switch (nomePlacas) {
    case 'YIELD':
      return require('../assets/yield2.jpg');
    case 'Wrong way':
      return require('../assets/wrongway.jpg');
    case 'STOP':
      return require('../assets/stop2.jpg');
    case 'Speed Limit':
      return require('../assets/speedlimit1.jpg');
    default:
  }   
};
