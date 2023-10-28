import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const TransporteCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Transporte',
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

  const [transportes, setTransportes] = useState([]);
  const [nome_tpt, setNome] = useState('');
  const [descricao_tpt, setDescricao] = useState('');
  const [cod_tpt, setCodTpt] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('transporte')
      .onSnapshot((snapshot) => {
        const transportesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setTransportes(transportesData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarTransporte = async () => {
    try {
      await firestore().collection('transporte').add({ nome_tpt, descricao_tpt, cod_tpt });
      setNome('');
      setDescricao('');
      setCodTpt('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar transporte:', error);
    }
  };

  const handleEditarTransporte = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhum transporte selecionado para editar.');
      return; // Evitar a edição caso o transporte selecionado não esteja definido
    }

    try {
      await firestore().collection('transporte').doc(editando.id).update({ nome_tpt, descricao_tpt, cod_tpt });
      setNome('');
      setDescricao('');
      setCodTpt('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar transporte:', error);
    }
  };

  const handleExcluirTransporte = async () => {
    const transporteSelecionado = transportes.find((transporte) => transporte.selecionado);

    if (transporteSelecionado) {
      try {
        await firestore().collection('transporte').doc(transporteSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir transporte:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhum transporte selecionado para excluir.');
    }
  };

  const handleEditar = (transporte) => {
    if (transporte) {
      setEditando(transporte);
      setNome(transporte.nome_tpt);
      setDescricao(transporte.descricao_tpt);
      setCodTpt(transporte.cod_tpt);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhum transporte selecionado para editar.');
    }
  };

  const handleSelecionarTransporte = (transporte) => {
    const novosTransportes = transportes.map((item) =>
      item.id === transporte.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setTransportes(novosTransportes);
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
            <Text style={styles.tableCellHeaderText}>Descrição</Text>
          </View>
        </View>
        {transportes.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarTransporte(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_tpt}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.nome_tpt}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.descricao_tpt}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar Transporte:' : 'Novo Transporte:'}</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Código"
              value={cod_tpt.toString()}
              onChangeText={(text) => setCodTpt(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_tpt}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_tpt}
              onChangeText={(text) => setDescricao(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarTransporte : handleCriarTransporte}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(transportes.find(transporte => transporte.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirTransporte}>
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

export default TransporteCrud;
