import React, { useState } from "react";
import { View, Text, Alert, TextInput, Button, StyleSheet, TouchableOpacity, Linking, Image} from "react-native";

export default function Integrantes() {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>DESENVOLVEDORES</Text>
        <Image source={require('../../assets/logofiap.png')} style={{width: 200, height: 150, marginVertical: 10, margin: 'auto', }} />

        <Text style={styles.text}>Eduardo do Nascimento Barriviera</Text>
        <Text style={styles.info}>RM555309</Text>
        <Text style={styles.info}>eduardobarriviera1805@gmail.com</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/edu1805')}>
            <Text style={styles.link}>github.com/edu1805</Text>
        </TouchableOpacity>

        <View style={styles.separator} />

        <Text style={styles.text}>Thiago Lima de Freitas</Text>
        <Text style={styles.info}>RM556795</Text>
        <Text style={styles.info}>thiagllima26@gmail.com</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/thiglfa')}>
            <Text style={styles.link}>github.com/thiglfa</Text>
        </TouchableOpacity>

        <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  text: { fontSize: 20 },
  info: { fontSize: 16, color: '#333' },
  link: {
    color: '#007AFF',
    fontSize: 16,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
});