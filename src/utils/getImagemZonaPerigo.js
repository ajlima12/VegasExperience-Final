export function getImagemZonaPerigo(nomeZonaPerigo) {
  switch (nomeZonaPerigo) {
    case 'Aldeia de Meadows':
      return require('../assets/meadows.jpeg');
    case 'Westside':
      return require('../assets/westside.jpeg');
    case 'Huntridge':
      return require('../assets/Huntridge.jpeg');
    case 'Norte de Las Vegas':
      return require('../assets/nortedelasvegas.jpeg');
    default:
  }   
};