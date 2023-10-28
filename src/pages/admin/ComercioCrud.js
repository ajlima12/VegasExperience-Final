import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ComercioCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Centros Comerciais',
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

  const [centros_comerciais, setComercios] = useState([]);
  const [nome_comer, setNome] = useState('');
  const [localizacao_comer, setLocalizacao] = useState('');
  const [descricao_comer, setDescricao] = useState('');
  const [cod_comer, setCodComer] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('centros_comerciais')
      .onSnapshot((snapshot) => {
        const centros_comerciaisData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setComercios(centros_comerciaisData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarComercio = async () => {
    try {
      await firestore().collection('centros_comerciais').add({ nome_comer, localizacao_comer, descricao_comer, cod_comer });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodComer('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar comércio:', error);
    }
  };

  const handleEditarComercio = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhum comércio selecionado para editar.');
      return; // Evitar a edição caso a placa selecionada não esteja definida
    }

    try {
      await firestore().collection('centros_comerciais').doc(editando.id).update({ nome_comer, localizacao_comer, descricao_comer, cod_comer });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodComer('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar comércio:', error);
    }
  };

  const handleExcluirComercio = async () => {
    const comercioSelecionado = centros_comerciais.find((comercio) => comercio.selecionado);

    if (comercioSelecionado) {
      try {
        await firestore().collection('centros_comerciais').doc(comercioSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir comércio:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhum comércio selecionado para excluir.');
    }
  };

  const handleEditar = (comercio) => {
    if (comercio) {
      setEditando(comercio);
      setNome(comercio.nome_comer);
      setLocalizacao(comercio.localizacao_comer);
      setDescricao(comercio.descricao_comer);
      setCodComer(comercio.cod_comer);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhum comércio selecionado para editar.');
    }
  };

  const handleSelecionarComercio = (comercio) => {
    const novosComercios = centros_comerciais.map((item) =>
      item.id === comercio.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setComercios(novosComercios);
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
        {centros_comerciais.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarComercio(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_comer}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.nome_comer}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.localizacao_comer}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.descricao_comer}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar comércio:' : 'Novo comércio:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_comer}
              onChangeText={(text) => setCodComer(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_comer}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Localização"
              value={localizacao_comer}
              onChangeText={(text) => setLocalizacao(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_comer}
              onChangeText={(text) => setDescricao(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarComercio : handleCriarComercio}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(centros_comerciais.find(comercio => comercio.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirComercio}>
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

export default ComercioCrud;