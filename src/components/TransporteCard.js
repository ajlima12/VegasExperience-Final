import { getImagemTransporte } from '../utils/getImagemTransporte';
import { transporteImages } from '../utils/globalConts';
import { View, Text, Image, StyleSheet} from "react-native";


export function TransporteCard({ transporte }) {
  const { nome_tpt, descricao_tpt, tarifa_tpt } = transporte;
  const imagemTransporte = getImagemTransporte(nome_tpt);

  return (
    <View style={styles.transporteCard}>
      <View style={styles.transporteHeader}>
        <Text style={styles.transporteName}>{nome_tpt}</Text>
      </View>
      <View style={styles.carouselContainer}>
        {imagemTransporte && <Image source={imagemTransporte} style={styles.image} />}
      </View>

      <Text style={styles.transporteDescription}>{descricao_tpt}</Text>

      {/* Título "Tarifa" abaixo do campo "descricao_tpt" */}
      <Text style={styles.transporteTarifaTitle}>Tarifas:</Text>
      <Text style={styles.transporteTarifa}>{tarifa_tpt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
transporteCard: {
  width: '90%',
  alignSelf: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 16,
  marginBottom: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  position: 'relative',
},
transporteName: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 8,
  textAlign: 'center',
  
},
transporteDescription: {
  fontSize: 16,
  color: 'black', // Estilize o texto para preto
},
transporteTarifaTitle: {
  fontSize: 18,
  color: '#0D4BF2', // Estilize o texto para preto
  textAlign: 'center', // Centralize o texto
  fontWeight: 'bold', // Adicione negrito ao título
  marginTop: 10, // Adicione uma margem superior para separar do texto "descricao_tpt"
},
transporteTarifa: {
  fontSize: 16,
  color: 'black', //texto tarifa preto
  textAlign: 'center', // texto centralizado do tarifa
  marginBottom: 10, // margem inferior para separar do texto "descricao_tpt"
},
carouselContainer: {
  width: '100%',
  height: 150,
  borderRadius: 20,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
},
image: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
});