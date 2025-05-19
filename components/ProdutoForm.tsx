import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Modal, Text, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import RNPickerSelect from 'react-native-picker-select';
import { MaskedTextInput } from 'react-native-mask-text';
import { parse } from 'date-fns';


export default function ProdutoForm({ onSubmit, initialData = {} }) {

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const [produto, setProduto] = useState({
    nome: '',
    dataFabricacao: '',
    validade: '',
    quantidade: '',
    lote: '',
    codigoBarras: '',
    estado: '',
    ...initialData,
  });

  const [scannerVisible, setScannerVisible] = useState(false);
  const [scaneado, setScaneado] = useState(false);
  const [cameraPermissao, solicitarPermissao] = useCameraPermissions();
  const cameraRef = useRef(null);

  const abrirScanner = async () => {
    const { status } = await solicitarPermissao();
    if (status === 'granted') {
      setScannerVisible(true);
      setScaneado(false);
    } else {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera');
    }
  };

  const aoEscanear = ({ data }) => {
    if (!scaneado) {
      setScaneado(true);
      setProduto({ ...produto, codigoBarras: data });
      setScannerVisible(false);
    }
  };

  const handleSalvar = () => {
    if (!produto.nome || !produto.estado) {
      Alert.alert('Atenção', 'Preencha pelo menos o nome e o estado do produto.');
      return;
    }

    onSubmit(produto);

    Alert.alert('Sucesso', 'Produto salvo com sucesso!');

    // Limpa o formulário
    setProduto({
      nome: '',
      dataFabricacao: '',
      validade: '',
      quantidade: '',
      lote: '',
      codigoBarras: '',
      estado: '',
    });
  };


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Produto"
        style={styles.input}
        value={produto.nome}
        onChangeText={(text) => setProduto({ ...produto, nome: text })}
      />
      <MaskedTextInput
        mask="99/99/9999"
        placeholder="Data de Fabricação (dd/mm/aaaa)"
        keyboardType="numeric"
        style={styles.input}
        value={produto.dataFabricacao}
        onChangeText={(text) => setProduto({ ...produto, dataFabricacao: text })}
      />

      <MaskedTextInput
        mask="99/99/9999"
        placeholder="Validade (dd/mm/aaaa)"
        keyboardType="numeric"
        style={styles.input}
        value={produto.validade}
        onChangeText={(text) => setProduto({ ...produto, validade: text })}
      />

      <TextInput
        placeholder="quantidade"
        style={styles.input}
        value={produto.quantidade}
        onChangeText={(text) => setProduto({ ...produto, quantidade: text })}
      />
      <TextInput
        placeholder="lote"
        style={styles.input}
        value={produto.lote}
        onChangeText={(text) => setProduto({ ...produto, lote: text })}
      />

      <TextInput
        placeholder="Código de Barras"
        style={styles.input}
        value={produto.codigoBarras}
        onChangeText={(text) => setProduto({ ...produto, codigoBarras: text })}
      />

      <Text>Estado de origem:</Text>
      <RNPickerSelect
        value={produto.estado}
        onValueChange={(itemValue) => setProduto({ ...produto, estado: itemValue })}
        items={estados.map(uf => ({ label: uf, value: uf }))}
        placeholder={{ label: 'Selecione um estado...', value: null }}
        style={pickerSelectStyles}
      />

      <Button title="Escanear Código de Barras" onPress={abrirScanner} />

      <Button title="Salvar Produto" onPress={handleSalvar} />

      {/* Modal com câmera */}
      <Modal visible={scannerVisible} animationType="slide">
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={aoEscanear}
          ref={cameraRef}
          barcodeScannerSettings={{
            barcodeTypes: ['ean13', 'qr', 'code128'], // tipos suportados
          }}
        />
        <View style={styles.overlay}>
          <Button title="Cancelar" onPress={() => setScannerVisible(false)} color="white" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  overlay: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
  },
});
