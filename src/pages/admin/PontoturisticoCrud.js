import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PontoturisticoCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud de Pontos Turísticos',
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

  const [pontosTuristicos, setPontosTuristicos] = useState([]);
  const [nome_ptur, setNomePtur] = useState('');
  const [localizacao_ptur, setLocalizacaoPtur] = useState('');
  const [descricao_ptur, setDescricaoPtur] = useState('');
  const [cod_ptur, setCodPtur] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('pontos_turisticos')
      .onSnapshot((snapshot) => {
        const pontosData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setPontosTuristicos(pontosData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarPontoTuristico = async () => {
    try {
      await firestore().collection('pontos_turisticos').add({ nome_ptur, localizacao_ptur, descricao_ptur, cod_ptur });
      setNomePtur('');
      setLocalizacaoPtur('');
      setDescricaoPtur('');
      setCodPtur('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar ponto turístico:', error);
    }
  };

  const handleEditarPontoTuristico = async () => {
    if (!editando) {
      return;
    }

    try {
      await firestore().collection('pontos_turisticos').doc(editando.id).update({ nome_ptur, localizacao_ptur, descricao_ptur, cod_ptur });
      setNomePtur('');
      setLocalizacaoPtur('');
      setDescricaoPtur('');
      setCodPtur('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar ponto turístico:', error);
    }
  };

  const handleExcluirPontoTuristico = async () => {
    const pontoSelecionado = pontosTuristicos.find((ponto) => ponto.selecionado);

    if (pontoSelecionado) {
      try {
        await firestore().collection('pontos_turisticos').doc(pontoSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir ponto turístico:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhum ponto turístico selecionado para excluir.');
    }
  };

  const handleEditar = (ponto) => {
    if (ponto) {
      setEditando(ponto);
      setNomePtur(ponto.nome_ptur);
      setLocalizacaoPtur(ponto.localizacao_ptur);
      setDescricaoPtur(ponto.descricao_ptur);
      setCodPtur(ponto.cod_ptur);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhum ponto turístico selecionado para editar.');
    }
  };

  const handleSelecionarPontoTuristico = (ponto) => {
    const novosPontos = pontosTuristicos.map((item) =>
      item.id === ponto.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setPontosTuristicos(novosPontos);
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
            <Text style={styles.tableCellHeaderText}>Nome</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Localização</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Descrição</Text>
          </View>
        </View>
        {pontosTuristicos.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarPontoTuristico(item)}
                />
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.cod_ptur}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.nome_ptur}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText}>{item.localizacao_ptur}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellText} numberOfLines={1} ellipsizeMode="tail">
                  {item.descricao_ptur}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar Ponto Turístico:' : 'Novo Ponto Turístico:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_ptur.toString()}
              onChangeText={(text) => setCodPtur(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_ptur}
              onChangeText={(text) => setNomePtur(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Localizacao"
              value={localizacao_ptur}
              onChangeText={(text) => setLocalizacaoPtur(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_ptur}
              onChangeText={(text) => setDescricaoPtur(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarPontoTuristico : handleCriarPontoTuristico}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(pontosTuristicos.find(ponto => ponto.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirPontoTuristico}>
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
    paddingVertical: 8,
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
    textAlign: 'center',
  },
  tableCellText: {
    textAlign: 'center',
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

export default PontoturisticoCrud;
