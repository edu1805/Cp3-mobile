import { useCallback, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { produtos } from '../database/produtos';
import { useRouter, useFocusEffect, Link } from 'expo-router';

export default function Produtos() {
  const [lista, setLista] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      setLista([...produtos]);
    }, [])
  );

  const excluirProduto = (id: string) => {
    const i = produtos.findIndex(p => p.id === id);
    if (i > -1) produtos.splice(i, 1);
    setLista([...produtos]);
  };

  const confirmarExclusao = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => excluirProduto(id) },
      ]
    );
  };

  return (
    <FlatList
      data={lista}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text>Nome: {item.nome}</Text>
          <Text>Data de fabricação: {item.dataFabricacao}</Text>
          <Text>Validade: {item.validade}</Text>
          <Text>Quantidade: {item.quantidade}</Text>
          <Text>Lote: {item.lote}</Text>
          <Text>Código de barras: {item.codigoBarras}</Text>
          <Text>Estado: {item.estado}</Text>
          <Button title="Editar" onPress={() => router.push(`/produtos/${item.id}`)} />
          <Button title="Excluir" color="red" onPress={() => confirmarExclusao(item.id)} />
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
            <Link href="/cadastro" asChild>
                <Button title="Ir para cadastro" />
            </Link>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 5,
    borderWidth: 1,
    gap: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    gap: 10
  },
  emptyText: {
    fontSize: 20,
    color: '#555',
  },
});
