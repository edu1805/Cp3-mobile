// app/index.tsx
import { View, Text, Button, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Estoque App</Text>

      <Link href="/cadastro" asChild>
        <Button title="Cadastrar Produto" />
      </Link>

      <View style={{ height: 10 }} />

      <Link href="/produtos" asChild>
        <Button title="Ver Produtos" />
      </Link>

        <View style={{ height: 10 }} />

      <Link href="/desenvolvedores" asChild>
        <Button title="Desenvolvedores" />
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});