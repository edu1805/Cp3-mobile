
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: '#6200ee' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#6200ee',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{ drawerLabel: 'Início', title: 'Página Inicial', headerShown: false }}
      />
      <Drawer.Screen
        name="cadastro/index"
        options={{ drawerLabel: 'Cadastrar Produto', title: 'Cadastro' }}
      />
      <Drawer.Screen
        name="produtos/index"
        options={{ drawerLabel: 'Produtos', title: 'Lista de Produtos' }}
      />
      <Drawer.Screen
        name="produtos/[id]"
        options={{ drawerLabel: 'Editar Produto', title: 'Editar' }}
      />
      <Drawer.Screen
        name="desenvolvedores/index"
        options={{ drawerLabel: 'Desenvolvedores', title: 'Sobre os Devs' }}
      />
    </Drawer>
  );
}
