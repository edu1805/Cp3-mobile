import { useRouter } from 'expo-router';
import ProdutoForm from '../../components/ProdutoForm';
import { produtos } from '../database/produtos';

export default function Cadastro() {
  const router = useRouter();

  const handleSubmit = (produto: any) => {
    produtos.push({ ...produto, id: Date.now().toString() });
    router.push('/produtos');
  };

  return <ProdutoForm onSubmit={handleSubmit} />;
}
