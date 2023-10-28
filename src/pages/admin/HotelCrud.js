import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const HotelCrud = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Crud Hotel',
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

  const [hoteis, setHoteis] = useState([]);
  const [nome_hot, setNome] = useState('');
  const [localizacao_hot, setLocalizacao] = useState('');
  const [descricao_hot, setDescricao] = useState('');
  const [cod_hot, setCodHot] = useState('');
  const [editando, setEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('hoteis')
      .onSnapshot((snapshot) => {
        const hoteisData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), selecionado: false }));
        setHoteis(hoteisData);
      });

    return () => unsubscribe();
  }, []);

  const handleCriarHotel = async () => {
    try {
      await firestore().collection('hoteis').add({ nome_hot, localizacao_hot, descricao_hot, cod_hot });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodHot('');
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao criar hotel:', error);
    }
  };

  const handleEditarHotel = async () => {
    if (!editando) {
      Alert.alert('Atenção', 'Nenhum hotel selecionado para editar.');
      return; // Evitar a edição caso o hotel selecionado não esteja definido
    }

    try {
      await firestore().collection('hoteis').doc(editando.id).update({ nome_hot, localizacao_hot, descricao_hot, cod_hot });
      setNome('');
      setLocalizacao('');
      setDescricao('');
      setCodHot('');
      setEditando(null);
      setMostrarFormulario(false);
    } catch (error) {
      console.log('Erro ao editar hotel:', error);
    }
  };

  const handleExcluirHotel = async () => {
    const hotelSelecionado = hoteis.find((hotel) => hotel.selecionado);

    if (hotelSelecionado) {
      try {
        await firestore().collection('hoteis').doc(hotelSelecionado.id).delete();
        setEditando(null);
        setMostrarFormulario(false);
      } catch (error) {
        console.log('Erro ao excluir hotel:', error);
      }
    } else {
      Alert.alert('Atenção', 'Nenhum hotel selecionado para excluir.');
    }
  };

  const handleEditar = (hotel) => {
    if (hotel) {
      setEditando(hotel);
      setNome(hotel.nome_hot);
      setLocalizacao(hotel.localizacao_hot);
      setDescricao(hotel.descricao_hot);
      setCodHot(hotel.cod_hot);
      setMostrarFormulario(true);
    } else {
      Alert.alert('Atenção', 'Nenhum hotel selecionado para editar.');
    }
  };

  const handleSelecionarHotel = (hotel) => {
    const novosHoteis = hoteis.map((item) =>
      item.id === hotel.id ? { ...item, selecionado: !item.selecionado } : item
    );
    setHoteis(novosHoteis);
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
        {hoteis.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleEditar(item)}>
            <View style={styles.tableRow}>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <CheckBox
                  value={item.selecionado}
                  onValueChange={() => handleSelecionarHotel(item)}
                />
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.cod_hot}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.nome_hot}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText}>{item.localizacao_hot}</Text>
              </View>
              <View style={[styles.tableCell, styles.centeredCell]}>
                <Text style={styles.tableCellText} numberOfLines={2} ellipsizeMode="tail">
                  {item.descricao_hot}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {mostrarFormulario && (
        <View style={styles.formulario}>
          <Text style={styles.formTitle}>{editando ? 'Editar Hotel:' : 'Novo Hotel:'}</Text>
          <View style={styles.inputContainer}>
          <TextInput
              placeholder="Código"
              value={cod_hot.toString()}
              onChangeText={(text) => setCodHot(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Nome"
              value={nome_hot}
              onChangeText={(text) => setNome(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Localizacao"
              value={localizacao_hot}
              onChangeText={(text) => setLocalizacao(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição"
              value={descricao_hot}
              onChangeText={(text) => setDescricao(text)}
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={editando ? handleEditarHotel : handleCriarHotel}
          >
            <Text style={styles.buttonText}>{editando ? 'Salvar' : 'Criar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.botoesContainer}>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => setMostrarFormulario(true)}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.botao, { marginRight: 8 }]} onPress={() => handleEditar(hoteis.find(hotel => hotel.selecionado))}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={handleExcluirHotel}>
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

export default HotelCrud;
