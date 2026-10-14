import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import APP from '../config/app';

export default function OfflineScreen({ onRetry }: { onRetry: () => void }) {
  return (
    <View style={[s.wrap, { backgroundColor: APP.colors.background }]}>
      <Text style={[s.title, { color: APP.colors.text }]}>You're offline</Text>
      <Text style={[s.sub, { color: APP.colors.muted }]}>Check your connection to keep using {APP.name}.</Text>
      <Pressable style={[s.btn, { backgroundColor: APP.colors.accent }]} onPress={onRetry}><Text style={s.btnTxt}>Try again</Text></Pressable>
    </View>
  );
}
const s = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '800' }, sub: { fontSize: 15, marginTop: 8, textAlign: 'center' },
  btn: { marginTop: 24, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 12 }, btnTxt: { color: '#fff', fontWeight: '700' },
});
