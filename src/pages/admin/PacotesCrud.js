import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PacotesCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Pacotes de viagem',
      headerTitleAlign: 'center',
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
      },
      headerStyle: {
        backgroundColor: '#147DEB',
        height: 110,
        borderBottomColor: 'transparent',
        shadowColor: 'transparent',
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => null,
    });
  }, [navigation]);

  const [pacotes_viagem, setPacotes] = useState([]);
  const [agencia, setAgencia] = useState('');
  const [companhia_aerea, setCompanhia] = useState('');
  const [duracao, setDuracao] = useState('');
  const [hotel_pct, setHotel] = useState('');
  const [pagantes, setPagantes] = useState('');
  const [valor, setValor] = useState('');
  const [cod_pct, setCodPct] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('pacotes_viagem')
      .onSnapshot((snapshot) => {
        const pacotes_viagemData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setPacotes(pacotes_viagemData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarPacote = async () => {
    try {
      await firestore().collection('pacotes_viagem').add({ agencia,companhia_aerea, duracao, hotel_pct, pagantes, valor, cod_pct });
      setAgencia('');
      setCompanhia('');
      setDuracao('');
      setHotel('');
      setPagantes('');
      setValor('');
      setCodPct('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar pacote de viagem:', error);
    }
  };

  const handleEditarPacote = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhum pacote de viagem selecionado para editar.');
      return; // Evitar a edição caso a placa selecionada não esteja definida
    }

    try {
      await firestore().collection('pacotes_viagem').doc(editando.id).update({ agencia, companhia_aerea, duracao, hotel_pct, pagantes, valor, cod_pct  });
      setAgencia('');
      setCompanhia('');
      setDuracao('');
      setHotel('');
      setPagantes('');
      setValor('');
      setCodPct('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar pacote de viagem:', error);
    }
  };

  const handleExcluirPacote = async () => {
    const pacoteSelecionado = pacotes_viagem.find((pacote) => pacote.selecionado);

    if (pacoteSelecionado) {
      try {
        await firestore().collection('pacotes_viagem').doc(pacoteSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir pacote de viagem:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhum pacote de viagem selecionado para excluir.');
    }
  };

  const handleEditar = (pacote) => {
    if (pacote) {
      setEditando(pacote);
      setAgencia(pacote.agencia);
      setCompanhia(pacote.companhia_aerea);
      setDuracao(pacote.duracao);
      setHotel(pacote.hotel_pct);
      setPagantes(pacote.pagantes);
      setValor(pacote.valor);
      setCodPct(pacote.cod_pct);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhum pacote de viagem selecionado para editar.');
    }
  };

  const handleSelecionarPacote = (pacote) => {
    const novosPacotes = pacotes_viagem.map((item) =>
      item.id === pacote.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setPacotes(novosPacotes);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Selecionar</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Código</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Agência</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Companhia aérea</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Duração</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Hotel</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Pagantes</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Valor</Text>
          </View>
        </View>
        {pacotes_viagem.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarPacote(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_pct}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.agencia}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.companhia_aerea}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.duracao}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.hotel_pct}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.pagantes}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.valor}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar pacote de viagem:' : 'Novo pacote de viagem:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_pct.toString()}
              onChangeText={(text) => setCodPct(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Agência"
              value={agencia}
              onChangeText={(text) => setAgencia(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Companhia aérea"
              value={companhia_aerea}
              onChangeText={(text) => setCompanhia(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Duração"
              value={duracao}
              onChangeText={(text) => setDuracao(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Hotel"
              value={hotel_pct}
              onChangeText={(text) => setHotel(text)}
              style={styles.input}
            />
             <TextInput
              placeholder="Pagantes"
              value={pagantes}
              onChangeText={(text) => setPagantes(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Valor"
              value={valor}
              onChangeText={(text) => setValor(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarPacote : handleCriarPacote}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(pacotes_viagem.find(pacote => pacote.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirPacote}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  table: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    backgroundColor: '#F4F5F4',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tableCell: {
    flex: 1,
    padding: 8,
  },
  tableCellHeader: {
    backgroundColor: '#F4F5F4',
  },
  tableCellHeaderText: {
    fontWeight: 'bold',
  },
  tableCellText: {
    textAlign: 'center',
  },
  centeredHeader: {
    alignItems: 'center',
  },
  centeredCell: {
    alignItems: 'center',
  },
  formulario: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    padding: 16,
    marginBottom: 16,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  inputContainer: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#147DEB',
    padding: 12,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    flex: 1,
    height: 49,
    backgroundColor: '#147DEB',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
});

export default PacotesCrud;