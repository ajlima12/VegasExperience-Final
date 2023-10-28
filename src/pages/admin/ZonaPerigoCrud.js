import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const ZonaPerigoCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Zonas de perigo',
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

  const [zonas_perigo, setZona] = useState([]);
  const [nome_zp, setNome] = useState('');
  const [localizacao_zp, setLocalizacao] = useState('');
  const [descricao_zp, setDescricao] = useState('');
  const [cod_zp, setCodZona] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('zonas_perigo')
      .onSnapshot((snapshot) => {
        const zonas_perigoData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setZona(zonas_perigoData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarZona = async () => {
    try {
      await firestore().collection('zonas_perigo').add({ nome_zp, localizacao_zp, descricao_zp, cod_zp });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodZona('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar zona de perigo:', error);
    }
  };

  const handleEditarZona = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhuma zona de perigo selecionada para editar.');
      return; // Evitar a edição caso a placa selecionada não esteja definida
    }

    try {
      await firestore().collection('zonas_perigo').doc(editando.id).update({ nome_zp, localizacao_zp, descricao_zp, cod_zp });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodZona('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar zona de perigo:', error);
    }
  };

  const handleExcluirZona = async () => {
    const zonaSelecionado = zonas_perigo.find((zona) => zona.selecionado);

    if (zonaSelecionado) {
      try {
        await firestore().collection('zonas_perigo').doc(zonaSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir zona de perigo:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhuma zona de perigo selecionada para excluir.');
    }
  };

  const handleEditar = (zona) => {
    if (zona) {
      setEditando(zona);
      setNome(zona.nome_zp);
      setLocalizacao(zona.localizacao_zp);
      setDescricao(zona.descricao_zp);
      setCodZona(zona.cod_zp);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhuma zona de perigo selecionada para editar.');
    }
  };

  const handleSelecionarZona = (zona) => {
    const novosZonas = zonas_perigo.map((item) =>
      item.id === zona.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setZona(novosZonas);
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
        {zonas_perigo.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarZona(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_zp}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.nome_zp}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.localizacao_zp}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.descricao_zp}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar zona de perigo:' : 'Nova zona de perigo:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_zp.toString()}
              onChangeText={(text) => setCodZona(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_zp}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Localização"
              value={localizacao_zp}
              onChangeText={(text) => setLocalizacao(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_zp}
              onChangeText={(text) => setDescricao(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarZona : handleCriarZona}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(zonas_perigo.find(zona => zona.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirZona}>
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

export default ZonaPerigoCrud;