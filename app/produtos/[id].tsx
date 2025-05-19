import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Alert, Text } from 'react-native';
import ProdutoForm from '../../components/ProdutoForm';
import { produtos } from '../database/produtos';

export default function EditarProduto() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const produtoExistente = produtos.find(p => p.id === id);

  if (!produtoExistente) {
    return <View style={{marginTop: 20}} ><Text style={{fontSize: 20, margin: "auto", }}>Produto não encontrado.</Text></View>;
  }

  const atualizarProduto = (dadosAtualizados: any) => {
    const index = produtos.findIndex(p => p.id === id);
    if (index !== -1) {
      produtos[index] = { ...dadosAtualizados, id };
      router.push('/produtos'); // volta para a lista
    }
  };

  return (
    <ProdutoForm onSubmit={atualizarProduto} initialData={produtoExistente} />
  );
}
