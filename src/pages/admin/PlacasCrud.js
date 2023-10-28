import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const PlacasCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Placas',
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

  const [placas, setPlacas] = useState([]);
  const [nome_plac, setNome] = useState('');
  const [traducao, setTraducao] = useState('');
  const [descricao_plac, setDescricao] = useState('');
  const [cod_plac, setCodPlac] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('placas')
      .onSnapshot((snapshot) => {
        const placasData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setPlacas(placasData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarPlaca = async () => {
    try {
      await firestore().collection('placas').add({ nome_plac, traducao, descricao_plac, cod_plac });
      setNome('');
      setTraducao('');
      setDescricao('');
      setCodPlac('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar placa:', error);
    }
  };

  const handleEditarPlaca = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhuma placa selecionada para editar.');
      return; // Evitar a edição caso a placa selecionada não esteja definida
    }

    try {
      await firestore().collection('placas').doc(editando.id).update({ nome_plac, traducao, descricao_plac, cod_plac });
      setNome('');
      setTraducao('');
      setDescricao('');
      setCodPlac('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar placa:', error);
    }
  };

  const handleExcluirPlaca = async () => {
    const placaSelecionado = placas.find((placa) => placa.selecionado);

    if (placaSelecionado) {
      try {
        await firestore().collection('placas').doc(placaSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir placa:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhuma placa selecionada para excluir.');
    }
  };

  const handleEditar = (placa) => {
    if (placa) {
      setEditando(placa);
      setNome(placa.nome_plac);
      setTraducao(placa.traducao);
      setDescricao(placa.descricao_plac);
      setCodPlac(placa.cod_plac);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhuma placa selecionada para editar.');
    }
  };

  const handleSelecionarPlaca = (placa) => {
    const novosPlacas = placas.map((item) =>
      item.id === placa.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setPlacas(novosPlacas);
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
            <Text style={styles.tableCellHeaderText}>Tradução</Text>
          </View>
          <View style={[styles.tableCell, styles.tableCellHeader, styles.centeredHeader]}>
            <Text style={styles.tableCellHeaderText}>Descrição</Text>
          </View>
        </View>
        {placas.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarPlaca(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_plac}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.nome_plac}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.traducao}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.descricao_plac}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar Placa:' : 'Nova Placa:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_plac.toString()}
              onChangeText={(text) => setCodPlac(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_plac}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Tradução"
              value={traducao}
              onChangeText={(text) => setTraducao(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_plac}
              onChangeText={(text) => setDescricao(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarPlaca : handleCriarPlaca}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(placas.find(placa => placa.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirPlaca}>
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

export default PlacasCrud;
