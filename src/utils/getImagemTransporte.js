export function getImagemTransporte(nomeTransporte) {
  // Adicione os casos com os nomes de transporte e as imagens correspondentes
  switch (nomeTransporte) {
    case 'The Deuce':
      return require('../assets/onibus.jpg');
    case 'Monorail':
      return require('../assets/monorail.jpg');
    case 'Taxi':
      return require('../assets/taxi.jpg');
    default:
      return null;
  }
};